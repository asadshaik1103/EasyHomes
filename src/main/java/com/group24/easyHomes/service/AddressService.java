package com.group24.easyHomes.service;

import com.group24.easyHomes.repository.PropertyAddressRepository;
import com.group24.easyHomes.model.PropertyAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    private PropertyAddressRepository propertyAddressRepository;
    public void updateAddress(PropertyAddress propertyAddress)
    {
        propertyAddressRepository.save(propertyAddress);
    }
}
