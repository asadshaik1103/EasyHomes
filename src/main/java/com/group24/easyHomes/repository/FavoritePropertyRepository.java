package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.FavoriteProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoritePropertyRepository extends JpaRepository<FavoriteProperty, Long> {
    @Query("SELECT fp FROM FavoriteProperty fp WHERE fp.user_id = ?1")
    List<FavoriteProperty> findByUserId(Long userId);
}
