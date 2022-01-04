package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import com.example.eeet2582_team6_ecommerce_app.repository.UserStatusRepository;
import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import com.example.eeet2582_team6_ecommerce_app.service.SQSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController extends BaseController {
    private final AuthorizationService authorizationService;
    private final UserStatusRepository userStatusRepository;
    @Autowired
    SQSService sqsService;

    public UserController(WebClient webClient, AuthorizationService authorizationService, UserStatusRepository userStatusRepository) {
        this.authorizationService = authorizationService;
        this.userStatusRepository = userStatusRepository;
        super.microserviceUrl = "http://localhost:8082";
        super.webClient = webClient;
    }


    @PostMapping("/login")
    public ResponseEntity<Response> addUser(HttpServletRequest httpServletRequest,
                                               @RequestBody Map<String, Object> user,
                                               @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            if (user.containsKey("email")){
                sqsService.postUserQueue(user);
                return ResponseEntity.status(203).body(new Response(203, null));
            }
            else return ResponseEntity.status(400).body(new Response(400, "Missing params!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
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
}
