package com.example.eeet2582_team6_ecommerce_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorizationResponse {
    private String error;
    private String status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthorizationResponse that = (AuthorizationResponse) o;
        return Objects.equals(error, that.error) && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(error, status);
    }
}
