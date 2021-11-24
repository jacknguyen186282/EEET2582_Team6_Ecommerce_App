package assignment;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class,args);
        System.out.print("\n**********************************\nAccess: http://localhost:8080/index.html \n**********************************\n");
    }
}
