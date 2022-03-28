package com.group24.easyHomes.service;
import com.group24.easyHomes.model.PropertyListQuery;
import com.group24.easyHomes.repository.PropertyRepository;
import com.group24.easyHomes.model.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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

    public List<Property> filterProperties(PropertyListQuery query)
    {
        Property property = new Property();
        property.setProperty_name(query.getProperty_name());
        property.setProperty_type(query.getProperty_type());
        property.setBedrooms(query.getNumberOfBedrooms());
        System.out.println(" property name " + query.getProperty_name());
        // print property object's fields
        System.out.println("property name " + property.getProperty_name());
        System.out.println("property type " + property.getProperty_type());
        System.out.println("number of bedrooms " + property.getBedrooms());

        return propertyRepository.findAll(Example.of(property));
//        return propertyRepository.findByPropertyListQuery(query.getProperty_name(), query.getProperty_type(),
//                query.getNumberOfBedrooms(), query.getCity(), query.getProvince(), query.getCountry());
    }

    public Property addProperty(Property property)
    {
        return propertyRepository.save(property);
    }

    public Property getProperty(Integer id)
    {
        return propertyRepository.findById(id).get();
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
