
package com.group24.easyHomes.service;

import com.group24.easyHomes.controller.Constants;
import com.group24.easyHomes.repository.PropertyRepository;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class PopertyServiceTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Autowired
    @InjectMocks
    private PropertyService propertyService;
    private Property property1;
    private Property property2;
    List<Property> propertyList;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        propertyList = new ArrayList<>();
        PropertyAddress address1 = new PropertyAddress();
        address1.setLocation("University Street");
        address1.setCity("Halifax");
        address1.setCountry("Canada");
        address1.setProvince("NS");
        address1.setPostal_code("H2Y8IK");
        property1 = new Property("Apt 605 Iris Apartments",
                address1, "Laundry", "1 BHK", true, Constants.propertyRent,  Constants.noOfBedrooms_1, Constants.noOfBathrooms_1,Constants.propertyID);
        PropertyAddress address2 = new PropertyAddress();
        address2.setLocation("Robie Street");
        address2.setCity("Halifax");
        address2.setCountry("Canada");
        address2.setProvince("NS");
        address2.setPostal_code("H2Y8IK");
        property2 = new Property("Apt 607 Killam Apartments",
                address2, "Laundry", "1 BHK", true,
                Constants.propertyRent, Constants.noOfBedrooms_1, Constants.noOfBathrooms_1,Constants.propertyID);


        propertyList.add(property1);
        propertyList.add(property2);
    }

    @AfterEach
    public void tearDown() {
        property1 = property1 = null;
        propertyList = null;
    }

    @Test
    public void addProperty()
    {
        when(propertyRepository.save(any())).thenReturn(property1);
        propertyService.addProperty(property1);
        verify(propertyRepository, times(1)).save(any());
    }

    @Test
    public void retuenAllProperties() {
        propertyRepository.save(property1);
        //stubbing mock to return specific data
        when(propertyRepository.findAll()).thenReturn(propertyList);
        List<Property> productList1 = propertyService.listAll();
        assertEquals(productList1, propertyList);
        verify(propertyRepository, times(1)).save(property1);
        verify(propertyRepository, times(1)).findAll();
    }

    @Test
    public void getPropertyByIdTest() throws Exception {
        Property property = new Property();
        property.setProperty_id(Constants.propertyID);
        Optional<Property> propertyOptional = Optional.of(property);

        when(propertyRepository.findById(any())).thenReturn(propertyOptional);

        Property propertyReturned = propertyService.getProperty(Constants.propertyID);
        assertNotNull(propertyReturned);
        verify(propertyRepository, times(1)).findById(any());
        verify(propertyRepository, never()).findAll();
    }



}





