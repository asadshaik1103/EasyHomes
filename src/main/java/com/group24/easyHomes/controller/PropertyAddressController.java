package com.group24.easyHomes.controller;

import com.group24.easyHomes.repository.PropertyAddressRepository;
import com.group24.easyHomes.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PropertyAddressController {
    @Autowired
    private PropertyAddressRepository addressRepository;

    @Autowired
    private PropertyService service;



}
