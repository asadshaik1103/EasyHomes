package com.group24.easyHomes.service;

import com.group24.easyHomes.model.Property;
import com.group24.easyHomes.model.PropertyListQuery;
import com.group24.easyHomes.model.Services;
import com.group24.easyHomes.model.ServicesListQuery;
import com.group24.easyHomes.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<Services> filterServices(ServicesListQuery servicesListQuery) {

        return serviceRepository.findAll(findByCriteria(servicesListQuery));

    }

    public static Specification<Services> findByCriteria(ServicesListQuery searchCriteria) {

        return new Specification<Services>() {

            @Override
            public Predicate toPredicate(
                    Root<Services> root,
                    CriteriaQuery<?> query, CriteriaBuilder cb) {

                List<Predicate> predicates = new ArrayList<Predicate>();

                HashMap<String, Object> servicesMap = new HashMap<String, Object>();
                servicesMap.put("service_name", searchCriteria.getService_name());
                servicesMap.put("service_type", searchCriteria.getService_type());
                servicesMap.put("plan", searchCriteria.getPlan());
                servicesMap.put("city", searchCriteria.getCity());
                servicesMap.put("province", searchCriteria.getProvince());
                servicesMap.put("country", searchCriteria.getCountry());

                for(Map.Entry<String, Object> entry : servicesMap.entrySet()) {
                    if (entry.getValue() != null && !entry.getValue().equals("")) {
                        predicates.add(cb.equal(root.get(entry.getKey()), ((String) entry.getValue()).toLowerCase()));
                    }
                }

                if (searchCriteria.getCost()!= null) {
                    predicates.add(cb.equal(root.get("cost"), searchCriteria.getCost()));
                }

                return cb.and(predicates.toArray(new Predicate[] {}));
            }
        };
    }
}
