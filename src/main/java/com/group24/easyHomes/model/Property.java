package com.group24.easyHomes.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@Table(name = "property")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int property_id;

    //@NotNull(message =  "Property Name should not be null")
    private String property_name;
    private String amenities;
    private String property_type;
    private int bedrooms = 0;
    private int bathrooms =0;
    boolean parking_included = false;
    double rent =0.0;

    @NotNull
    @JoinColumn(name="address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private PropertyAddress address;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "property")
    @Setter(value = AccessLevel.NONE)
    private Set<PropertyImages> images = new HashSet<>();

    //TODO Add user(owner) details
 /*   @JoinColumn(name="address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private PropertyAddress address;
*/

    public Property(String property_name,PropertyAddress address,String amenities, String property_type,
                    boolean parking_included, double rent,int bedrooms,int bathrooms) {
        this.property_name = property_name;
        this.address = address;
        this.amenities = amenities;
        this.property_type = property_type;
        this.parking_included = parking_included;
        this.rent = rent;
        this.bedrooms =bedrooms;
        this.bathrooms = bathrooms;
    }

    public Property()
    {

    }

   public void  addImage(PropertyImages image){
        image.setProperty(this);
        this.images.add(image);
    }
}
