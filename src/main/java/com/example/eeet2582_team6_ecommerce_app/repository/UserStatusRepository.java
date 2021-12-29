package com.example.eeet2582_team6_ecommerce_app.repository;

import com.example.eeet2582_team6_ecommerce_app.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatusRepository extends JpaRepository<UserStatus, String> {
}
