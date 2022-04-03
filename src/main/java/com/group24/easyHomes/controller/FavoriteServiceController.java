package com.group24.easyHomes.controller;

import com.group24.easyHomes.model.FavoriteService;
import com.group24.easyHomes.repository.FavoriteServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/favorite-service", produces = "application/json")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FavoriteServiceController {

    @Autowired
    FavoriteServiceRepository favoriteServiceRepository;

    @GetMapping("/favorites")
    public List<FavoriteService> getAllFavoriteServices() {
        return favoriteServiceRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity newFavoriteService(@RequestBody FavoriteService favoriteService) {
        FavoriteService addedFavoriteService = new FavoriteService();
        addedFavoriteService.setUser_id(favoriteService.getUser_id());
        addedFavoriteService.setService_id(favoriteService.getService_id());
        addedFavoriteService = favoriteServiceRepository.save(addedFavoriteService);
        return ResponseEntity.ok(addedFavoriteService);
    }

    @GetMapping("/{userId}")
    public List<FavoriteService> getFavoriteServices(@PathVariable Long userId) {
        return favoriteServiceRepository.findByUserId(userId);
    }

    @DeleteMapping("/delete/{favoriteServiceId}")
    public ResponseEntity deleteFavoriteService(@PathVariable Long favoriteServiceId) {
        favoriteServiceRepository.deleteById(favoriteServiceId);
        return ResponseEntity.ok().build();
    }
}
