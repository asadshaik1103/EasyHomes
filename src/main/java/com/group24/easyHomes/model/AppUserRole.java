package com.group24.easyHomes.model;

//public enum AppUserRole {
//
//    USER,
//    ADMIN
//
//}

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "userrole")
public class AppUserRole {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;

    @OneToMany(targetEntity = AppUser.class, mappedBy = "appUserRole", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AppUser> users;

    public AppUserRole() {
    }

    public AppUserRole(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}