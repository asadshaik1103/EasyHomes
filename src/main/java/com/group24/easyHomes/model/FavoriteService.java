package com.group24.easyHomes.model;

import javax.persistence.*;

@Entity
@Table(name = "favorite_service")
public class FavoriteService {
    @Id
    @GeneratedValue
    private Long favorite_service_id;

    @Column(name="user_id")
    private Long user_id;
    @Column(name="service_id")
    private int service_id;


    public FavoriteService(Long user_id, int service_id) {
        this.user_id = user_id;
        this.service_id = service_id;
    }

    public FavoriteService() {
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public int getService_id() {
        return service_id;
    }

    public void setService_id(int service_id) {
        this.service_id = service_id;
    }

    public Long getFavorite_service_id() {
        return favorite_service_id;
    }

    public void setFavorite_service_id(Long favorite_service_id) {
        this.favorite_service_id = favorite_service_id;
    }
}
