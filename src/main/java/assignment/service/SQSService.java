package assignment.service;

import assignment.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

}
