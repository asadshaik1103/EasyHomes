package com.group24.easyHomes.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
public class PropertyDTO {

    private int property_id;
    private String property_name;
    private String amenities;
    private String property_type;
    private int bedrooms = 0;
    private int bathrooms =0;
    boolean parking_included;
    double rent ;
    private long user_id;
    private PropertyAddressDTO address;
    //private Set<PropertyImageDTO> images = new HashSet<>();
    private Set<PropertyImageDTO> images ;
}
