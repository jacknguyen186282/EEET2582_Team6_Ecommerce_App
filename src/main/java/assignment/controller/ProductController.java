package assignment.controller;

import assignment.entity.Product;
import assignment.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    /**
     * API for adding a product
     * @param product Product
     * @return Status of request
     */
    @RequestMapping(path = "/addProduct", method = RequestMethod.POST)
    public String addProduct(@RequestBody Product product){
        try {
            return productService.addProduct(product);
        }catch (Exception e){
            return "Add Failed!";
        }
    }

    /**
     * API for getting a list of product with filters (if any)
     * @return List of products
     */
    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public List<Product> getAllProducts(@RequestParam int page){
        return productService.getAllProducts(page);
    }


    /**
     * API for deleting a product with the given id
     * @param id String
     * @return Request's status
     */
    @RequestMapping(path = "/deleteProduct", method = RequestMethod.DELETE)
    public String deleteProductById(@RequestParam String id) {
        try {
            productService.deleteByProductId(id);
        }catch (Exception e){
            return "Delete Failed!";
        }
        return "Delete Successful!";
    }

    /**
     * Get a product by ID with its relations (related products)
     * @param id String
     * @return a list of product
     */
    @RequestMapping(path = "/getProductById", method = RequestMethod.GET)
    public Optional<Product> getProductById(@RequestParam String id) {
        try {
            return productService.getProductById(id);
        }catch (Exception e){
            return Optional.empty();
        }

    }

    /**
     * API for updating a product
     * @param product Product
     * @return Request's status
     */
    @RequestMapping(path = "/updateProduct", method = RequestMethod.POST)
    public String updateProduct(@RequestBody Product product) {
        try {
            productService.updateProduct(product);
        }catch (Exception e){
            return "Update Failed!";
        }
        return "Update Successful!";
    }

}
