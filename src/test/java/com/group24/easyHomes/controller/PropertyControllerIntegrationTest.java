package com.group24.easyHomes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.easyHomes.EasyHomesApplication;
import com.group24.easyHomes.model.AppUser;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyAddress;
import com.group24.easyHomes.service.AppUserService;
import com.group24.easyHomes.service.PropertyService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class PropertyControllerIntegrationTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper mapper;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    final static String property = "{" + "\"user_id\": 1,\n" +
            "\"property_name\": \"Apt "+ ((new Random().nextInt(900-700)) +700)  + " Iris Apartments\",\n" +
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
            "         \"bedrooms\":2,\n" +
            "        \"parking_included\":\"true\",\n" +
            "        \"rent\":\"500.0\"\n" +
            "}";

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void getProperties() throws Exception {

        mockMvc.perform(get("/property/properties"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void addProperty() throws Exception {

        MockHttpServletRequestBuilder request = post("/property/property");
        request= request.contentType(MediaType.APPLICATION_JSON).content(property.getBytes());
        mockMvc.perform(request).andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_SUCCESS() throws Exception {
        MockHttpServletRequestBuilder request = put("/property/properties/{propertyId}/update", Constants.propertyID);
        request= request.contentType(MediaType.APPLICATION_JSON).content(property.getBytes());
        mockMvc.perform(request).andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_ERROR() throws Exception {
        MockHttpServletRequestBuilder request =delete("/property/properties/{propertyId}", Constants.propertyIDDoesNotExist);
        mockMvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void updateProperty_ERROR() throws Exception {
        MockHttpServletRequestBuilder request  = put("/property/properties/{propertyId}/update", Constants.propertyIDDoesNotExist);
        request= request.contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(request).andExpect(status().isBadRequest());

    }



   /* @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void removeProperty_SUCCESS() throws Exception {
        mockMvc.perform(delete("/property/properties/{propertyId}", Constants.propertyID))
                .andExpect(status().isNoContent());
    }*/






}
