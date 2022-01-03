package com.example.eeet2582_team6_ecommerce_app.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SQSService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void postUserQueue(Map<String, Object> object) {
        JSONObject json = new JSONObject(object);
        this.kafkaTemplate.send("user_request",  json.toString());
    }

    public void postProductQueue(Map<String, Object> object, String action) {
        JSONObject json = new JSONObject(object);
        this.kafkaTemplate.send("product_request", (action + "----------" + json.toString()));
    }

    public void postOrderQueue(Map<String, Object> object) {
        JSONObject json = new JSONObject(object);
        this.kafkaTemplate.send("order_request", (json.toString()));
    }
}