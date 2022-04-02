package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyListQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Integer>, JpaSpecificationExecutor<Property> {
}
