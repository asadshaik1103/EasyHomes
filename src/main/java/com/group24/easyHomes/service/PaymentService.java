package com.group24.easyHomes.service;

import com.group24.easyHomes.model.PaymentDetails;
import com.group24.easyHomes.repository.PaymentDetailsRepository;
import com.group24.easyHomes.repository.PropertyAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    public PaymentDetails savePaymentDetails(PaymentDetails paymentDetails) {

        return paymentDetailsRepository.save(paymentDetails);
    }
}
