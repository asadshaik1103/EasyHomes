package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.model.AppUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//@EnableJpaRepositories
@Repository
public interface AppUserRoleRepository extends JpaRepository<AppUserRole, Long> {

    @Query("FROM AppUserRole WHERE name=:name")
    AppUserRole findByName(@Param("name") String name);

}
