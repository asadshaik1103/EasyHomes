package com.group24.easyHomes.dto;

import com.group24.easyHomes.model.ServiceReview;

import org.springframework.lang.Nullable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Synchronized;

@Getter
@Setter
@NoArgsConstructor
public class ServiceReviewDTO {
    
    private int review_id;
    private String user_id;  //needs to be linked to User
    private String review_subject;
    private String review_description;
    private int review_rating = 0;
    private long service_id;

    
}
