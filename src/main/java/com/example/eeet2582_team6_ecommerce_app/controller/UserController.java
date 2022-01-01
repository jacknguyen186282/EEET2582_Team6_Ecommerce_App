package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import com.example.eeet2582_team6_ecommerce_app.repository.UserStatusRepository;
import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController extends BaseController {
    private final AuthorizationService authorizationService;
    private final UserStatusRepository userStatusRepository;

    public UserController(WebClient webClient, AuthorizationService authorizationService, UserStatusRepository userStatusRepository) {
        this.authorizationService = authorizationService;
        this.userStatusRepository = userStatusRepository;
        super.microserviceUrl = "http://localhost:8082";
        super.webClient = webClient;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<Response> getUsers(HttpServletRequest httpServletRequest,
                                             @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        try {
            Response microserviceResponse = webClient.get().uri(createUrl(httpServletRequest))
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<Response> deleteUser(HttpServletRequest httpServletRequest,
                                                @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            Response microserviceResponse = webClient.delete().uri(createUrl(httpServletRequest))
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @GetMapping("/getUserById")
    public ResponseEntity<Response> getUserById(HttpServletRequest httpServletRequest,
                                                @RequestParam String email,
                                                @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeUser(authorizationHeader, email);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        try {
            Response microserviceResponse = webClient.get().uri(createUrl(httpServletRequest))
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @PostMapping("/updateUser")
    public ResponseEntity<Response> updateUser(HttpServletRequest httpServletRequest,
                                                @RequestBody Object body,
                                                @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdmin(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            Response microserviceResponse = webClient.post().uri(createUrl(httpServletRequest))
                    .body(Mono.just(body), Object.class)
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }
}
