package assignment.service;

import assignment.entity.Order;
import assignment.entity.Product;
import assignment.entity.User;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;

@Transactional
@Service
public class SQSService {
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;
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
            JSONObject obj = new JSONObject(message);
            userService.addUser(new User((String) obj.get("email"), (String) obj.get("gender")));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }

    @KafkaListener(topics = "order_request", groupId = "group_id")
    public void loadMessageFromOrderSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message);
            Optional<User> user = userService.getUserById((String) obj.get("user_id"));
            ArrayList<Product> products = new ArrayList<>();

            for (String id : ((String) obj.get("product_list")).split(",")) {
                Optional<Product> product = productService.getProductById(id);
                product.ifPresent(products::add);
            }

            JSONArray ja = new JSONArray(products);
            user.ifPresent(value -> orderService.addOrder(new Order((String) obj.get("user_id"), ja.toString(), (String) obj.get("shipping_address"), value.getGender())));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }
}
