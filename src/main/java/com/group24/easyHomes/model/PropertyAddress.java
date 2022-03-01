package com.group24.easyHomes.model;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "property_address")
public class PropertyAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int address_id;
   // @NotNull(message =  "Location should not be null")
    private String location;
    //@NotNull(message =  "City should not be null")
    private String city;
    //@NotNull(message =  "Province should not be null")
    private String province;
    //@NotNull(message =  "Country should not be null")
    private String country;
    private String postal_code;

 /*   @OneToOne
    private Property property;*/

    public PropertyAddress()
    {

    }

    public  PropertyAddress(String location, String city, String country, String postal_code,String province) {
        this.location = location;
        this.city = city;
        this.country = country;
        this.postal_code = postal_code;
        this.province = province;
    }
}
