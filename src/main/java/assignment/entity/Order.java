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

    @Column (length = 1024)
    private String product_list;

    public Order() {}

    public Order(String userid, String product_list){
        this.id = String.valueOf((new Timestamp(System.currentTimeMillis())).getTime()) + userid;
        this.product_list = product_list;
        this.userid = userid;
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
