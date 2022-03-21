package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyListQuery {
    private String property_name;
    private String property_type;
    private int address_id; // TODO remove this later

    public PropertyListQuery(String property_name, String property_type, int address_id) {
        this.property_name = property_name;
        this.property_type = property_type;
        this.address_id = address_id;
    }
}
