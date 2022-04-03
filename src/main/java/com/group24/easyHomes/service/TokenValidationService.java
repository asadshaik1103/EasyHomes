package com.group24.easyHomes.service;

import com.group24.easyHomes.model.TokenValidation;
import com.group24.easyHomes.repository.TokenValidationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenValidationService {

    private final TokenValidationRepository tokenValidationRepository;

    public void storeToken(TokenValidation tokenValidation){
        tokenValidationRepository.save(tokenValidation);
    }

    public Optional<TokenValidation> getToken(String token){
        return tokenValidationRepository.findByToken(token);
    }

    public int setVerifiedAt(String token) {
        return tokenValidationRepository.updateVerifiedAt(
                token, LocalDateTime.now());
    }
}
