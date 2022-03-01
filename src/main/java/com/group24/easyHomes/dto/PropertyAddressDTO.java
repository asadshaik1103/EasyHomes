package com.group24.easyHomes.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyAddressDTO {
    private int address_id;
    private String location;
    private String city;
    private String province;
    private String country;
    private String postal_code;
}
