package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.PropertyDTO;
import com.group24.easyHomes.model.Property;
import com.sun.istack.Nullable;
import lombok.Synchronized;
//import org.jetbrains.annotations.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PropertyDTOToProperty  implements Converter<PropertyDTO, Property> {

    private final AddressDTOToAddress addressDTOToAddress ;
    private final ImageDTOToImage imageDTOToImage;

    public PropertyDTOToProperty(AddressDTOToAddress addressDTOToAddress, ImageDTOToImage imageDTOToImage) {
        this.addressDTOToAddress = addressDTOToAddress;
        this.imageDTOToImage = imageDTOToImage;
    }

    @Synchronized
    @Nullable
    @Override
    public Property convert(PropertyDTO source) {
        if(source == null)
        {
            return null;
        }
        final Property property = new Property();
        property.setProperty_id(source.getProperty_id());
        property.setAddress(addressDTOToAddress.convert(source.getAddress()));
        property.setProperty_name(source.getProperty_name());
        property.setAmenities(source.getAmenities());
        property.setBathrooms(source.getBathrooms());
        property.setBedrooms(source.getBedrooms());
        property.setParking_included(source.isParking_included());
        property.setRent(source.getRent());
        property.setUser_id(source.getUser_id());

        if (source.getImages() != null && source.getImages().size() > 0){
            source.getImages()
                    .forEach(image -> property.getImages().add(imageDTOToImage.convert(image)));
        }

        return property;
    }
}
