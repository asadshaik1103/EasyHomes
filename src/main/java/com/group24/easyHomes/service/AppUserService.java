package com.group24.easyHomes.service;

import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.model.TokenValidation;
import com.group24.easyHomes.repository.AppUserRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
//@RequiredArgsConstructor
public class AppUserService implements UserDetailsService {


    private final static String USER_NOT_FOUND_MSG = "user with email %s not found.";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private TokenValidationService tokenValidationService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG,email)));
    }

    public String signUpUser(AppUser appUser){
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
//        if(userExists){
//            return "email has been taken.";
//        }
//        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
//
//        appUser.setPassword(encodedPassword);
//
//        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        TokenValidation tokenValidation = new TokenValidation(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(60*24),appUser);

        tokenValidationService.storeToken(tokenValidation);

        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }


}
