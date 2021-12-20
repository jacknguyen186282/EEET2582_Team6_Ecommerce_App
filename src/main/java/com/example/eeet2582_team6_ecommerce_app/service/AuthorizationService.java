package com.example.eeet2582_team6_ecommerce_app.service;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import lombok.AllArgsConstructor;
import lombok.Cleanup;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthorizationService {
    private JwtDecoder jwtDecoder;

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

        return new AuthorizationResponse("", "success");
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

        return new AuthorizationResponse("", "success");
    }

    public Map<String, String> obtainTokenHeader(String header) {
        String[] headerSplit = header.split(" ");

        if (headerSplit.length != 3) {
            return null;
        }

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access", headerSplit[1]);
        tokens.put("id", headerSplit[2]);
        return tokens;
    }
}
