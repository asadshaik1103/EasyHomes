package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.ServiceDTO;
import com.group24.easyHomes.model.Services;
import com.sun.istack.Nullable;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ServiceToServiceDTO  implements Converter<ServiceDTO, Services> {

    private final ServiceImageToImageDTO imageDTOToImage;

    public ServiceToServiceDTO(ServiceImageToImageDTO imageDTOToImage) {
        this.imageDTOToImage = imageDTOToImage;
    }

    @Synchronized
    @Nullable
    @Override
    public Services convert(ServiceDTO source) {
        if(source == null)
        {
            return null;
        }
        final Services services = new Services();

        services.setService_id(source.getService_id());
        services.setService_name(source.getService_name());
        services.setCity(source.getCity());
        services.setService_type(source.getService_type());
        services.setCost(source.getCost());
        services.setPlan(source.getPlan());
        services.setDescription(source.getDescription());
        services.setProvince(source.getProvince());
        services.setCountry(source.getCountry());
        services.setPincode(source.getPincode());
        services.setAddress(source.getAddress());
        services.setReview_id(source.getReview_id());

        if (source.getImages() != null && source.getImages().size() > 0){
            source.getImages()
                    .forEach(image -> services.getImages().add(imageDTOToImage.convert(image)));
        }

        return services;
    }
}
