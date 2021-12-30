package assignment.service;

import assignment.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
public class SQSService {
    private static final String TOPIC = "user_service";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private UserService userService;

    public void postUserQueue(User user, String action) {
        Map<String, String> map = new HashMap<>();
        map.put("email", user.getEmail());
        map.put("gender", user.getGender());
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC, (action + "----------" + json.toString()));
    }

    public void deleteUserQueue(String id) {
        Map<String, String> map = new HashMap<>();
        map.put("id", id);
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC,("delete----------" + json.toString()));
    }

    @KafkaListener(topics = "user_request", groupId = "group_id")
    public void loadMessageFromUserSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message.split("----------")[1]);
            String action = message.split("----------")[0];

            if (action.equals("add")) userService.addUser(new User((String) obj.get("email")));
            else if (action.equals("update")) userService.updateUser(new User((String) obj.get("email")));
            else userService.deleteByUserId((String) obj.get("id"));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }

}
