package assignment.controller;
import assignment.entity.User;
import assignment.entity.UserTemp;
import assignment.service.OrderSetup;
import assignment.service.UserService;
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
    private UserService userService;
    @Autowired
    private OrderSetup orderSetup;
    /**
     * API for initializing the database if there is no data in it
     * @return Request's status
     */
    @RequestMapping(path = "/setupDatabase", method = RequestMethod.POST)
    public String setDatabase(){
        ArrayList<User> users = new ArrayList<>();
        ArrayList<UserTemp> temp_users = new ArrayList<>();
        if (userService.isExist()) return "Already initialized database!";
        System.out.println("Adding...!");
        try {
            String[] row;
            FileReader filereader = new FileReader("./src/main/dataset/user.csv");
            CSVReader csvReader = new CSVReaderBuilder(filereader)
                    .withSkipLines(1)
                    .build();
            while ((row = csvReader.readNext()) != null){
                users.add(new User(row[0], row[1], row[2], row[3].equals("M"), row[4].equals("TRUE")));
                temp_users.add(new UserTemp(row[0], row[1],  row[3].equals("M")));
            }
            userService.addAll(users);
            orderSetup.addAll(temp_users);
            return "Success!";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "Failed...";
    }
}
