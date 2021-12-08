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
     * API for adding a user
     * @param user user
     * @return Status of request
     */
    @RequestMapping(path = "/addUser", method = RequestMethod.POST)
    public String addUser(@RequestBody User user){
        try {
            return userService.addUser(user);
        }catch (Exception e){
            return "Add Failed!";
        }
    }

    /**
     * API for getting a list of user with filters (if any)
     * @return List of products
     */
    @RequestMapping(value = "/getUsers", method = RequestMethod.GET)
    public List<User> getUsers(@RequestParam int page){
        return userService.getAllUsers(page);
    }


    /**
     * API for deleting a user with the given id
     * @param id String
     * @return Request's status
     */
    @RequestMapping(path = "/deleteUser", method = RequestMethod.DELETE)
    public String deleteUser(@RequestParam String id) {
        try {
            userService.deleteByUserId(id);
        }catch (Exception e){
            return "Delete Failed!";
        }
        return "Delete Successful!";
    }

    /**
     * Get a user by ID with its relations (related products)
     * @param id String
     * @return a list of user
     */
    @RequestMapping(path = "/getUserById", method = RequestMethod.GET)
    public Optional<User> getUserById(@RequestParam String id) {
        try {
            return userService.getUserById(id);
        }catch (Exception e){
            return Optional.empty();
        }

    }

    /**
     * API for updating a user
     * @param user user
     * @return Request's status
     */
    @RequestMapping(path = "/updateUser", method = RequestMethod.POST)
    public String updateUser(@RequestBody User user) {
        try {
            userService.updateUser(user);
        }catch (Exception e){
            return "Update Failed!";
        }
        return "Update Successful!";
    }

}
