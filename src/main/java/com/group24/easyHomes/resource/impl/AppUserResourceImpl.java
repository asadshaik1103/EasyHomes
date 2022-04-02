package com.group24.easyHomes.resource.impl;

import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.repository.AppUserRepository;
import com.group24.easyHomes.repository.AppUserRoleRepository;
import com.group24.easyHomes.security.config.JwtTokenProvider;
import com.group24.easyHomes.service.AppUserService;
import com.group24.easyHomes.service.SendMailService;
import com.group24.easyHomes.service.TokenValidationService;
import com.group24.easyHomes.utils.ConstantUtils;
import lombok.AllArgsConstructor;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
@AllArgsConstructor
public class AppUserResourceImpl {

    private final AppUserService appUserService;
    private final TokenValidationService tokenValidationService;
    private final SendMailService sendMailService;

    private static Logger log = LoggerFactory.getLogger(AppUserResourceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AppUserRoleRepository roleRepository;

    @Autowired
    private AppUserRepository userRepository;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody AppUser user) {
        log.info("UserResourceImpl : register");
        JSONObject jsonObject = new JSONObject();
        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole(roleRepository.findByName(ConstantUtils.USER.toString()));
            AppUser savedUser = userRepository.saveAndFlush(user);

            String token =  appUserService.signUpUser(savedUser);

            String link = "https://easthomes-develop.herokuapp.com/user/confirm?token=" + token;

            String message = "Hello,\n" +
                    "Please verify your email id through following link:\n" +
                    "Link: " +  link + " \n" +
                    "Thank you\n" +
                    "EasyHomes";
            sendMailService.send(savedUser.getEmail(), message);
            jsonObject.put("message", savedUser.getFirstName() + " saved succesfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody AppUser user) {
        log.info("UserResourceImpl : authenticate");
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                String email = user.getEmail();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                 jsonObject.put("userId", userRepository.findByEmail(email).get().getId());
                jsonObject.put("token", tokenProvider.createToken(email, userRepository.findByEmail(email).get().getRole()));
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
}
