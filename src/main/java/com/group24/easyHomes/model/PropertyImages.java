package com.group24.easyHomes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter

@Entity
@Table(name="property_images")
public class PropertyImages {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
   /* private String name;
    private String type;*/

    @Lob
    private byte[] image_data;

    @ManyToOne
    @JoinColumn(name = "property_id")
    @JsonIgnore
    private Property property;

    public PropertyImages() {

    }

    public PropertyImages(String name, String type, byte[] image_data) {
      /*  this.name = name;
        this.type = type;*/
        this.image_data = image_data;
    }

    public PropertyImages(String name, String type, byte[] image_data, Property property) {
     /*   this.name = name;
        this.type = type;*/
        this.image_data = image_data;
        this.property = property;
    }
}
