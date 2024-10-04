package com.example.demo.controller;

import com.example.demo.entity.CartItem;
import com.example.demo.entity.ShoppingCart;
import com.example.demo.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/{customerId}")
    public ResponseEntity<ShoppingCart> getCartByCustomerId(@PathVariable Long customerId) {
        Optional<ShoppingCart> cart = shoppingCartService.getCartByCustomerId(customerId);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<ShoppingCart> addItemToCart(@PathVariable Long cartId, @RequestBody CartItem item) {
        Optional<ShoppingCart> cart = shoppingCartService.getCartByCustomerId(cartId);
        if (cart.isPresent()) {
            ShoppingCart updatedCart = shoppingCartService.addItemToCart(cart.get(), item);
            return ResponseEntity.ok(updatedCart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<ShoppingCart> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long itemId) {
        Optional<ShoppingCart> cart = shoppingCartService.getCartByCustomerId(cartId);
        if (cart.isPresent()) {
            ShoppingCart updatedCart = shoppingCartService.removeItemFromCart(cart.get(), cart.get().getItems()
                    .stream().filter(item -> item.getId().equals(itemId)).findFirst().get());
            return ResponseEntity.ok(updatedCart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{cartId}/checkout")
    public ResponseEntity<Void> checkout(@PathVariable Long cartId) {
        Optional<ShoppingCart> cart = shoppingCartService.getCartByCustomerId(cartId);
        if (cart.isPresent()) {
            shoppingCartService.clearCart(cart.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
