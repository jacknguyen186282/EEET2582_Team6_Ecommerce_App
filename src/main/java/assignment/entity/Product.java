package assignment.entity;

import javax.persistence.*;

@Entity
@Table(name = "Products")
public class Product{
    @Id
    @Column
    private String id;

    @Column
    private String name;

    @Column
    private String category;

    @Column
    private String subcategory;

    @Column
    private double current_price;

    @Column
    private boolean is_new;

    @Column (length = 1024)
    private String image_url = "Undefined";

    @Column
    private int stock = 0;

    public Product(){}

    public Product(String id, String name, String category, String subcategory, double current_price, boolean is_new, String image_url, int stock){
        this.id = id;
        this.name = name;
        this.category = (category.equals("null") || category.equals("")) ? "Undefined" : category;
        this.image_url = (image_url.equals("null") || image_url.equals("")) ? "Undefined" : image_url;
        this.current_price = current_price;
        this.is_new =  is_new;
        this.subcategory = (subcategory.equals("null") || subcategory.equals("")) ? "Undefined" : subcategory;
        this.stock = stock;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public double getCurrent_price() {
        return current_price;
    }

    public int getStock() {
        return stock;
    }

    public String getCategory() {
        return category;
    }

    public String getImage_url() {
        return image_url;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public boolean isIs_new() {
        return is_new;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCurrent_price(double current_price) {
        this.current_price = current_price;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public void setIs_new(boolean is_new) {
        this.is_new = is_new;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }
}
