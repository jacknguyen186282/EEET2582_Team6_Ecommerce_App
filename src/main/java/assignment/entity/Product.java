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
    private double price = (Math.random() * 35) + 5;

    @Column (nullable = false)
    private String isnew;

    @Column (length = 1024)
    private String image_url = "Undefined";

    @Column (nullable = false)
    private double like_count = Math.random() * 1000;

    @Column (nullable = false)
    private int noSold = (int)(Math.random() * 200);

    @Column (nullable = false)
    private String season;

    @Column (nullable = false)
    private String size;

    @Column (nullable = false)
    private int stock = (int)(Math.random() * 1000);

    public Product(){}

    public Product(String id, String name, String category, String subcategory, double price, boolean isnew, String image_url, int stock, int like_count, int noSold, String size, String season){
        this.id = id;
        this.name = name;
        this.category = (category.equals("null") || category.equals("")) ? null : category;
        this.image_url = (image_url.equals("null") || image_url.equals("")) ? null : image_url;
        this.isnew =  String.valueOf(isnew);
        this.size = size;
        this.season = season;
        this.subcategory = (subcategory.equals("null") || subcategory.equals("")) ? null : subcategory;
        if (price >= 5) this.price = price;
        if (stock >= 0) this.stock = stock;
        if (like_count >= 0) this.like_count = like_count;
        if (noSold >= 0) this.noSold = noSold;
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

    public int getNoSold() {
        return noSold;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public double getLike_count() {
        return like_count;
    }

    public String getSeason() {
        return season;
    }

    public String getSize() {
        return size;
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

    public void setLike_count(double like_count) {
        this.like_count = like_count;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public void setNoSold(int noSold) {
        this.noSold = noSold;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
