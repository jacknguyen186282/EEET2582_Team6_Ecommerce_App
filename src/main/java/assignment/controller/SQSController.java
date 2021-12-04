package assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.cloud.aws.messaging.listener.annotation.SqsListener;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SQSController {
    @Autowired
    private QueueMessagingTemplate queueMessagingTemplate;

    @Value("${cloud.aws.end-point.uri}")
    private String endpoint;

    @GetMapping("/send")
    public String sendMessageToQueue(@RequestParam String message) {
        queueMessagingTemplate.send(endpoint, MessageBuilder.withPayload(message).build());
        return "Successfully send message: " + message;
    }

    @SqsListener("test-queue")
    public void loadMessageFromSQS(String message)  {
        System.out.println("Receive message from SQS Queue: " + message);
    }
}
