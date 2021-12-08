package assignment.service;

import assignment.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
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

    @Value("${cloud.aws.end-point.uri}")
    private String endpoint;

    public void postUserQueue(User user, String action) {
        Map<String, String> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("gender", String.valueOf(user.isGender()));
        JSONObject json = new JSONObject(map);
        queueMessagingTemplate.send(endpoint, MessageBuilder.withPayload(action + "----------" + json.toString()).build());
    }

    public void deleteUserQueue(String id) {
        Map<String, String> map = new HashMap<>();
        map.put("id", id);
        JSONObject json = new JSONObject(map);
        queueMessagingTemplate.send(endpoint, MessageBuilder.withPayload("delete----------" + json.toString()).build());
    }

}
