package assignment.repository;

import assignment.entity.Product;
import assignment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String>{
}
