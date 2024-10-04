package com.example.demo.service;

import com.example.demo.entity.Wishlist;
import com.example.demo.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    public ResponseEntity<Wishlist> getWishlistById(Long id) {
        Optional<Wishlist> wishlist = wishlistRepository.findById(id);
        return wishlist.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Wishlist> saveWishlist(Wishlist wishlist) {
        Wishlist savedWishlist = wishlistRepository.save(wishlist);
        return new ResponseEntity<>(savedWishlist, HttpStatus.CREATED);
    }


    public ResponseEntity<Void> addItemToWishlist(Long id, Long itemId) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findById(id);
        if (wishlistOptional.isPresent()) {
            Wishlist wishlist = wishlistOptional.get();
            wishlist.addItem(itemId);
            wishlistRepository.save(wishlist);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> removeItemFromWishlist(Long id, Long itemId) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findById(id);
        if (wishlistOptional.isPresent()) {
            Wishlist wishlist = wishlistOptional.get();
            wishlist.removeItem(itemId);
            wishlistRepository.save(wishlist);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
