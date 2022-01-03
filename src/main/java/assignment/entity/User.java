package assignment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "temp_user_db")
public class User {
    @Id
    @Column (length = 1024)
    private String email;

    @Column
    private String gender;

    public User(){}

    public User(String email, String gender){
        this.email = email;
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }



    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

