package com.example.eeet2582_team6_ecommerce_app.controller;

import com.example.eeet2582_team6_ecommerce_app.dto.Response;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@NoArgsConstructor
public class BaseController {
    protected String microserviceUrl = "http://localhost:5000";
    protected WebClient webClient;

    protected String createUrl(String servletPath, String queryString) {
        String url = microserviceUrl;
        if (servletPath != null) {
            url += servletPath;
        }

        if (queryString != null) {
            url += "?" + queryString;
        }
        return url;
    }

    @GetMapping("/**")
    public ResponseEntity<Response> getData(HttpServletRequest httpServletRequest) {
        String servletPath = httpServletRequest.getServletPath();
        String queryString = httpServletRequest.getQueryString();
        String requestUrl = createUrl(servletPath, queryString);

        try {
            Response microserviceResponse = webClient.get().uri(requestUrl)
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();

            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(500, "Internal server error"));
        }
    }

    @PostMapping("/**")
    public ResponseEntity<Response> postData(HttpServletRequest httpServletRequest, @RequestBody Object body) {
        String servletPath = httpServletRequest.getServletPath();
        String queryString = httpServletRequest.getQueryString();
        String requestUrl = createUrl(servletPath, queryString);

        try {
            Response microserviceResponse = webClient.post().uri(requestUrl)
                    .body(Mono.just(body), Object.class)
                    .exchangeToMono(clientResponse -> {
                        return clientResponse.bodyToMono(Response.class);
                    }).block();

            return ResponseEntity.status(microserviceResponse.getStatus()).body(microserviceResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(500, "Internal server error"));
        }
    }
}
