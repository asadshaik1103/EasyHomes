package com.group24.easyHomes.controller;

import com.group24.easyHomes.dto.ServiceDTO;
import com.group24.easyHomes.mappers.ServiceToServiceDTO;
import com.group24.easyHomes.model.ServiceImages;
import com.group24.easyHomes.model.Services;
import com.group24.easyHomes.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/service",produces = "application/json")
public class  ServiceController {

    @Autowired
    private ServicesService service;

    @Autowired
    private ServiceToServiceDTO serviceToServiceDTO;

    @GetMapping("/services")
    public ResponseEntity<List<Services>> list(){
        return new ResponseEntity<>(service.listAll(), HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public Services getService(@PathVariable Long serviceId) throws Throwable {
//        return (Services) serviceRepository.findById(serviceId).orElseThrow(RuntimeException::new);
//    }

    @PostMapping(value = "/services",consumes = {"multipart/form-data"},produces ={"application/json"})
    public ResponseEntity<Services> addService(@RequestPart("service") @Valid ServiceDTO serviceDTO,
                                               @RequestPart("file")  MultipartFile[] files){
        try{
            Set<ServiceImages> serviceImages = new HashSet<>();
            Services services = serviceToServiceDTO.convert(serviceDTO);

            for(MultipartFile file:files)
            {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                ServiceImages image = new ServiceImages(fileName, file.getContentType(), file.getBytes());
                services.addImage(image);
            }
            service.addService(services);
            return new ResponseEntity<>(services,HttpStatus.CREATED) ;
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/services/{serviceId}")
    public ResponseEntity<HttpStatus>  removeService(@PathVariable Long serviceId)
    {
        if("SUCCESS".equalsIgnoreCase(service.delete(serviceId))) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }


    @PutMapping(value = "/services/{serviceId}/update",consumes = {"application/json"},produces ={"application/json"})
    public ResponseEntity<Services>  updateProperty(@PathVariable Long serviceId, @RequestBody Services services)
    {
        return new ResponseEntity<>(service.updateService(serviceId,services),HttpStatus.NO_CONTENT);

    }

}
