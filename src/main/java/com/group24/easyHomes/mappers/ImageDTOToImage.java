package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.PropertyAddressDTO;
import com.group24.easyHomes.dto.PropertyImageDTO;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import com.group24.easyHomes.model.PropertyImages;
import com.sun.istack.Nullable;
import lombok.Synchronized;
//import org.jetbrains.annotations.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ImageDTOToImage implements Converter<PropertyImageDTO, PropertyImages> {

    @Synchronized
    @Nullable
    @Override
    public PropertyImages convert(PropertyImageDTO source) {
        if (source == null) {
            return null;
        }
        final PropertyImages image = new PropertyImages();
        image.setId(source.getId());
        image.setName(source.getName());
        image.setType(source.getType());
        image.setImage_data(source.getImage_data());
       /* if(source.getPropertyId() != null)
        {
            Property property = new Property();
            property.setProperty_id(source.getPropertyId());
            image.setProperty(property);
            property.addImage(image);

        }*/
        return image;
    }
}
