package com.example.eeet2582_team6_ecommerce_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
public class AuthenticationController {

    @Autowired
    JwtDecoder jwtDecoder;

    @GetMapping("/api/login")
    public ResponseEntity<Jwt> loginGroup(@RequestParam String token) {
        return ResponseEntity.ok().body(jwtDecoder.decode(token));
    }
}
