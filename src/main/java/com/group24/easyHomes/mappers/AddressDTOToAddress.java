package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.PropertyAddressDTO;
import com.group24.easyHomes.model.PropertyAddress;
import com.sun.istack.Nullable;
import lombok.Synchronized;
//import org.jetbrains.annotations.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class AddressDTOToAddress implements Converter<PropertyAddressDTO, PropertyAddress> {

    @Synchronized
    @Nullable
    @Override
    public PropertyAddress convert(PropertyAddressDTO source) {
        if (source == null) {
            return null;
        }
        final PropertyAddress address = new PropertyAddress();
        address.setAddress_id(source.getAddress_id());
        address.setLocation(source.getLocation());
        address.setCity(source.getCity());
        address.setProvince(source.getProvince());
        address.setCountry(source.getCountry());
        address.setPostal_code(source.getPostal_code());

        return address;
    }
}

