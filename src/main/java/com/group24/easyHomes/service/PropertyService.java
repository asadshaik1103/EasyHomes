package com.group24.easyHomes.service;
import com.group24.easyHomes.repository.PropertyRepository;
import com.group24.easyHomes.model.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> listAll()
    {
        return propertyRepository.findAll();
    }

    public Property addProperty(Property property)
    {
        return propertyRepository.save(property);
    }

    public Property getProperty(Integer id)
    {
        if(propertyRepository.findById(id).isPresent())
        return propertyRepository.findById(id).get();
        return null;
    }


    public String delete(Integer id)
    {
        if(getProperty(id)!= null) {
            propertyRepository.deleteById(id);
            return "SUCCESS";
        }
        return "ERROR";
    }

    public Property updateProperty(Integer id , Property property)
    {
        if(getProperty(id)!= null) {
           return  propertyRepository.save(property);
        }return null;
    }
}
