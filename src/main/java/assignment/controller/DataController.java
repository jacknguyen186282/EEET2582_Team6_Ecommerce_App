package assignment.controller;
import assignment.entity.Product;
import assignment.service.ProductService;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class DataController {
    @Autowired
    private ProductService productService;


    @RequestMapping(path = "/setupDatabase", method = RequestMethod.POST)
    public String setDatabase(){
        ArrayList<Product> products = new ArrayList<>();
        List<Product> list = productService.loadAllProducts();
        try {
            FileReader filereader = new FileReader("src/main/dataset/women.csv");

            // create csvReader object and skip first Line
            CSVReader csvReader = new CSVReaderBuilder(filereader)
                    .withSkipLines(1)
                    .build();

            String[] row;

            // we are going to read data line by line
            while ((row = csvReader.readNext()) != null)
                if (!isExist(list, row[20])) products.add(new Product(row[20], row[2], row[0], row[1], Double.parseDouble(row[4]), !row[8].equals("false"), row[18], 10));

            // Save to database
            for (Product product: products) productService.addProduct(product);

            return "Success!";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "Failed...";
    }

    private boolean isExist(List<Product> productList, String id){
        boolean found = false;
        for(Product element : productList) {
            if (element.getId().equals(id)) {
                found = true;
                break;
            }
        }
        return found;
    }
}
