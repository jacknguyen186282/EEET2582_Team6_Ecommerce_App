package assignment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "order_db")
public class Order {
    @Id
    @Column
    private String id;

    @Column
    private String userid;

    @Column
    private String gender;

    @Column (length = 1024)
    private String product_list;

    @Column (length = 1024)
    private String shipping_address;

    @Column
    private double total;

    public Order() {}

    public Order(String userid, String product_list, String shipping_address, String gender, double total){
        this.id = String.valueOf((new Timestamp(System.currentTimeMillis())).getTime()) + "-" + userid;
        this.product_list = product_list;
        this.userid = userid;
        this.shipping_address = shipping_address;
        this.gender = gender;
        this.total = total;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getShipping_address() {
        return shipping_address;
    }

    public void setShipping_address(String shipping_address) {
        this.shipping_address = shipping_address;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getProduct_list() {
        return product_list;
    }

    public String getUserid() {
        return userid;
    }

    public void setProduct_list(String product_list) {
        this.product_list = product_list;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }
}
