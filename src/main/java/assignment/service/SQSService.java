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

    public void postUserQueue(User user) {
        Map<String, String> map = new HashMap<>();
        map.put("email", user.getEmail());
        map.put("gender", user.getGender());
        JSONObject json = new JSONObject(map);
        this.kafkaTemplate.send(TOPIC,  json.toString());
    }

    @KafkaListener(topics = "user_request", groupId = "group_id")
    public void loadMessageFromUserSQS(String message)  {
        try {
            JSONObject obj = new JSONObject(message);
            userService.addUser(new User((String) obj.get("email")));
        }
        catch (Exception e){
            System.out.println("Receive message from SQS Queue: Dummy message");
        }
    }

}
