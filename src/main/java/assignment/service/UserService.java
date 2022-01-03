package assignment.service;

import assignment.entity.Product;
import assignment.entity.User;
import assignment.repository.ProductRepo;
import assignment.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    /**
     * Add a user to database based on the given object
     * @param user user
     * @return Request's status
     */
    public void addUser(User user){
        if (getUserById(user.getEmail()).isEmpty())
            this.userRepo.save(user);
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
