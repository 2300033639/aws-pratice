package com.klef.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_table")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private int id;

    @Column(name = "customer_name", nullable = false, length = 100)
    private String name;

    @Column(name = "customer_age", nullable = false)
    private int age;

    @Column(name = "customer_gender", length = 10)
    private String gender;

    @Column(name = "passport_no", length = 50, unique = true)
    private String passportNumber;

    @Column(name = "customer_status", length = 20)
    private String status = "ACTIVE"; // Default status

    @Column(name = "flight_booked", length = 100)
    private String flightBooked;

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getFlightBooked() { return flightBooked; }
    public void setFlightBooked(String flightBooked) { this.flightBooked = flightBooked; }
    
    // Custom logic for status
    public void setBlocked(boolean blocked) {
        this.status = blocked ? "BLOCKED" : "ACTIVE";
    }

    public boolean isBlocked() {
        return "BLOCKED".equalsIgnoreCase(this.status);
    }
}