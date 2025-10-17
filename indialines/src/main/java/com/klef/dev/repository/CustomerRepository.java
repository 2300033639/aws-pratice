package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByPassportNumber(String passportNumber);
}