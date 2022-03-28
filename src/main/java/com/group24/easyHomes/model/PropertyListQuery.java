package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyListQuery {
    private String property_name;
    private String property_type;
    private int numberOfBedrooms;
    private String city;
    private String province;
    private String country;


    public PropertyListQuery(String property_name, String property_type,
                             int numberOfBedrooms, String city, String province,
                             String country) {
        this.property_name = property_name;
        this.property_type = property_type;
        this.numberOfBedrooms = numberOfBedrooms;
        this.city = city;
        this.province = province;
        this.country = country;
    }

    public PropertyListQuery() {
    }
}
