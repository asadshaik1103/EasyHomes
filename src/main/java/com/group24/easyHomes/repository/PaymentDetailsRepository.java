package com.group24.easyHomes.repository;

import com.group24.easyHomes.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails,Integer> {
}
