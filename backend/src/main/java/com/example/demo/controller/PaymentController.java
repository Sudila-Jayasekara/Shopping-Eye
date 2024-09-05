package com.example.demo.controller;

import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/public/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Get all payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get a payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new payment
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.savePayment(payment);
        return ResponseEntity.ok(savedPayment);
    }

    // Update an existing payment
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            Payment updatedPayment = payment.get();
            updatedPayment.setPaymentMethod(paymentDetails.getPaymentMethod());
            updatedPayment.setExpirationDate(paymentDetails.getExpirationDate());
            updatedPayment.setCardNumber(paymentDetails.getCardNumber());
            updatedPayment.setSecurityCode(paymentDetails.getSecurityCode());
            updatedPayment.setFirstName(paymentDetails.getFirstName());
            updatedPayment.setLastName(paymentDetails.getLastName());
            updatedPayment.setBillingAddress(paymentDetails.getBillingAddress());
            updatedPayment.setZipCode(paymentDetails.getZipCode());
            updatedPayment.setEmail(paymentDetails.getEmail());
            updatedPayment.setPhoneNumber(paymentDetails.getPhoneNumber());
            return ResponseEntity.ok(paymentService.savePayment(updatedPayment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a payment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        if (paymentService.getPaymentById(id).isPresent()) {
            paymentService.deletePayment(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
