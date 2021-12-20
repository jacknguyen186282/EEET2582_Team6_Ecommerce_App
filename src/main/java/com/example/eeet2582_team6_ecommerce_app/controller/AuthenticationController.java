package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@AllArgsConstructor
public class AuthenticationController {
    /*
    * Controller only use for testing purpose
    * */

    private AuthorizationService authorizationService;
    private JwtDecoder jwtDecoder;

    @GetMapping("/api/authorize")
    public ResponseEntity<AuthorizationResponse> authorize(@RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = new AuthorizationResponse();

        Map<String, String> tokens = authorizationService.obtainTokenHeader(authorizationHeader);
        if (tokens == null) {
            authorizationResponse.setStatus("error");
            authorizationResponse.setError("Authorization header invalid or not found");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(authorizationResponse);
        }

        authorizationResponse = authorizationService.verifyAccessToken(tokens.get("access"));
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(authorizationResponse);
        }
        authorizationResponse = authorizationService.verifyIdentityToken(tokens.get("id"));
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(authorizationResponse);
        }
        return ResponseEntity.ok().body(authorizationResponse);
    }

    @GetMapping("/api/decode")
    public Jwt authorizeCode(@RequestParam String token) {
        return jwtDecoder.decode(token);
    }
}
