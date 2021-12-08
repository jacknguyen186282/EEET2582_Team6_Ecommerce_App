package assignment.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_db")
public class User {
    @Id
    @Column
    private String id;

    @Column (nullable = false, length = 1024)
    private String username;

    @Column (nullable = false, length = 1024)
    private String email;

    private boolean gender;

    private boolean isAdmin;

    public User(){}

    public User(String id, String email,String username, boolean gender, boolean isAdmin){
        this.id = id;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.isAdmin = isAdmin;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public boolean isGender() {
        return gender;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
