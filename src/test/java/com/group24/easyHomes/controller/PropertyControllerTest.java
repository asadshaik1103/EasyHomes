
package com.group24.easyHomes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import com.group24.easyHomes.model.PropertyImages;
import com.group24.easyHomes.model.PropertyListQuery;
import com.group24.easyHomes.service.AppUserService;
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
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @MockBean
    private PropertyService service;

    @MockBean
    private AppUserService userService;

    final static String property = "{" +  "\"user_id\": 1,\n"+
            "\"property_name\": \"Apt 605 killam Apartments\",\n" +
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

    PropertyAddress address = new PropertyAddress
            ("University Street","Halifax","NS","Canada","H2Y8IK");;

    Property propertyResponse = new Property("Apt 605 Iris Apartments",
            address, "Laundry", "1 BHK", true,
            Constants.propertyRent, Constants.noOfBedrooms_1, Constants.noOfBedrooms_1,Constants.userId);

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
    public void getProperty() throws Exception {

        Property property1 = new Property();
        given(service.getProperty(Constants.propertyID)).willReturn(property1);
        mockMvc.perform(get("/property/{propertyID}", Constants.propertyID))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void addProperty() throws Exception {

        doReturn(null).when(userService).getById(anyLong());
        doReturn(propertyResponse).when(service).addProperty(any(Property.class));
        MockHttpServletRequestBuilder request = post("/property/property");
        request= request.contentType(MediaType.APPLICATION_JSON).content(property.getBytes());
        mockMvc.perform(request).andExpect(status().isCreated());
    }


    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_SUCCESS() throws Exception {
        when(service.delete(Constants.propertyID)).thenReturn("SUCCESS");
        mockMvc.perform(delete("/property/properties/{propertyId}", Constants.propertyID))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_ERROR() throws Exception {
        when(service.delete(Constants.propertyID)).thenReturn("ERROR");
        MockHttpServletRequestBuilder request =delete("/property/properties/{propertyId}", Constants.propertyID);
        mockMvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_ERROR() throws Exception {
        when(service.updateProperty(Constants.propertyID, propertyResponse)).thenReturn(null);
        MockHttpServletRequestBuilder request  = put("/property/properties/10/update", Constants.propertyID);
        request= request.contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(request).andExpect(status().isBadRequest());

    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_SUCCESS() throws Exception {
        when(service.updateProperty(Constants.propertyID,propertyResponse)).thenReturn(propertyResponse);
        MockHttpServletRequestBuilder request = put("/property/properties/10/update", Constants.propertyID);
        request= request.contentType(MediaType.APPLICATION_JSON).content(property.getBytes());
        mockMvc.perform(request).andExpect(status().isNoContent());
    }


    // use mock mvc to test filter properties with request body
//    @Test
//    @WithMockUser(username = "user1", password = "pwd", authorities = "USER")
//    public void filterProperties_SUCCESS_withRequestBody() throws Exception {
//
//        PropertyAddress address = new PropertyAddress();
//        address.setLocation("University Street");
//        address.setCity("Halifax");
//        address.setCountry("Canada");
//        address.setProvince("NS");
//        address.setPostal_code("H2Y8IK");
//        Property property = new Property("Apt 605 Iris Apartments",
//                address, "Laundry", "1 BHK", true, 500.0, 1, 1);
//        List<Property> properties = new ArrayList<>();
//        properties.add(property);
//
//        PropertyListQuery query = new PropertyListQuery();
//        query.setProperty_name("Apt 605 Iris Apartments");
//        query.setAmenities("Laundry");
//        query.setProperty_type("1 BHK");
//        query.setNumberOfBedrooms(1);
//        query.setNumberOfBathrooms(1);
//        query.setRent(500.0);
//        query.setParkingIncluded(true);
//        query.setCity("Halifax");
//        query.setProvince("NS");
//        query.setCountry("Canada");
//
//
//        when(service.filterProperties(query)).thenReturn(properties);
//        mockMvc.perform(MockMvcRequestBuilders.post("/property/properties/filter")
//                .contentType("application/json")
//                .content("{\"property_type\":\"1 BHK\",\"amenities\":\"Laundry\",\"parking_included\":\"true\",\"city\":\"\",\"province\":\"\",\"country\":\"\"}"))
//                .andExpect(status().isOk());
//    }

    // test case to filter properties with invalid request body
//    @Test
//    @WithMockUser(username = "user1", password = "pwd", authorities = "USER")
//    public void filterProperties_FAILURE_withRequestBody_withEmptyProperties() throws Exception {
//
//
//        Property property = new Property();
//        List<Property> properties = new ArrayList<>();
//        properties.add(property);
//        PropertyListQuery query = new PropertyListQuery();
//        query.setProperty_name("Apt 605 Iris Apartments");
//        query.setProperty_type("1 BHK");
//        query.setNumberOfBedrooms(1);
//        query.setCity("Halifax");
//        query.setProvince("NS");
//        query.setCountry("Canada");
//
//        when(service.filterProperties(query)).thenReturn(properties);
//        mockMvc.perform(MockMvcRequestBuilders.post("/property/properties/filter")
//                .contentType("application/json")
//                .content("{\"property_type\":\"1 BHK\",\"amenities\":\"Laundry\",\"parking_included\":\"true\",\"city\":\"\",\"province\":\"\",\"country\":\"\"}"))
//                .andExpect(status().isBadRequest());
//    }
//
//





}

