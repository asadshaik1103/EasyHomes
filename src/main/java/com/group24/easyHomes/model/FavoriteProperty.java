package com.group24.easyHomes.model;

import javax.persistence.*;

@Entity
@Table(name = "favorite_property")
public class FavoriteProperty {
    @Id
    @GeneratedValue
    private Long favorite_property_id;

    @Column(name="user_id")
    private Long user_id;
    @Column(name="property_id")
    private int property_id;



    public FavoriteProperty() {
    }

    public FavoriteProperty(Long user_id, int property_id) {
        this.user_id = user_id;
        this.property_id = property_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public int getProperty_id() {
        return property_id;
    }

    public void setProperty_id(int property_id) {
        this.property_id = property_id;
    }

    public Long getFavorite_property_id() {
        return favorite_property_id;
    }

    public void setFavorite_property_id(Long favorite_property_id) {
        this.favorite_property_id = favorite_property_id;
    }
}
