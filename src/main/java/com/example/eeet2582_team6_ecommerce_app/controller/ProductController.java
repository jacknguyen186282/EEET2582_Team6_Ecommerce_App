package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.service.AuthorizationService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController extends BaseController {
    private AuthorizationService authorizationService;

    public ProductController(WebClient webClient) {
        super.microserviceUrl = "http://product:8081";
        super.webClient = webClient;
    }
}
