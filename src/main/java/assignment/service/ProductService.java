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
    @Autowired
    SQSService sqsService;
    /**
     * Add a product to database based on the given object
     * @param product Product
     * @return Request's status
     */
    public String addProduct(Product product){
        if (getProductById(product.getId()).isPresent()) return "Duplicated ID!";
        this.sqsService.postProductQueue(product, "add");
        this.productRepo.save(product);
        return "Add Successful!";
    }

    public void addAll(List<Product> products){
        this.productRepo.saveAll(products);
    }

    /**
     * Get all products from database
     * @return List of products
     */
    public List<Product> getAllProducts(String category, String subcategory, String name, String isnew, String sort, int current_page){
        String sortType = "";
        if (sort != null) sortType = sort;

        return this.productRepo.findByCategoryContainsAndSubcategoryContainsAndNameContainsAndIsnewContains(
                category,
                subcategory,
                name,
                isnew,
                PageRequest.of(current_page,10, (sortType.equals("")) ? Sort.by("id") : (sortType.equals("asc")) ? Sort.by("price") : Sort.by("price").descending())
        ).getContent();
    }

    /**
     * Delete a product by given id
     * @param id String
     */
    public void deleteByProductId(String id){
        this.sqsService.deleteProductQueue(id);
        this.productRepo.deleteById(id);
    }

    /**
     * Get all information of the product based on the given id
     * @param id String
     * @return Product
     */
    public Optional<Product> getProductById(String id){
        return productRepo.findById(id);
    }

    /**
     * Update a specific product based on the new information
     * @param product Product
     */
    public void updateProduct(Product product){
        this.sqsService.postProductQueue(product, "update");
        this.productRepo.save(product);
    }

    public boolean isExist(){
        Page<Product> products = this.productRepo.findAll(PageRequest.of(0,10));
        return products.getTotalElements() > 0;
    }

}
