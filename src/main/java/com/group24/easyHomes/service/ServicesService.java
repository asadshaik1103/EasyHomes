package com.group24.easyHomes.service;
import com.group24.easyHomes.model.Services;
import com.group24.easyHomes.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Services> listAll()
    {
        return serviceRepository.findAll();
    }

    public Services addService(Services service)
    {
        return serviceRepository.save(service);
    }

    public Services getService(Long id)
    {
        return serviceRepository.findById(id).get();
    }


    public String delete(Long id)
    {
        if(getService(id)!= null) {
            serviceRepository.deleteById(id);
            return "SUCCESS";
        }
        return "ERROR";
    }

    public Services updateService(Long id , Services services)
    {
        if(getService(id)!= null) {
            return  serviceRepository.save(services);
        }return null;
    }
}
