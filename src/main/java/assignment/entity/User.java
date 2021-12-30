package assignment.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_db")
public class User {
    @Id
    @Column
    private String email;
    @Column
    private String gender = (Math.random() >= 0.5) ? "Male" : "Female";
    @Column
    private boolean isAdmin;

    public User(){}

    public User(String email){
        this.email = email;
        System.out.println(email.toLowerCase());
        this.isAdmin = email.toLowerCase().contains("admin");
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
