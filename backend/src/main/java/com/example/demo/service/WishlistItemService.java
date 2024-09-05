package com.example.demo.service;

import com.example.demo.entity.WishlistItem;
import com.example.demo.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistItemService {
    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    public List<WishlistItem> getAllWishlistItems() {
        return wishlistItemRepository.findAll();
    }
    public Optional<WishlistItem> getWishlistItemById(Long id) {
        return wishlistItemRepository.findById(id);
    }
    public WishlistItem saveWishlistItem(WishlistItem wishlistItem) {
        return wishlistItemRepository.save(wishlistItem);
    }
    public void deleteWishlistItem(Long id) {
        wishlistItemRepository.deleteById(id);
    }
}
