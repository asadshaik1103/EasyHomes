package com.group24.easyHomes.service;

import java.util.Optional;

import com.group24.easyHomes.dto.ServiceReviewDTO;
import com.group24.easyHomes.mappers.SReviewDTOtoSReview;
import com.group24.easyHomes.model.ServiceReview;
import com.group24.easyHomes.model.Services;
import com.group24.easyHomes.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceReviewServices {
    

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SReviewDTOtoSReview sReviewDTOtoSReview;

    public ServiceReview saveOrUpdateReview(ServiceReviewDTO serviceReviewDTO){
        Services services = serviceRepository.findById(serviceReviewDTO.getService_id()).get();
        Optional<ServiceReview> serviceReviewOptional = services.getReviews().stream().filter(serviceReview -> (serviceReview.getReview_id() == serviceReviewDTO.getReview_id())).findFirst();
        if(serviceReviewOptional.isPresent()){
            ServiceReview serviceReview = serviceReviewOptional.get();
            serviceReview.setReview_description(serviceReviewDTO.getReview_description());
            serviceReview.setReview_rating(serviceReviewDTO.getReview_rating());
            serviceReview.setReview_subject(serviceReviewDTO.getReview_subject());
        }
        else{
            ServiceReview serviceReview = sReviewDTOtoSReview.convert(serviceReviewDTO);
            services.addReview(serviceReview);
        }

        Services savedServices = serviceRepository.save(services);

        Optional<ServiceReview> savedReview = savedServices.getReviews().stream()
                .filter(serviceReview -> serviceReview.getReview_id() == (serviceReviewDTO.getReview_id()))
                .findFirst();
        if(!savedReview.isPresent()){
            savedReview = savedServices.getReviews().stream()
                    .filter(serviceReview -> serviceReview.getReview_description().equals(serviceReviewDTO.getReview_description()))
                    .filter(serviceReview -> serviceReview.getReview_subject().equals(serviceReviewDTO.getReview_subject()))
                    .filter(serviceReview -> serviceReview.getReview_rating() == (serviceReviewDTO.getReview_rating()))
                    .findFirst();
        }

        return savedReview.get();
    }

    public void deletebyId(Long serviceID, Long reviewIDToDelete){
        Optional<Services> servicesOptional = serviceRepository.findById(serviceID);

        if (servicesOptional.isPresent()){
            Services services = servicesOptional.get();
            Optional<ServiceReview> serviceReviewOptional = services.getReviews().stream()
                    .filter(serviceReview -> (serviceReview.getReview_id() == reviewIDToDelete)).findFirst();

            if (serviceReviewOptional.isPresent()){
                ServiceReview serviceReview = serviceReviewOptional.get();
                services.getReviews().remove(serviceReview);
                serviceReview.setServices(null);
                serviceRepository.save(services);
            }
        }
    }
}
