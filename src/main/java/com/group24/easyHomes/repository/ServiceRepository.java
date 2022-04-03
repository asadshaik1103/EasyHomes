package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Services,Long>, JpaSpecificationExecutor<Services> {}
