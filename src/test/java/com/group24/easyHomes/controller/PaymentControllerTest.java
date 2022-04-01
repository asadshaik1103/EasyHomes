package com.group24.easyHomes.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.easyHomes.model.PaymentDetails;
import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.service.AppUserService;
import com.group24.easyHomes.service.PaymentService;
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doReturn;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PaymentControllerTest {

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
    private PaymentService service;

    final static String paymentDetailsRequest = "{" +  "\"amount\": 500.0,\n"+
            "\"user_id\": 1,\n" +
            "\"service_id\": 1" +
            "}";

    PaymentDetails paymentDetailsResponse = new PaymentDetails(Constants.paymentAmount,Constants.userId,Constants.serviceId);

    @Test
    @WithMockUser(username = "dv", password = "pwd", authorities = "USER")
    public void addPaymentDatils() throws Exception {
        doReturn(paymentDetailsResponse).when(service).savePaymentDetails(any(PaymentDetails.class));
        MockHttpServletRequestBuilder request = post("/payment/addPayment");
        request= request.contentType(MediaType.APPLICATION_JSON).content(paymentDetailsRequest.getBytes());
        mockMvc.perform(request).andExpect(status().isCreated());
    }




}
