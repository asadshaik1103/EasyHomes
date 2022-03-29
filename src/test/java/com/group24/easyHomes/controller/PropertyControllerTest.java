
package com.group24.easyHomes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import com.group24.easyHomes.service.PropertyService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PropertyControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper mapper;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @MockBean
    private PropertyService service;

   @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void getProperties() throws Exception {

        Property property1 = new Property();

        List<Property> allProperties = new ArrayList<>();
        allProperties.add(property1);

        given(service.listAll()).willReturn(allProperties);

        mockMvc.perform(get("/property/properties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

   @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void addProperty() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property propertyResponse = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1,1);
        String property = "{" +  "\"user_id\": 1,\n"+
                "\"property_name\": \"Apt 605 Iris Apartments\",\n" +
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

        doReturn(propertyResponse).when(service).addProperty(any(Property.class));
        mockMvc.perform(post("/property/property")
                        .contentType(MediaType.APPLICATION_JSON).content(property.getBytes()))
                .andExpect(status().isCreated());
    }


    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_SUCCESS() throws Exception {

        when(service.delete(10)).thenReturn("SUCCESS");
        mockMvc.perform(MockMvcRequestBuilders.delete("/property/properties/{propertyId}", 10))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_ERROR() throws Exception {

        when(service.delete(10)).thenReturn("ERROR");
        mockMvc.perform(MockMvcRequestBuilders.delete("/property/properties/{propertyId}", 10))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_ERROR() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property property = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1,1);
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
        mockMvc.perform(MockMvcRequestBuilders.put("/property/properties/10/update", 10).contentType("application/json"))
                .andExpect(status().isBadRequest());

    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_SUCCESS() throws Exception {

        PropertyAddress address = new PropertyAddress();
        address.setLocation("University Street");
        address.setCity("Halifax");
        address.setCountry("Canada");
        address.setProvince("NS");
        address.setPostal_code("H2Y8IK");
        Property property = new Property("Apt 605 Iris Apartments",
                address, "Laundry", "1 BHK", true, 500.0, 1, 1,1);

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
        mockMvc.perform(MockMvcRequestBuilders.put("/property/properties/10/update", 10)
                        .contentType("application/json").content(propertyRequest.getBytes()))
                .andExpect(status().isNoContent());
    }
}

