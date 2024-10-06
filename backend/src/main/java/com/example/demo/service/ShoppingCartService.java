package com.example.demo.service;

import com.example.demo.entity.ShoppingCart;
import com.example.demo.entity.CartItem;
import com.example.demo.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    // Get cart by customer ID
    public Optional<ShoppingCart> getCartByCustomerId(Long customerId) {
        return shoppingCartRepository.findByCustomerId(customerId);
    }


//    public ShoppingCart addItemToCart(ShoppingCart cart, CartItem item) {
//        cart.getItems().add(item);
//        cart.setTotalPrice(cart.getItems().stream()
//                .mapToDouble(CartItem::getItemTotalPrice)
//                .sum());
//        return shoppingCartRepository.save(cart);
//    }

    // Add item to cart and set the purchase date
    public ShoppingCart addItemToCart(ShoppingCart cart, CartItem item) {
        // Set the purchase day to the current date
        item.setPurchaseDay(LocalDate.now());

        // Add the item to the cart
        cart.getItems().add(item);

        // Update the total price of the cart
        cart.setTotalPrice(cart.getItems().stream()
                .mapToDouble(CartItem::getItemTotalPrice)
                .sum());

        // Save the cart and return the updated cart
        return shoppingCartRepository.save(cart);
    }

    // Remove item from cart
    public ShoppingCart removeItemFromCart(ShoppingCart cart, CartItem item) {
        cart.getItems().remove(item);
        cart.setTotalPrice(cart.getItems().stream()
                .mapToDouble(CartItem::getItemTotalPrice)
                .sum());
        return shoppingCartRepository.save(cart);
    }

    // Clear cart after checkout
    public void clearCart(ShoppingCart cart) {
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        shoppingCartRepository.save(cart);
    }
}
