package com.group24.easyHomes.service;
import com.group24.easyHomes.model.PropertyListQuery;
import com.group24.easyHomes.repository.PropertyRepository;
import com.group24.easyHomes.model.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Property> listAll()
    {
        return propertyRepository.findAll();
    }

//    public List<Property> filterProperties(PropertyListQuery query)
//    {
//        Property property = new Property();
//        property.setProperty_name(query.getProperty_name());
//        property.setProperty_type(query.getProperty_type());
//        property.setBedrooms(query.getNumberOfBedrooms());
//        System.out.println(" property name " + query.getProperty_name());
//        // print property object's fields
//        System.out.println("property name " + property.getProperty_name());
//        System.out.println("property type " + property.getProperty_type());
//        System.out.println("number of bedrooms " + property.getBedrooms());
//
//        // use CriteriaBuilder to create filter properties
//        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//        CriteriaQuery<Property> criteriaQuery = criteriaBuilder.createQuery(Property.class);
//        Root<Property> root = criteriaQuery.from(Property.class);
//
//        Path<String> propertyName = root.get("property_name");
//        Path<String> propertyType = root.get("property_type");
//        Path<Integer> bedrooms = root.get("bedrooms");
//
//        List<Predicate> predicates = new ArrayList<>();
//
//        if(query.getProperty_name() != null)
//        {
//            predicates.add(criteriaBuilder.like(propertyName, query.getProperty_name()));
//        }
//        if(query.getProperty_type() != null)
//        {
//            predicates.add(criteriaBuilder.like(propertyType, query.getProperty_type()));
//        }
//
//        criteriaQuery.select(root).where(predicates.toArray(new Predicate[predicates.size()]));
//
//        // execute query
//        return entityManager.createQuery(criteriaQuery).getResultList();
//
////        return propertyRepository.findAll(Example.of(property));
////        return propertyRepository.findByPropertyListQuery(query.getProperty_name(), query.getProperty_type(),
////                query.getNumberOfBedrooms(), query.getCity(), query.getProvince(), query.getCountry());
//    }

    public List<Property> filterProperties(PropertyListQuery propertyListQuery) {

        return propertyRepository.findAll(findByCriteria(propertyListQuery));

    }

    public static Specification<Property> findByCriteria(PropertyListQuery searchCriteria) {

        return new Specification<Property>() {

            @Override
            public Predicate toPredicate(
                    Root<Property> root,
                    CriteriaQuery<?> query, CriteriaBuilder cb) {

                List<Predicate> predicates = new ArrayList<Predicate>();

                if (searchCriteria.getProperty_name()!= null && !searchCriteria.getProperty_name().isEmpty()) {
                    predicates.add(cb.equal(root.get("property_name"), searchCriteria.getProperty_name().toLowerCase()));
                }

                if (searchCriteria.getAmenities() != null && !searchCriteria.getAmenities().isEmpty()) {
                    predicates.add(cb.equal(root.get("amenities"), searchCriteria.getAmenities().toLowerCase()));
                }

                if (searchCriteria.getProperty_type() != null && !searchCriteria.getProperty_type().isEmpty()) {
                    predicates.add(cb.equal(root.get("property_type"), searchCriteria.getProperty_type().toLowerCase()));
                }

                if (searchCriteria.getNumberOfBedrooms() != null) {
                    predicates.add(cb.equal(root.get("bedrooms"), searchCriteria.getNumberOfBedrooms()));
                }

                if (searchCriteria.getNumberOfBathrooms() != null) {
                    predicates.add(cb.equal(root.get("bathrooms"), searchCriteria.getNumberOfBathrooms()));
                }

                if (searchCriteria.getParkingIncluded() != null) {
                    predicates.add(cb.equal(root.get("parking_included"), searchCriteria.getParkingIncluded()));
                }

                return cb.and(predicates.toArray(new Predicate[] {}));
            }
        };
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
