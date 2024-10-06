package com.example.demo.service;

import com.example.demo.dto.SharedWishlistDTO; // Import your SharedWishlistDTO
import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist;  // Import your SharedWishlist entity
import com.example.demo.repository.SharedWishlistRepository;  // Import your SharedWishlist repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class SharedWishlistService {
    @Autowired
    private SharedWishlistRepository sharedWishlistRepository;  // Use SharedWishlistRepository

    @Autowired
    private UsersManagementService usersManagementService;

    public ResponseEntity<SharedWishlist> getSharedWishlistById(Long id) {
        Optional<SharedWishlist> sharedWishlist = sharedWishlistRepository.findById(id);
        return sharedWishlist.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<SharedWishlist> saveSharedWishlist(SharedWishlistDTO sharedWishlistDTO) {
        OurUsers owner = usersManagementService.getUsersById(sharedWishlistDTO.getOwnerId()).getOurUsers();  // Get owner object
        if (owner == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Handle case if owner not found
        }

        SharedWishlist sharedWishlist = new SharedWishlist();
        sharedWishlist.setOwner(owner);  // Set the owner object
        sharedWishlist.setSharedWishlistName(sharedWishlistDTO.getSharedWishlistName());  // Set the name of the wishlist
        sharedWishlist.setItemIds(new HashSet<>(sharedWishlistDTO.getItemIds()));  // Initialize item IDs from DTO

        // Initialize members list if necessary
        sharedWishlist.setMembers(new HashSet<>());  // Initialize members list
        for (Long memberId : sharedWishlistDTO.getMemberIds()) {
            OurUsers member = usersManagementService.getUsersById(memberId).getOurUsers();  // Get user object
            if (member != null) {
                sharedWishlist.addMember(member);  // Add member if valid
            }
        }

        SharedWishlist savedSharedWishlist = sharedWishlistRepository.save(sharedWishlist);
        return new ResponseEntity<>(savedSharedWishlist, HttpStatus.CREATED);
    }

    public ResponseEntity<Void> deleteSharedWishlist(Long id) {
        Optional<SharedWishlist> sharedWishlistOptional = sharedWishlistRepository.findById(id);
        if (sharedWishlistOptional.isPresent()) {
            sharedWishlistRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> addMemberToSharedWishlist(Long id, Long userId) {
        Optional<SharedWishlist> sharedWishlistOptional = sharedWishlistRepository.findById(id);
        if (sharedWishlistOptional.isPresent()) {
            SharedWishlist sharedWishlist = sharedWishlistOptional.get();
            OurUsers user = usersManagementService.getUsersById(userId).getOurUsers();
            sharedWishlist.addMember(user);  // Add user ID to members
            sharedWishlistRepository.save(sharedWishlist);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> removeMemberFromSharedWishlist(Long id, Long userId) {
        Optional<SharedWishlist> sharedWishlistOptional = sharedWishlistRepository.findById(id);
        if (sharedWishlistOptional.isPresent()) {
            SharedWishlist sharedWishlist = sharedWishlistOptional.get();
            OurUsers user = usersManagementService.getUsersById(userId).getOurUsers();  // Fetch user object
            if (user != null) {
                sharedWishlist.removeMember(user);  // Use method to remove member
                sharedWishlistRepository.save(sharedWishlist);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<List<SharedWishlist>> getAllSharedWishlistsForUser(Long userId) {
        OurUsers user = usersManagementService.getUsersById(userId).getOurUsers();  // Get the user object
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Handle case if user not found
        }
        List<SharedWishlist> sharedWishlists = sharedWishlistRepository.findByMembersContaining(user);
        return new ResponseEntity<>(sharedWishlists, HttpStatus.OK);
    }

    public ResponseEntity<Void> addItemToSharedWishlist(Long id, Long itemId) {
        Optional<SharedWishlist> sharedWishlistOptional = sharedWishlistRepository.findById(id);
        if (sharedWishlistOptional.isPresent()) {
            SharedWishlist sharedWishlist = sharedWishlistOptional.get();
            sharedWishlist.addItem(itemId);  // Add item using the method
            sharedWishlistRepository.save(sharedWishlist);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> removeItemFromSharedWishlist(Long id, Long itemId) {
        Optional<SharedWishlist> sharedWishlistOptional = sharedWishlistRepository.findById(id);
        if (sharedWishlistOptional.isPresent()) {
            SharedWishlist sharedWishlist = sharedWishlistOptional.get();
            sharedWishlist.removeItem(itemId);  // Assuming removeItem is a method in SharedWishlist
            sharedWishlistRepository.save(sharedWishlist);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
