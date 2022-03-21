package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Integer> {
    @Query(value = "SELECT * FROM property p WHERE p.address_id = 8", nativeQuery = true)
    public List<Property> search(int keyword);
}
