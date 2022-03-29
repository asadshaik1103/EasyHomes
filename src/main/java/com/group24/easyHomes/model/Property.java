package com.group24.easyHomes.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
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
    private long user_id;

    @NotNull
    @JoinColumn(name="address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private PropertyAddress address;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "property")
    @Setter(value = AccessLevel.NONE)
    private Set<PropertyImages> images = new HashSet<>();

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date posted_on;

    @PrePersist
    protected void onCreate() {
        this.posted_on = new Date();
    }

    public Property(String property_name,PropertyAddress address,String amenities, String property_type,
                    boolean parking_included, double rent,int bedrooms,int bathrooms, long user_id) {
        this.property_name = property_name;
        this.address = address;
        this.amenities = amenities;
        this.property_type = property_type;
        this.parking_included = parking_included;
        this.rent = rent;
        this.bedrooms =bedrooms;
        this.bathrooms = bathrooms;
        this.user_id = user_id;
    }

    public Property()
    {

    }

   public void  addImage(PropertyImages image){
        image.setProperty(this);
        this.images.add(image);
    }
}
