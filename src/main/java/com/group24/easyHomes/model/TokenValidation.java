package com.group24.easyHomes.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "TokenValidation")
public class TokenValidation {

    @Id
//    @SequenceGenerator(
//            name = "verify_sequence",
//            sequenceName = "verify_sequence",
//            allocationSize = 1
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "verify_sequence"
//    )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime verifiedTime;

    @ManyToOne
    @JoinColumn( name = "appUser")
    private AppUser appUser;

    public TokenValidation(String token, LocalDateTime startTime, LocalDateTime endTime, AppUser appUser) {
        this.token = token;
        this.startTime = startTime;
        this.endTime = endTime;
        this.appUser = appUser;
    }

}
