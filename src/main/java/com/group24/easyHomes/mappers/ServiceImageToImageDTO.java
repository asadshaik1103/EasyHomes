package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.ServiceImageDTO;
import com.group24.easyHomes.model.ServiceImages;
import com.group24.easyHomes.model.Services;
import com.sun.istack.Nullable;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ServiceImageToImageDTO implements Converter<ServiceImageDTO, ServiceImages> {

    @Synchronized
    @Nullable
    @Override

    public ServiceImages convert(ServiceImageDTO source){
        if(source == null){
            return null;
        }

        final ServiceImages image = new ServiceImages();
        image.setImage_id(source.getImage_id());
        image.setName(source.getName());
        image.setType(source.getType());
        image.setImage_data(source.getImage_data());

        return image;
    }
}
