package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ServicesListQuery {
    private String service_name;
    private String service_type;
    private Integer cost;
    private String plan;
    private String city;
    private String province;
    private String country;
}
