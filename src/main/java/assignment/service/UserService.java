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
    public void addUser(User user){
        if (getUserById(user.getEmail()).isEmpty()) {
            this.sqsService.postUserQueue(user);
            this.userRepo.save(user);
        }
    }

    /**
     * Get all products from database
     * @return List of products
     */
    public List<User> getAllUsers(int current_page){
        return this.userRepo.findAll(PageRequest.of(current_page,10, Sort.by("email"))).getContent();
    }

    /**
     * Get all information of the user based on the given id
     * @param email String
     * @return user
     */
    public Optional<User> getUserById(String email){
        return userRepo.findById(email);
    }
}
