package com.group24.easyHomes.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "service")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long service_id;

    private String service_name;
    private String service_type;
    private int cost;
    private String plan;
    private String description;
    private String city;
    private String province;
    private String country;
    private String pincode;
    private String address;
    private Long review_id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "service")
    @Setter(value = AccessLevel.NONE)
    private Set<ServiceImages> images = new HashSet<>();

    public Services(String service_name,String service_type, int cost,String plan,String description,
                    String city, String province, String country, String pincode, String address,Long review_id) {
        this.service_name = service_name;
        this.service_type = service_type;
        this.cost = cost;
        this.plan = plan;
        this.description = description;
        this.city = city;
        this.province = province;
        this.country = country;
        this.pincode = pincode;
        this.address = address;
        this.review_id = review_id;
    }

    public Services()
    {}

    public void  addImage(ServiceImages image){
        image.setService(this);
        this.images.add(image);
    }
}
