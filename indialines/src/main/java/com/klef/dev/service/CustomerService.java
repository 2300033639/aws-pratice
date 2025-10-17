package com.klef.dev.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.model.Customer;
import com.klef.dev.repository.CustomerRepository;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null); // Return null if not found
    }

    public Customer addCustomer(Customer c) {
        if (customerRepository.findByPassportNumber(c.getPassportNumber()) != null) {
            throw new RuntimeException("Passport number already exists!");
        }
        return customerRepository.save(c);
    }
    
    public Customer updateCustomer(Customer updatedCustomer) {
        Optional<Customer> existingCustomer = customerRepository.findById(updatedCustomer.getId());
        if (existingCustomer.isPresent()) {
            Customer c = existingCustomer.get();
            c.setName(updatedCustomer.getName());
            c.setAge(updatedCustomer.getAge());
            c.setGender(updatedCustomer.getGender());
            c.setPassportNumber(updatedCustomer.getPassportNumber());
            c.setStatus(updatedCustomer.getStatus());
            c.setFlightBooked(updatedCustomer.getFlightBooked());
            return customerRepository.save(c);
        } else {
            throw new RuntimeException("Customer not found with id: " + updatedCustomer.getId());
        }
    }

    public void deleteCustomer(int id) {
        customerRepository.deleteById(id);
    }

    public Customer blockCustomer(int id) {
        Customer c = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        c.setBlocked(true);
        return customerRepository.save(c);
    }

    public Customer unblockCustomer(int id) {
        Customer c = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        c.setBlocked(false);
        return customerRepository.save(c);
    }
}