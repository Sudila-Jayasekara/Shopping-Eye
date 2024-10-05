package com.example.demo.service;

import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist;
import com.example.demo.entity.SharedWishlistItem;
import com.example.demo.repository.SharedWishlistRepository;
import com.example.demo.repository.SharedWishlistItemRepository;
import com.example.demo.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SharedWishlistService {

    @Autowired
    private SharedWishlistRepository sharedWishlistRepository;

    @Autowired
    private SharedWishlistItemRepository sharedWishlistItemRepository;

    @Autowired
    private UsersRepo ourUsersRepository;

    public SharedWishlist createWishlist(SharedWishlist wishlist) {
        return sharedWishlistRepository.save(wishlist);
    }

    public Optional<SharedWishlist> getWishlist(Long id) {
        return sharedWishlistRepository.findById(id);
    }

    public void deleteWishlist(Long id) {
        sharedWishlistRepository.deleteById(id);
    }

    public SharedWishlist addItemToWishlist(Long wishlistId, SharedWishlistItem item) {
        SharedWishlist wishlist = sharedWishlistRepository.findById(wishlistId).orElseThrow();
        wishlist.addItem(item);
        sharedWishlistItemRepository.save(item);
        return sharedWishlistRepository.save(wishlist);
    }

    public SharedWishlist removeItemFromWishlist(Long wishlistId, Long itemId) {
        SharedWishlist wishlist = sharedWishlistRepository.findById(wishlistId).orElseThrow();
        SharedWishlistItem item = sharedWishlistItemRepository.findById(itemId).orElseThrow();
        wishlist.removeItem(item);
        sharedWishlistItemRepository.delete(item);
        return sharedWishlistRepository.save(wishlist);
    }

    public Set<SharedWishlistItem> getItems(Long wishlistId) {
        SharedWishlist wishlist = sharedWishlistRepository.findById(wishlistId).orElseThrow();
        return wishlist.getItems();
    }

    public SharedWishlist addMemberToWishlist(Long wishlistId, OurUsers member) {
        SharedWishlist wishlist = sharedWishlistRepository.findById(wishlistId).orElseThrow();
        OurUsers user = ourUsersRepository.findById(member.getId()).orElseThrow();
        wishlist.addMember(user);
        return sharedWishlistRepository.save(wishlist);
    }

    public List<SharedWishlist> getWishlistsByUserId(Long userId) {
        return sharedWishlistRepository.findByOwnerId(userId); // Implement this in your repository
    }

}
