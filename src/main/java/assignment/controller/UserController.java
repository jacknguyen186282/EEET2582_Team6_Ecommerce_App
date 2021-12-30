package assignment.controller;

import assignment.entity.User;
import assignment.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * API for getting a list of user with filters (if any)
     * @return List of products
     */
    @RequestMapping(value = "/getUsers", method = RequestMethod.GET)
    public  Map<String, Object> getUsers(@RequestParam int page){
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("data", userService.getAllUsers(page));
            response.put("status", 200);
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
        }
        return response;
    }


    /**
     * API for deleting a user with the given email
     * @param email String
     * @return Request's status
     */
    @RequestMapping(path = "/deleteUser", method = RequestMethod.DELETE)
    public Map<String, Object> deleteUser(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.deleteByUserId(email);
            response.put("data", "Delete Successful!");
            response.put("status", 200);
        }catch (Exception e){
            response.put("error", "USER_NOT_FOUND");
            response.put("status", 400);
        }
        return response;
    }

    /**
     * Get a user by email
     * @param email String
     * @return a list of user
     */
    @RequestMapping(path = "/getUserById", method = RequestMethod.GET)
    public Map<String, Object> getUserById(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("data", userService.getUserById(email));
            response.put("status", 200);
        }catch (Exception e){
            response.put("error", "USER_NOT_FOUND");
            response.put("status", 400);
        }
        return response;
    }

    /**
     * API for updating a user
     * @param user user
     * @return Request's status
     */
    @RequestMapping(path = "/updateUser", method = RequestMethod.POST)
    public Map<String, Object> updateUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.updateUser(user);
            response.put("data", "Update Successful!");
            response.put("status", 200);
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
        }
        return response;
    }

    /**
     * API for adding a user
     * @param user user
     * @return Status of request
     */
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.addUser(user);
            response.put("data", "Add Successful!");
            response.put("status", 200);
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
        }
        return response;
    }
}
