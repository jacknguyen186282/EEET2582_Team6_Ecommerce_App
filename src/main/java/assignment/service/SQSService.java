package assignment.service;

import assignment.entity.Product;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class SQSService {
    private static final String TOPIC = "product_service";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    void postProductQueue(Product product, String action) {
        Map<String, String> map = new HashMap<>();
        map.put("id", product.getId());
        map.put("name", product.getName());
        map.put("price", String.valueOf(product.getPrice()));
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC, (action + "----------" + json.toString()));
    }

    void deleteProductQueue(String id) {
        Map<String, String> map = new HashMap<>();
        map.put("id", id);
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC,"delete----------" + json.toString());
    }

}
