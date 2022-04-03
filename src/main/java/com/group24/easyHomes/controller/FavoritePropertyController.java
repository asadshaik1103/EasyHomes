package com.group24.easyHomes.controller;

import com.group24.easyHomes.model.FavoriteProperty;
import com.group24.easyHomes.repository.FavoritePropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/favorite-property", produces = "application/json")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FavoritePropertyController {
    @Autowired
    FavoritePropertyRepository favoritePropertyRepository;

    @GetMapping("/favorites")
    public List<FavoriteProperty> getAllFavoriteProperties() {
        return favoritePropertyRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity newFavoriteProperty(@RequestBody FavoriteProperty favoriteProperty) {
        FavoriteProperty addedFavoriteProperty = new FavoriteProperty();
        addedFavoriteProperty.setUser_id(favoriteProperty.getUser_id());
        addedFavoriteProperty.setProperty_id(favoriteProperty.getProperty_id());
        addedFavoriteProperty = favoritePropertyRepository.save(addedFavoriteProperty);
        return ResponseEntity.ok(addedFavoriteProperty);
    }

    @GetMapping("/{userId}")
    public List<FavoriteProperty> getFavoriteProperties(@PathVariable Long userId) {
        return favoritePropertyRepository.findByUserId(userId);
    }

    @DeleteMapping("/delete/{favoritePropertyId}")
    public ResponseEntity deleteFavoriteProperty(@PathVariable Long favoritePropertyId) {
        favoritePropertyRepository.deleteById(favoritePropertyId);
        return ResponseEntity.ok().build();
    }
}
