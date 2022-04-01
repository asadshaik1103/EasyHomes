package com.group24.easyHomes.controller;
import com.group24.easyHomes.dto.PropertyDTO;
import com.group24.easyHomes.model.PaymentDetails;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/payment")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping(value = "/addPayment",consumes = {"application/json"},produces ={"application/json"})
    public ResponseEntity<PaymentDetails> addPayment(@RequestBody PaymentDetails  paymentDetails) {

        return new ResponseEntity<>(paymentService.savePaymentDetails(paymentDetails), HttpStatus.CREATED);
    }

}
