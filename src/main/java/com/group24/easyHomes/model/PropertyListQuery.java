package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyListQuery
{
    private String property_name;
    private String amenities;
    private String property_type;
    private Integer numberOfBedrooms;
    private Integer numberOfBathrooms;
    private Boolean parkingIncluded;
    private Double rent;
    private String city;
    private String province;
    private String country;
}
