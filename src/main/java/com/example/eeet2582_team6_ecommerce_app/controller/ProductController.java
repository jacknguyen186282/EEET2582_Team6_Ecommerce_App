package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController extends BaseController {
    private AuthorizationService authorizationService;

    public ProductController(WebClient webClient) {
        super.microserviceUrl = "http://localhost:5000";
        super.webClient = webClient;
    }

}
