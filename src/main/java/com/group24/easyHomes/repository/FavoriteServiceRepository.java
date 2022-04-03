package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.FavoriteService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface FavoriteServiceRepository extends JpaRepository<FavoriteService, Long> {
    @Query("SELECT fs FROM FavoriteService fs WHERE fs.user_id = ?1")
    List<FavoriteService> findByUserId(Long userId);
}
