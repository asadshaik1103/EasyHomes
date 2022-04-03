package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "payment_details")
public class PaymentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private long user_id;
    private int service_id;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date payment_date;
    @PrePersist
    protected void onCreate() {
        this.payment_date = new Date();
    }

    public PaymentDetails()
    {

    }

    public PaymentDetails(double amount, long user_id, int service_id) {
        this.amount = amount;
        this.user_id = user_id;
        this.service_id = service_id;
    }
}
