
package com.group24.easyHomes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.easyHomes.dto.PropertyAddressDTO;
import com.group24.easyHomes.dto.PropertyDTO;
import com.group24.easyHomes.mappers.PropertyDTOToProperty;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import com.group24.easyHomes.model.PropertyImages;
import com.group24.easyHomes.service.PropertyService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(PropertyController.class)
public class PropertyControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PropertyService service;

    @Autowired
    private PropertyDTOToProperty propertyDTOToProperty;

    @Test
    public void getProperties() throws Exception {

        Property property1 = new Property();

        List<Property> allProperties = new ArrayList<>();
        allProperties.add(property1);

        given(service.listAll()).willReturn(allProperties);

        mvc.perform(get("/properties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void addProperty() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property propertyResponse = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1);
        String property = "{" + "\"property_name\": \"Apt 605 Iris Apartments\",\n" +
                "        \"address\":{\n" +
                "            \"location\" : \"University Street\",\n" +
                "            \"city\": \"Halifax\",\n" +
                "            \"province\":\"NS\",\n" +
                "            \"country\": \"Canada\",\n" +
                "            \"postal_code\": \"H2Y8IK\"\n" +
                "        },\n" +
                "        \"amenities\":\"Laundry\",\n" +
                "        \"property_type\":\"1 BHK\",\n" +
                "         \"bathrooms\":1,\n" +
                "         \"bedrooms\":1,\n" +
                "        \"parking_included\":\"true\",\n" +
                "        \"rent\":\"500.0\"\n" +
                "}";

        MockMultipartFile propertyRequest = new MockMultipartFile(
                "property",
                "",
                "application/json", property.getBytes());

        MockMultipartFile sampleFile = new MockMultipartFile(
                "file",
                "SampleFile",
                "text/plain",
                "This is the file content".getBytes()
        );
        doReturn(propertyResponse).when(service).addProperty(any());
        mvc.perform(MockMvcRequestBuilders
                        .multipart("/properties")
                        .file(sampleFile)
                        .file(propertyRequest))
                .andExpect(status().isCreated());
    }

    @Test
    public void removeProperty_SUCCESS() throws Exception {

        when(service.delete(10)).thenReturn("SUCCESS");
        mvc.perform(MockMvcRequestBuilders.delete("/properties/{propertyId}", 10))
                .andExpect(status().isNoContent());
    }

    @Test
    public void removeProperty_ERROR() throws Exception {

        when(service.delete(10)).thenReturn("ERROR");
        mvc.perform(MockMvcRequestBuilders.delete("/properties/{propertyId}", 10))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void updateProperty_ERROR() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property property = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1);
        String propertyRequest = "{" + "\"property_name\": \"Apt 605 Iris Apartments\",\n" +
                "        \"address\":{\n" +
                "            \"location\" : \"University Street\",\n" +
                "            \"city\": \"Halifax\",\n" +
                "            \"province\":\"NS\",\n" +
                "            \"country\": \"Canada\",\n" +
                "            \"postal_code\": \"H2Y8IK\"\n" +
                "        },\n" +
                "        \"amenities\":\"Laundry\",\n" +
                "        \"property_type\":\"1 BHK\",\n" +
                "         \"bathrooms\":1,\n" +
                "         \"bedrooms\":1,\n" +
                "        \"parking_included\":\"true\",\n" +
                "        \"rent\":\"500.0\"\n" +
                "}";
        when(service.updateProperty(10, property)).thenReturn(null);
        mvc.perform(MockMvcRequestBuilders.put("/properties/10/update", 10).contentType("application/json"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void updateProperty_SUCCESS() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property property = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1);

        String propertyRequest = "{" + "\"property_name\": \"Apt 605 Iris Apartments\",\n" +
                "        \"address\":{\n" +
                "            \"location\" : \"University Street\",\n" +
                "            \"city\": \"Halifax\",\n" +
                "            \"province\":\"NS\",\n" +
                "            \"country\": \"Canada\",\n" +
                "            \"postal_code\": \"H2Y8IK\"\n" +
                "        },\n" +
                "        \"amenities\":\"Laundry\",\n" +
                "        \"property_type\":\"1 BHK\",\n" +
                "         \"bathrooms\":1,\n" +
                "         \"bedrooms\":1,\n" +
                "        \"parking_included\":\"true\",\n" +
                "        \"rent\":\"500.0\"\n" +
                "}";

        when(service.updateProperty(10,property)).thenReturn(property);
        mvc.perform(MockMvcRequestBuilders.put("/properties/10/update", 10)
                        .contentType("application/json").content(propertyRequest.getBytes()))
                .andExpect(status().isNoContent());
    }
}


/*package com.group24.easyHomes.controller;
public class PropertyControllerTest {

}*/
