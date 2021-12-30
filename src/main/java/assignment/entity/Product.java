package assignment.entity;

import javax.persistence.*;

@Entity
@Table(name = "product_db")
public class Product{
    @Id
    @Column
    private String id;

    @Column (nullable = false, length = 1024)
    private String name;

    @Column (nullable = false)
    private String category;

    @Column (nullable = false)
    private String subcategory;

    @Column (nullable = false)
    private double price = (Math.random() * 200) + 10;

    @Column (nullable = false)
    private String isnew = "false";

    @Column (length = 1024)
    private String image_url = "Undefined";

    @Column (nullable = false)
    private int stock = (int)(Math.random() * 1000);

    @Column (nullable = false)
    private String description = "This is a product :)";

    @Column (nullable = false)
    private double rating = (Math.random() * 5);

    public Product(){}

    public Product(String id, String name, String category, String subcategory, double price, boolean isnew, String image_url, int stock, String description){
        this.id = id;
        this.name = name;
        this.category = (category.equals("null") || category.equals("")) ? null : category;
        this.image_url = (image_url.equals("null") || image_url.equals("")) ? null : image_url;
        this.isnew =  String.valueOf(isnew);
        this.subcategory = (subcategory.equals("null") || subcategory.equals("")) ? null : subcategory;
        if (description != null && !description.equals("")) this.description = description;
        if (price >= 0) this.price = price;
        if (stock >= 0) this.stock = stock;
    }


    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getIsnew() {
        return isnew;
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

    public void setPrice(double current_price) {
        this.price = current_price;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public void setIsnew(String isnew) {
        this.isnew = isnew;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }
}
