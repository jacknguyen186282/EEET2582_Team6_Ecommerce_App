package com.example.eeet2582_team6_ecommerce_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private Integer status;
    private String error;
    private Object data;

    public Response(Integer status, String error) {
        this.status = status;
        this.error = error;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Response response = (Response) o;
        return Objects.equals(status, response.status) && Objects.equals(error, response.error) && Objects.equals(data, response.data);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, error, data);
    }
}
