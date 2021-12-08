package assignment.service;

import assignment.entity.Product;
import assignment.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Transactional
@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;

    /**
     * Add a product to database based on the given object
     * @param product Product
     * @return Request's status
     */
    public void addProduct(Product product){
        this.productRepo.save(product);
    }


    /**
     * Delete a product by given id
     * @param id String
     */
    public void deleteByProductId(String id){
        this.productRepo.deleteById(id);
    }

    /**
     * Update a specific product based on the new information
     * @param product Product
     */
    public void updateProduct(Product product){
        this.productRepo.save(product);
    }

    public Optional<Product> getProductById(String id){
        return productRepo.findById(id);
    }
}
