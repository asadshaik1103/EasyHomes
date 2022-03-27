package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.TokenValidation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TokenValidationRepository extends JpaRepository<TokenValidation, Long> {

    Optional<TokenValidation> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE TokenValidation c " +
            "SET c.verifiedTime = ?2 " +
            "WHERE c.token = ?1")
    int updateVerifiedAt(String token,
                          LocalDateTime verifiedTime);

}
