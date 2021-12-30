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
    private boolean gender;

    public User(){}

    public User(String email, boolean gender){
        this.email = email;
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public boolean isGender() {
        return gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

}

