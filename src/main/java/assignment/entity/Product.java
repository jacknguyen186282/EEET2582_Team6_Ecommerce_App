package assignment.entity;

import javax.persistence.*;

@Entity
@Table(name = "temp_product_db")
public class Product{
    @Id
    @Column
    private String id;

    @Column (nullable = false, length = 1024)
    private String name;

    @Column (nullable = false)
    private double price = (Math.random() * 35) + 5;

    public Product(){}

    public Product(String id, String name, double price){
        this.id = id;
        this.name = name;
        if (price >= 0) this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public double getPrice() {
        return price;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPrice(double current_price) {
        this.price = current_price;
    }

}
