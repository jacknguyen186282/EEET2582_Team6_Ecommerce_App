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

    /**
     * API for initializing the database if there is no data in it
     * @return Request's status
     */
    @RequestMapping(path = "/setupDatabase", method = RequestMethod.POST)
    public String setDatabase(){
        ArrayList<Product> products = new ArrayList<>();
        if (productService.isExist()) return "Already initialized database!";
        String[] arr = {"women", "men", "kids", "bags", "beauty", "accessories", "house", "shoes"};
        System.out.println("Adding...!");
        try {
            String[] row;
            String[] size;
            int count = 0;
            String[] seasons = {"Spring", "Summer", "Autumn ", "Winter"};

            outerLoop:
            for (String category : arr) {
                FileReader filereader;

                // create csvReader object and skip first Line
                CSVReader csvReader;

                if (category.equals("beauty") || category.equals("house"))
                    size = new String[]{"red", "pink", "nude", "orange"};
                else {
                    size = new String[]{"s", "m", "l", "oversize"};
                }

                // we are going to read data line by line
                for (String season: seasons) {
                    for (String s : size) {
                        filereader = new FileReader("./src/main/dataset/" + category + ".csv");
                        csvReader = new CSVReaderBuilder(filereader)
                                .withSkipLines(1)
                                .build();
                        while ((row = csvReader.readNext()) != null){
                            products.add(new Product((row[20] + "-" + season + "-" + s), (row[2] + "-" + season + "-" + s), row[0], row[1], Double.parseDouble(row[4]), !row[8].equals("FALSE"), row[18], -1, -1, -1, s, season));
                            count ++;
                            if (count >= 1000000){
                                break outerLoop;
                            }
                        }
                    }
                }
            }
            productService.addAll(products);
            return "Success!";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "Failed...";
    }
}
