package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController extends BaseController {
    private final AuthorizationService authorizationService;

    public OrderController(WebClient webClient, AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
        super.microserviceUrl = "http://localhost:8080";
        super.webClient = webClient;
    }

    @GetMapping("/getOrders")
    public ResponseEntity<Response> getOrders(HttpServletRequest httpServletRequest,
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

    @PostMapping("/addOrder")
    public ResponseEntity<Response> addOrder(HttpServletRequest httpServletRequest,
                                              @RequestBody Map<String, Object> order,
                                              @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeUser(authorizationHeader, (String) order.get("userid"));
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            Response microserviceResponse = webClient.post().uri(createUrl(httpServletRequest))
                    .body(Mono.just(order), Map.class)
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();
            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @GetMapping("/getOrderByUser")
    public ResponseEntity<Response> getOrderByUser(HttpServletRequest httpServletRequest,
                                                   @RequestParam String user_id,
                                                   @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeUser(authorizationHeader, user_id);
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
