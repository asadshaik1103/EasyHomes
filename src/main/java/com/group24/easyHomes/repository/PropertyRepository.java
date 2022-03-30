package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyListQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Integer>, JpaSpecificationExecutor<Property> {
    // use native query to get the data from the database by
    // property_name or property_type or numberOfBedrooms or city or province or country of PropertyListQuery
    @Query(value = "SELECT * FROM property WHERE property_name LIKE %?1% OR property_type LIKE %?1% OR bedrooms LIKE %?1%", nativeQuery = true)
    List<Property> findByPropertyListQuery(String propertyName, String propertyType, int numberOfBedrooms, String city, String province, String country);

}
