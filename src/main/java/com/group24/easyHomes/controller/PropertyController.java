package com.group24.easyHomes.controller;

import com.group24.easyHomes.dto.PropertyDTO;
import com.group24.easyHomes.mappers.PropertyDTOToProperty;
import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyImages;
import com.group24.easyHomes.repository.AppUserRepository;
import com.group24.easyHomes.service.AppUserService;
import com.group24.easyHomes.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/property")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropertyController {

    @Autowired
    private PropertyService  service;

    @Autowired
    private AppUserService userService;

    @Autowired
    private PropertyDTOToProperty propertyDTOToProperty;

    @GetMapping("/properties")
    public ResponseEntity<List<Property>> list()
    {
        return new ResponseEntity<>(service.listAll(),HttpStatus.OK);
    }

    @GetMapping("/{propertyID}/properties")
    public ResponseEntity<Property> getProperty(@PathVariable int propertyID)
    {
        return new ResponseEntity<>(service.getProperty(propertyID),HttpStatus.OK);
    }

    @PostMapping(value = "/property",consumes = {"application/json"},produces ={"application/json"})
    public ResponseEntity<Property> addProperty(@RequestBody PropertyDTO propertyDTO) {
        try {

            Property property = propertyDTOToProperty.convert(propertyDTO);
            AppUser user = userService.getById(propertyDTO.getUser_id());
            String name = null ;
            if( user!= null)
            {
                name = user.getFirstName() + " " + user.getLastName();
            }
            property.setUser_name(name);
            service.addProperty(property);
            return new ResponseEntity<>(property,HttpStatus.CREATED) ;
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST) ;

        }
    }


    @DeleteMapping(value = "/properties/{propertyId}")
    public ResponseEntity<HttpStatus>  removeProperty(@PathVariable int propertyId)
    {
        if("SUCCESS".equalsIgnoreCase(service.delete(propertyId))) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }


    @PutMapping(value = "/properties/{propertyId}/update",consumes = {"application/json"},produces ={"application/json"})
    public ResponseEntity<Property>  updateProperty(@PathVariable int propertyId, @RequestBody Property property)
    {
            return new ResponseEntity<>(service.updateProperty(propertyId,property),HttpStatus.NO_CONTENT);

    }

}
