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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthorizationService {
    private final String userMicroservice = "http://localhost:8082";
    private JwtDecoder jwtDecoder;
    private UserStatusRepository userStatusRepository;
    protected WebClient webClient;
    SQSService sqsService;

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

    public AuthorizationResponse authorizeAdmin(String header) {
        AuthorizationResponse authorizationResponse = new AuthorizationResponse();
        String idToken = obtainTokenFromHeader(header).get("id");
        String email = getEmailFromIdToken(idToken);
        if (isAdmin(email)) {
            authorizationResponse.setStatus("success");
            return authorizationResponse;
        }
        authorizationResponse.setStatus("error");
        authorizationResponse.setError("User is not admin");
        return authorizationResponse;
    }

    public AuthorizationResponse authorizeUser(String header, String email) {
        AuthorizationResponse authorizationResponse = authorize(header);
        if (authorizationResponse.getStatus().equals("error")) {
            return authorizationResponse;
        }
        authorizationResponse = authorizeAdmin(header);
        if (authorizationResponse.getStatus().equals("success")) {
            return authorizationResponse;
        }

        String idToken = obtainTokenFromHeader(header).get("id");
        String tokenEmail = getEmailFromIdToken(idToken);
        if (!tokenEmail.equals(email)) {
            authorizationResponse.setStatus("error");
            authorizationResponse.setError("Token email and user email mismatch");
            return authorizationResponse;
        }

        authorizationResponse.setStatus("success");
        authorizationResponse.setError(null);
        return authorizationResponse;
    }

    public AuthorizationResponse authorizeAdminUser(String header) {
        AuthorizationResponse authorizationResponse = authorize(header);
        if (authorizationResponse.getStatus().equals("error")) {
            return authorizationResponse;
        }
        authorizationResponse = authorizeAdmin(header);
        return authorizationResponse;
    }

    public boolean isAdmin(String email) {
        Optional<UserStatus> userStatusOptional = userStatusRepository.findById(email);
        if (userStatusOptional.isEmpty()) {
            try {
                // Get user status from database then add to cache
                Response microserviceResponse = webClient.get().uri(userMicroservice + "/user/getUserById?email=" + email)
                        .exchangeToMono(clientResponse -> {
                            return clientResponse.bodyToMono(Response.class);
                        }).block();

                if (microserviceResponse == null || microserviceResponse.getStatus() != 200 || microserviceResponse.getData() == null) {
                    return false;
                }
                Map<String, Object> user = (Map<String, Object>) microserviceResponse.getData();
                userStatusRepository.save(new UserStatus(email, (Boolean) user.get("userStatus")));
                return ((Boolean) user.get("userStatus"));
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        try {
            return userStatusOptional.get().getAdmin();
        } catch (Exception e) {
            return false;
        }
    }

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


        // Add User to database
        try {
            if (userInfo.containsKey("email")){
                sqsService.postUserQueue(userInfo);

                Boolean isAdmin = false;
                // Get user status from database then add to cache
                Response microserviceResponse = webClient.get().uri(userMicroservice + "/user/getUserById?email=" + ((String) userInfo.get("email")))
                        .exchangeToMono(clientResponse -> {
                            return clientResponse.bodyToMono(Response.class);
                        }).block();

                if (microserviceResponse != null && microserviceResponse.getStatus() == 200 && microserviceResponse.getData() != null) {
                    Map<String, Object> user = (Map<String, Object>) microserviceResponse.getData();
                    userStatusRepository.save(new UserStatus((String) userInfo.get("email"), (Boolean) user.get("admin")));
                    isAdmin = (Boolean) user.get("admin");
                }
                else {
                    String email = (String) userInfo.get("email");
                    if (email.toLowerCase().contains("rmit")){
                        isAdmin = true;
                        userStatusRepository.save(new UserStatus(email, isAdmin);
                    }
                }

                Response res = new Response(203, null);
                res.setData(isAdmin);
                return res;
            }
            else return new Response(400, "Missing params!");
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
