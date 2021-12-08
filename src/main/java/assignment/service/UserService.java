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
     * Add a product to database based on the given object
     * @param user Product
     */
    public void addUser(User user){
        this.userRepo.save(user);
    }


    /**
     * Delete a product by given id
     * @param id String
     */
    public void deleteByUserId(String id){
        this.userRepo.deleteById(id);
    }

    /**
     * Update a specific product based on the new information
     * @param user Product
     */
    public void updateUser(User user){
        this.userRepo.save(user);
    }

}
