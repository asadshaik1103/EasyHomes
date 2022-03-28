package com.group24.easyHomes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter

@Entity
@Table(name="service_images")
public class ServiceImages {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String image_id;
    private String name;
    private String type;

    @Lob
    private byte[] image_data;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @JsonIgnore
    private Services service;

    public ServiceImages() {

    }

    public ServiceImages(String name, String type, byte[] image_data) {
        this.name = name;
        this.type = type;
        this.image_data = image_data;
    }

    public ServiceImages(String name, String type, byte[] image_data, Services service) {
        this.name = name;
        this.type = type;
        this.image_data = image_data;
        this.service = service;
    }
}
