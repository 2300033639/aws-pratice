package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.klef.dev.model.Customer;
import com.klef.dev.service.CustomerService;

@RestController
@RequestMapping("/customerapi")
@CrossOrigin(origins = "*") 
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    
    @GetMapping("/")
    public String home() {
    	return "Welcome";
    }

    // Get all customers
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Get a single customer by ID
    @GetMapping("/get/{id}")
    public Customer getCustomerById(@PathVariable int id) {
        return customerService.getCustomerById(id);
    }

    // Add a new customer
    @PostMapping("/add")
    public Customer addCustomer(@RequestBody Customer c) {
        return customerService.addCustomer(c);
    }

    // Update an existing customer
    @PutMapping("/update")
    public Customer updateCustomer(@RequestBody Customer c) {
        return customerService.updateCustomer(c);
    }

    // Delete a customer by ID
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomer(id);
        return "Customer deleted successfully!";
    }

    // Block a customer by ID
    @PutMapping("/block/{id}")
    public Customer blockCustomer(@PathVariable int id) {
        return customerService.blockCustomer(id);
    }

    // Unblock a customer by ID
    @PutMapping("/unblock/{id}")
    public Customer unblockCustomer(@PathVariable int id) {
        return customerService.unblockCustomer(id);
    }
}