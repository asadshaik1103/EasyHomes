package com.group24.easyHomes.mappers;

import com.group24.easyHomes.dto.ServiceReviewDTO;
import com.group24.easyHomes.model.ServiceReview;
import com.group24.easyHomes.model.Services;

import org.hibernate.annotations.Synchronize;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import lombok.Synchronized;

@Component
public class SReviewDTOtoSReview implements Converter<ServiceReviewDTO, ServiceReview>{

    @Synchronized
    @Nullable
    @Override
    public ServiceReview convert(ServiceReviewDTO source) {
        
        if(source == null){
            return null;
        }
        final ServiceReview review = new ServiceReview();
        review.setReview_id(source.getReview_id());
    //    if (source.getService_id() != 0) {
    //         Services services = new Services();
    //        services.setService_id(source.getService_id());
    //        review.setServices(services);
    //        services.addReview(review);
    //    }
        review.setReview_rating(source.getReview_rating());
        review.setReview_description(source.getReview_description());
        review.setReview_subject(source.getReview_subject());
        review.setUser_id(source.getUser_id());

        return review;
    }

    

}
