package com.group24.easyHomes.service;

import com.group24.easyHomes.dto.RegistrationRequest;
import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.model.AppUserRole;
import com.group24.easyHomes.model.TokenValidation;
import lombok.AllArgsConstructor;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final TokenValidationService tokenValidationService;
    private final SendMailService sendMailService;

    public String register(RegistrationRequest request) {

        String token =  appUserService.signUpUser(
                            new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getPassword(),
                        request.getEmail(),
                        AppUserRole.USER
                )
        );

        String link = "http://127.0.0.1:8080/api/v1/registration/confirm?token=" + token;

        String message = "Hello,\n" +
                "Please verify your email id through following link:\n" +
                "Link: " +  link + " \n" +
                "Thank you\n" +
                "EasyHomes";
        sendMailService.send(request.getEmail(), message);

        return token;
    }

    @Transactional
    public String confirmToken(String token){
        TokenValidation tokenValidation = tokenValidationService.getToken(token).orElseThrow(() ->
                new IllegalStateException("token not found"));;

        if(tokenValidation.getVerifiedTime() != null){
            return "email is already verified.";
        }

        if(tokenValidation.getEndTime().isBefore(LocalDateTime.now())){
            return "Token expired";
        }

        tokenValidationService.setVerifiedAt(token);

        appUserService.enableAppUser(tokenValidation.getAppUser().getUsername());

        return "Confirmed";
    }
}
