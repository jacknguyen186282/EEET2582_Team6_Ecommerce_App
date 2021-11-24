package assignment.service;

import assignment.entity.Product;
import assignment.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Transactional
@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;
    private List<Product> productList = new ArrayList<>();
    private boolean init = true;

    public void addProduct(Product product){
        this.productList.add(product);
        this.productRepo.save(product);
        System.out.println("Add item: " + product.getId());
    }

    public List<Product> loadAllProducts(){
        if (init) {
            productList = this.productRepo.findAll();
            init = false;
        }
        return productList;
    }

    public List<Product> getAllProducts(){
        loadAllProducts().sort(new Comparator<Product>() {
            @Override
            public int compare(Product product1, Product product2) {
                return product1.getId().toLowerCase().compareTo(product2.getId().toLowerCase());
            }
        });

        return productList;
    }
}
