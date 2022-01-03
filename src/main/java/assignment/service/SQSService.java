package assignment.service;

import assignment.entity.Product;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class SQSService {
    private static final String TOPIC = "product_service";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    ProductService productService;

    public void postProductQueue(Product product, String action) {
        Map<String, String> map = new HashMap<>();
        map.put("id", product.getId());
        map.put("name", product.getName());
        map.put("price", String.valueOf(product.getPrice()));
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC, (action + "----------" + json.toString()));
    }

    public void deleteProductQueue(String id) {
        Map<String, String> map = new HashMap<>();
        map.put("id", id);
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC,"delete----------" + json.toString());
    }

    @KafkaListener(topics = "product_request", groupId = "group_id")
    public void loadMessageFromProductSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message.split("----------")[1]);
            String action = message.split("----------")[0];

            Product product = new Product((action.equals("add")) ? null : (String) obj.get("id"), (String) obj.get("name"), (String) obj.get("category"), (String) obj.get("subcategory"), Double.parseDouble((String) obj.get("price")), Boolean.getBoolean((String) obj.get("isnew")), (String) obj.get("image_url"), Integer.parseInt((String) obj.get("stock")), (String) obj.get("description"));
            
            if (action.equals("add")) productService.addProduct(product);
            else if (action.equals("update")) productService.updateProduct(product);
            else productService.deleteByProductId((String) obj.get("id"));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }

}
