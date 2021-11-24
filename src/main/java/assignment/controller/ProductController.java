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

    @RequestMapping(path = "/addProduct", method = RequestMethod.POST)
    public String addProduct(@RequestBody Product product){
        try {
            productService.addProduct(product);
        }catch (Exception e){
            return "failed";
        }
        return "success";
    }

    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

}
