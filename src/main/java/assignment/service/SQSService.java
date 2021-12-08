package assignment.service;

import assignment.entity.Product;
import assignment.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.cloud.aws.messaging.listener.annotation.SqsListener;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Transactional
@Service
public class SQSService {
    @Autowired
    private QueueMessagingTemplate queueMessagingTemplate;
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @SqsListener("product")
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

    @SqsListener("user")
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
