package com.example.eeet2582_team6_ecommerce_app.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@RedisHash("UserStatus")
public class UserStatus implements Serializable {

    @Id
    private String email;

    private Boolean admin;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserStatus that = (UserStatus) o;
        return Objects.equals(email, that.email) && Objects.equals(admin, that.admin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, admin);
    }
}
