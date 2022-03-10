package com.group24.easyHomes.controller;

import com.group24.easyHomes.model.Service;
import com.group24.easyHomes.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/service",produces = "application/json")
public class  ServiceController {

    @Autowired
    ServiceRepository serviceRepository;

    @GetMapping("/services")
    public List<Service> getServices(){
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Service getService(@PathVariable Long serviceId) throws Throwable {
        return (Service) serviceRepository.findById(serviceId).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity newService(@RequestBody Service service){
//        Service currentService = serviceRepository.findById(serviceId).orElseThrow(RuntimeException::new);
        Service currentService = new Service();
        currentService.setServiceName(service.getServiceName());
        currentService.setCity(service.getCity());
        currentService.setProvince(service.getProvince());
        currentService.setCountry(service.getCountry());
        currentService.setPincode(service.getPincode());
        currentService.setAddress(service.getAddress());
        currentService = serviceRepository.save(currentService);
        return ResponseEntity.ok(currentService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteService(@PathVariable Long serviceId){
        serviceRepository.deleteById(serviceId);
        return ResponseEntity.ok().build();
    }

}
