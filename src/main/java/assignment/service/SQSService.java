package assignment.service;

import assignment.entity.Product;
import assignment.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Transactional
@Service
public class SQSService {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @KafkaListener(topics = "product_service", groupId = "group_id")
    public void loadMessageFromProductSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message.split("----------")[1]);
            String action = message.split("----------")[0];
            if (action.equals("add")) productService.addProduct(new Product((String) obj.get("id"), (String) obj.get("name"), Double.parseDouble((String) obj.get("price"))));
            else if (action.equals("update")) productService.updateProduct(new Product((String) obj.get("id"), (String) obj.get("name"), Double.parseDouble((String) obj.get("price"))));
            else productService.deleteByProductId((String) obj.get("id"));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }

    @KafkaListener(topics = "user_service", groupId = "group_id")
    public void loadMessageFromUserSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message.split("----------")[1]);
            String action = message.split("----------")[0];
            if (action.equals("add")) userService.addUser(new User((String) obj.get("id"), (String) obj.get("email"), Boolean.getBoolean((String) obj.get("gender"))));
            else if (action.equals("update")) userService.updateUser(new User((String) obj.get("id"), (String) obj.get("email"), Boolean.getBoolean((String) obj.get("gender"))));
            else userService.deleteByUserId((String) obj.get("id"));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }
}
