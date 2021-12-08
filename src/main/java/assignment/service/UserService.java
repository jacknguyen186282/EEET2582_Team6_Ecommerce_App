package assignment.service;

import assignment.entity.User;
import assignment.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Transactional
@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    SQSService sqsService;
    /**
     * Add a user to database based on the given object
     * @param user user
     * @return Request's status
     */
    public String addUser(User user){
        if (getUserById(user.getId()).isPresent()) return "Duplicated ID!";
        this.userRepo.save(user);
        this.sqsService.postUserQueue(user, "add");
        return "Add Successful!";
    }

    public void addAll(List<User> users){
        this.userRepo.saveAll(users);
    }

    /**
     * Get all products from database
     * @return List of products
     */
    public List<User> getAllUsers(int current_page){
        return this.userRepo.findAll(PageRequest.of(current_page,10, Sort.by("id"))).getContent();
    }

    /**
     * Delete a user by given id
     * @param id String
     */
    public void deleteByUserId(String id){
        this.userRepo.deleteById(id);
        this.sqsService.deleteUserQueue(id);
    }

    /**
     * Get all information of the user based on the given id
     * @param id String
     * @return user
     */
    public Optional<User> getUserById(String id){
        return userRepo.findById(id);
    }

    /**
     * Update a specific user based on the new information
     * @param user user
     */
    public void updateUser(User user){
        this.userRepo.save(user);
        this.sqsService.postUserQueue(user, "update");
    }

    public boolean isExist(){
        Page<User> Users = this.userRepo.findAll(PageRequest.of(0,10));
        return Users.getTotalElements() > 0;
    }

}
