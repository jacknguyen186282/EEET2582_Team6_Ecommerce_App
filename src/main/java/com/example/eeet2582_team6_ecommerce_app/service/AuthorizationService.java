package com.example.eeet2582_team6_ecommerce_app.service;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import com.example.eeet2582_team6_ecommerce_app.entity.UserStatus;
import com.example.eeet2582_team6_ecommerce_app.repository.UserStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
@AllArgsConstructor
public class AuthorizationService {
    private JwtDecoder jwtDecoder;
    private UserStatusRepository userStatusRepository;
    private final String microserviceUrl = "http://localhost:5000";
    protected WebClient webClient;

    private final String ISSUER = "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_b97nG1Rp5";
    private final String CLIENT_ID = "4mpuhie909kgds8i0pcie8kaif";

    public AuthorizationResponse verifyAccessToken(String token) {
        Jwt jwt;

        if (token == null) {
            return new AuthorizationResponse("Empty token", "error");
        }

        try {
            jwt = jwtDecoder.decode(token);
        } catch (JwtValidationException jwtValidationException) {
            jwtValidationException.printStackTrace();
            if (jwtValidationException.getMessage().contains("expired at")) {
                return new AuthorizationResponse("Token expired", "error");
            }
            return new AuthorizationResponse("Invalid token", "error");
        } catch (Exception e) {
            return new AuthorizationResponse("Invalid token", "error");
        }

        if (!((String) jwt.getClaim("token_use")).equals("access")) {
            return new AuthorizationResponse("Invalid token use", "error");
        }

        if (!((String) jwt.getClaim("iss")).equals(ISSUER)) {
            return new AuthorizationResponse("Invalid token issuer", "error");
        }

        if (!((String) jwt.getClaim("client_id")).equals(CLIENT_ID)) {
            return new AuthorizationResponse("Invalid token id", "error");
        }

        return new AuthorizationResponse("", "success", jwt);
    }

    public AuthorizationResponse verifyIdentityToken(String token) {
        Jwt jwt = null;

        if (token == null) {
            return new AuthorizationResponse("Empty token", "error");
        }

        try {
            jwt = jwtDecoder.decode(token);
        } catch (JwtValidationException jwtValidationException) {
            if (jwtValidationException.getMessage().contains("expired at")) {
                return new AuthorizationResponse("Token expired", "error");
            }
            return new AuthorizationResponse("Invalid token", "error");
        } catch (Exception e) {
            return new AuthorizationResponse("Invalid token", "error");
        }

        if (!((String) jwt.getClaim("token_use")).equals("id")) {
            return new AuthorizationResponse("Invalid token use", "error");
        }

        if (!((String) jwt.getClaim("iss")).equals(ISSUER)) {
            return new AuthorizationResponse("Invalid token issuer", "error");
        }

        if (!((ArrayList<String>) jwt.getClaim("aud")).contains(CLIENT_ID)) {
            return new AuthorizationResponse("Invalid client id", "error");
        }

        return new AuthorizationResponse("", "success", jwt);
    }

    public Map<String, String> obtainTokenFromHeader(String header) {
        String[] headerSplit = header.split(" ");

        if (headerSplit.length != 3) {
            return null;
        }

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access", headerSplit[1]);
        tokens.put("id", headerSplit[2]);
        return tokens;
    }

    public AuthorizationResponse authorize(String header) {
        Map<String, String> tokens = obtainTokenFromHeader(header);
        AuthorizationResponse authorizationResponse = new AuthorizationResponse();

        if (tokens == null) {
            authorizationResponse.setStatus("error");
            authorizationResponse.setError("Authorization header invalid or not found");
            return authorizationResponse;
        }

        AuthorizationResponse accessTokenResponse = verifyAccessToken(tokens.get("access"));
        if (accessTokenResponse.getStatus().equals("error")) {
            return accessTokenResponse;
        }

        AuthorizationResponse identityTokenResponse = verifyIdentityToken(tokens.get("id"));
        if (identityTokenResponse.getStatus().equals("error")) {
            return identityTokenResponse;
        }

        if (!accessTokenResponse.getJwt().getClaim("username").equals(identityTokenResponse.getJwt().getClaim("cognito:username"))) {
            return new AuthorizationResponse("Mismatch username", "error");
        }

        authorizationResponse.setError(null);
        authorizationResponse.setStatus("success");
        return new AuthorizationResponse(null, "success");
    }

    @Transactional
    public boolean isAdmin(String email) {
        Optional<UserStatus> userStatusOptional = userStatusRepository.findById(email);
        if (userStatusOptional.isEmpty()) {
            return false;
        }
        return userStatusOptional.get().getAdmin();
    }

    @Transactional
    public Response signUp(Map<String, Object> userInfo, String header) {
        Response response = new Response();
        Map<String, String> tokens = obtainTokenFromHeader(header);
        Jwt accessToken = jwtDecoder.decode(tokens.get("access"));

        // Verify user info belong to the user
        if (!userInfo.get("username").equals(accessToken.getClaim("username"))) {
            response.setStatus(403);
            response.setError("Username mismatch");
            return response;
        }

        // Add user to authentication database
        UserStatus userStatus = new UserStatus();
        userStatus.setEmail((String) userInfo.get("email"));
        userStatus.setAdmin(false);
        userStatusRepository.save(userStatus);

        // Add user to User database
        try {
            Response microserviceResponse = webClient.post().uri(microserviceUrl)
                    .body(Mono.just(userInfo), Object.class)
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return new Response(microserviceResponse.getStatus(), microserviceResponse.getError(), microserviceResponse.getData());
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(500, "Internal server error");
        }
    }

    public String getEmailFromIdToken(String idToken) {
        Jwt decodedToken = jwtDecoder.decode(idToken);
        return decodedToken.getClaim("email");
    }
}
