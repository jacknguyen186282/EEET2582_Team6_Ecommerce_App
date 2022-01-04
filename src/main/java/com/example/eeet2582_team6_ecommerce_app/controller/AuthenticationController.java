package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@AllArgsConstructor
public class AuthenticationController {
    private AuthorizationService authorizationService;
//    private JwtDecoder jwtDecoder;

//    @GetMapping("/api/authorize")
//    public ResponseEntity<Response> authorize(@RequestHeader(value = "Authorization") String authorizationHeader) {
//        AuthorizationResponse authorizationResponse = authorizationService.authorize(authorizationHeader);
//        if (authorizationResponse.getStatus().equals("error")) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(403, authorizationResponse.getError()));
//        }
//        return ResponseEntity.ok().body(new Response(200, null));
//    }
//
//    @GetMapping("/api/decode")
//    public Jwt authorizeCode(@RequestParam String token) {
//        return jwtDecoder.decode(token);
//    }

    @PostMapping("/api/signup")
    public ResponseEntity<Response> signUp(@RequestHeader(value = "Authorization") String authorizationHeader,
                                        @RequestBody Map<String, Object> userInfo) {
        AuthorizationResponse authorizationResponse = authorizationService.authorize(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(403, authorizationResponse.getError()));
        }
        Response response = authorizationService.signUp(userInfo, authorizationHeader);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

//    @GetMapping("/api/verifyAdmin")
//    public ResponseEntity<Response> verifyAdmin(@RequestHeader(value = "Authorization") String authorizationHeader) {
//        AuthorizationResponse authorizationResponse = authorizationService.authorize(authorizationHeader);
//        if (authorizationResponse.getStatus().equals("error")) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(403, authorizationResponse.getError()));
//        }
//
//        Map<String, String> token = authorizationService.obtainTokenFromHeader(authorizationHeader);
//        String email = authorizationService.getEmailFromIdToken(token.get("id"));
//        Boolean isAdmin = authorizationService.isAdmin(email);
//        Map<String, Object> responseData = new HashMap<>();
//        responseData.put("email", email);
//        responseData.put("isAdmin", isAdmin);
//
//        Response response = new Response(200, null, responseData);
//        return ResponseEntity.ok().body(response);
//    }
//
//    @GetMapping("/api/user")
//    public Map<String, Object> isAdmin(@RequestParam String email) {
//        Map<String, Object> response = new HashMap<>();
//        response.put("isAdmin", authorizationService.isAdmin(email));
//        return response;
//    }
//
//    @GetMapping("/api/authorize")
//    public Response authorizeUser(@RequestHeader(value = "Authorization") String authorizationHeader) {
//        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
//        return new Response(200, authorizationResponse.getStatus());
//    }
}
