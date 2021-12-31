package assignment.controller;

import assignment.entity.Product;
import assignment.service.ProductService;

import org.json.JSONArray;
import org.json.JSONObject;
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
    public Map<String, Object> addProduct(@RequestBody Product product){
        Map<String, Object> response = new HashMap<>();
        try {
            productService.addProduct(product);
            response.put("data", "Add Successful!");
            response.put("status", 200);
            return response;
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
            return response;
        }
    }

    /**
     * API for getting a list of product with filters (if any)
     * @return List of products
     */
    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public Map<String, Object> getAllProducts(@RequestParam String category, @RequestParam String subcategory, @RequestParam String name, @RequestParam String isnew, @RequestParam String sort, @RequestParam int page){
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("data", productService.getAllProducts(category, subcategory, name, isnew, sort, page));
            response.put("status", 200);
            return response;
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
            return response;
        }
    }


    /**
     * API for deleting a product with the given id
     * @param id String
     * @return Request's status
     */
    @RequestMapping(path = "/deleteProduct", method = RequestMethod.DELETE)
    public Map<String, Object> deleteProductById(@RequestParam String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            productService.deleteByProductId(id);
            response.put("data", "Delete Successful!");
            response.put("status", 200);
            return response;
        }catch (Exception e){
            response.put("error", "PRODUCT_NOT_FOUND");
            response.put("status", 400);
            return response;
        }
    }

    /**
     * Get a product by ID with its relations (related products)
     * @param id String
     * @return a list of product
     */
    @RequestMapping(path = "/getProductById", method = RequestMethod.GET)
    public Map<String, Object> getProductById(@RequestParam String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Product> product = productService.getProductById(id);
            if (product.isPresent()) {
                response.put("data", product.get());
                response.put("status", 200);
            }
            else {
                response.put("error", "PRODUCT_NOT_FOUND");
                response.put("status", 400);
            }
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
        }
        return response;
    }

    /**
     * API for updating a product
     * @param product Product
     * @return Request's status
     */
    @RequestMapping(path = "/updateProduct", method = RequestMethod.POST)
    public Map<String, Object> updateProduct(@RequestBody Product product) {
        Map<String, Object> response = new HashMap<>();
        try {
            productService.updateProduct(product);
            response.put("data", "Update Successful!");
            response.put("status", 200);
            return response;
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
            return response;
        }
    }

}
