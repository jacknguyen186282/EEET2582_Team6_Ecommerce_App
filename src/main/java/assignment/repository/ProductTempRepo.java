package assignment.repository;

import assignment.entity.ProductTemp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTempRepo extends JpaRepository<ProductTemp, String>{
}
