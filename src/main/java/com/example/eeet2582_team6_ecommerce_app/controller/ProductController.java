package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.AuthorizationResponse;
import com.example.eeet2582_team6_ecommerce_app.dto.Response;
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
@RequestMapping("/product")
public class ProductController extends BaseController {
    private final AuthorizationService authorizationService;
    @Autowired
    SQSService sqsService;

    public ProductController(WebClient webClient, AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
        super.microserviceUrl = "http://localhost:8081";
        super.webClient = webClient;
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Response> addProduct(HttpServletRequest httpServletRequest,
                                               @RequestBody Map<String, Object> product,
                                               @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            if (product.containsKey("name") && product.containsKey("subcategory") && product.containsKey("category")
                    && product.containsKey("price")  && product.containsKey("rating") && product.containsKey("description")  && product.containsKey("image_url")
                    && product.containsKey("isnew")  && product.containsKey("stock")){
                sqsService.postProductQueue(product, "add");
                return ResponseEntity.status(200).body(new Response(200, "Success!"));
            }
            else return ResponseEntity.status(400).body(new Response(400, "Missing params!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @DeleteMapping("/deleteProduct")
    public ResponseEntity<Response> deleteProduct(HttpServletRequest httpServletRequest,
                                                  @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            Map<String, Object> map = getQuery(httpServletRequest);
            if (map.containsKey("id")){
                sqsService.postProductQueue(map, "delete");
                return ResponseEntity.status(200).body(new Response(200, "Success!"));
            }
            else return ResponseEntity.status(400).body(new Response(400, "Missing params!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }

    @PostMapping("/updateProduct")
    public ResponseEntity<Response> updateProduct(HttpServletRequest httpServletRequest,
                                                  @RequestBody Map<String, Object> product,
                                                  @RequestHeader(value = "Authorization") String authorizationHeader) {
        AuthorizationResponse authorizationResponse = authorizationService.authorizeAdminUser(authorizationHeader);
        if (authorizationResponse.getStatus().equals("error")) {
            return ResponseEntity.status(403).body(new Response(403, authorizationResponse.getError()));
        }

        // Replace below http with queue
        try {
            if (product.containsKey("id") && product.containsKey("name") && product.containsKey("subcategory") && product.containsKey("category")
                    && product.containsKey("price")  && product.containsKey("rating") && product.containsKey("description")  && product.containsKey("image_url")
                    && product.containsKey("isnew")  && product.containsKey("stock")){
                sqsService.postProductQueue(product, "update");
                return ResponseEntity.status(200).body(new Response(200, "Success!"));
            }
            else return ResponseEntity.status(400).body(new Response(400, "Missing params!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new Response(500, "Internal server error"));
        }
    }
}
