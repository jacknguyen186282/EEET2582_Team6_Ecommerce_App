package assignment.repository;

import assignment.entity.UserTemp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTempRepo extends JpaRepository<UserTemp, String>{
}
