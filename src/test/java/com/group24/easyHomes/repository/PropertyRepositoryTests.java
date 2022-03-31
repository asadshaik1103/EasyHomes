package com.group24.easyHomes.repository;

import com.group24.easyHomes.controller.Constants;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class PropertyRepositoryTests {

    @Autowired
    private PropertyRepository propertyRepository;

    @Test
    public void testAddProperty() {

        PropertyAddress address = new PropertyAddress
                ("University Street","Halifax","NS","Canada","H2Y8IK");;
        Property property = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true,
                Constants.propertyRent, Constants.noOfBedrooms_1, Constants.noOfBedrooms_1,Constants.userId);
        Property savedProperty = propertyRepository.save(property);
        assertTrue(savedProperty.getProperty_id() >0);
    }

    @Test
    public void testGetProperty()
    {
        Property property = propertyRepository.getById(Constants.propertyID);
        assertTrue(property.getProperty_id() >0);
    }

    @Test
    public void testUpdate()
    {
        PropertyAddress address = new PropertyAddress
                ("University Street","Halifax","NS","Canada","H2Y8IK");;
        Property propertyToUpdate = new Property("Apt 606 Iris Apartments",
                address, "Laundry", "1 BHK", true,
                Constants.propertyRent, Constants.noOfBedrooms_1, Constants.noOfBedrooms_1,Constants.userId);
        propertyToUpdate.setProperty_id(16);
        Property savedProperty = propertyRepository.save(propertyToUpdate);
        assertTrue(savedProperty.getProperty_id() >0);
    }
}
