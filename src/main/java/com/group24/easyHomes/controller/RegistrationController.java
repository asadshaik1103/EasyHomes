package com.group24.easyHomes.controller;

import com.group24.easyHomes.dto.RegistrationRequest;
import com.group24.easyHomes.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "user")
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;

//    @PostMapping
//    public String register(@RequestBody RegistrationRequest registrationRequest){
//        return registrationService.register(registrationRequest);
//    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }

}
