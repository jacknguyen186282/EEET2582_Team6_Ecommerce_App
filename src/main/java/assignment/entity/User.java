package assignment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "temp_user_db")
public class User {
    @Id
    @Column
    private String id;

    @Column (nullable = false, length = 1024)
    private String email;

    @Column
    private boolean gender;

    public User(){}

    public User(String id, String email, boolean gender){
        this.id = id;
        this.email = email;
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
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

    public void setId(String id) {
        this.id = id;
    }
}

