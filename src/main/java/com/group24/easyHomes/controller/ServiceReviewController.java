package com.group24.easyHomes.controller;

import com.group24.easyHomes.dto.ServiceReviewDTO;
import com.group24.easyHomes.mappers.SReviewDTOtoSReview;
import com.group24.easyHomes.model.ServiceReview;
import com.group24.easyHomes.service.ServiceReviewServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ServiceReviewController {

    @Autowired
    private ServiceReviewServices serviceReviewServices;

    @Autowired
    private SReviewDTOtoSReview sReviewDTOtoSReview;





    @PostMapping(value = "/services/reviews", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<ServiceReview> saveReview(@RequestBody ServiceReviewDTO serviceReviewDTO){
        return new ResponseEntity<>(serviceReviewServices.saveOrUpdateReview(serviceReviewDTO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/services/{serviceID}/reviews/{reviewID}")
    public void saveReview(@PathVariable Long serviceID, @PathVariable Long reviewID){
        serviceReviewServices.deletebyId(serviceID, reviewID);
    }
}
