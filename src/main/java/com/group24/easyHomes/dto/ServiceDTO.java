package com.group24.easyHomes.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ServiceDTO {

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
    private long user_id;
    private String address;
    private Set<ServiceImageDTO> images = new HashSet<>();
}
