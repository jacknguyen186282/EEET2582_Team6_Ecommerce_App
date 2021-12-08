package assignment.service;

import assignment.entity.ProductTemp;
import assignment.repository.ProductTempRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class OrderSetup {
    @Autowired
    ProductTempRepo productTempRepo;
    public void addAll(List<ProductTemp> products){
        this.productTempRepo.saveAll(products);
    }

}
