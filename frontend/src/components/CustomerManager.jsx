import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config.js'; // Correct import statement
import './CustomerManager.css';

const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({
        id: '',
        name: '',
        age: '',
        gender: '',
        passportNumber: '',
        status: '',
        flightBooked: ''
    });
    const [idToFetch, setIdToFetch] = useState('');
    const [fetchedCustomer, setFetchedCustomer] = useState(null);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Use the full base URL from the configuration
    const baseUrl = `${API_ENDPOINTS.baseUrl}/customerapi`;

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const fetchAllCustomers = async () => {
        try {
            const res = await axios.get(`${baseUrl}/all`);
            if (Array.isArray(res.data)) {
                setCustomers(res.data);
            } else {
                setCustomers([]);
                setMessage('API response is not an array.');
            }
        } catch (error) {
            setMessage('Failed to fetch customers.');
        }
    };

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const addCustomer = async () => {
        try {
            await axios.post(`${baseUrl}/add`, customer);
            setMessage('Customer added successfully.');
            fetchAllCustomers();
            resetForm();
        } catch (error) {
            setMessage('Error adding customer.');
        }
    };

    const updateCustomer = async () => {
        try {
            await axios.put(`${baseUrl}/update`, customer);
            setMessage('Customer updated successfully.');
            fetchAllCustomers();
            resetForm();
        } catch (error) {
            setMessage('Error updating customer.');
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/delete/${id}`);
            setMessage(res.data);
            fetchAllCustomers();
        } catch (error) {
            setMessage('Error deleting customer.');
        }
    };

    const getCustomerById = async () => {
        try {
            const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
            setFetchedCustomer(res.data);
            setMessage('');
        } catch (error) {
            setFetchedCustomer(null);
            setMessage('Customer not found.');
        }
    };

    const handleEdit = (customer) => {
        setCustomer(customer);
        setEditMode(true);
        setMessage(`Editing customer with ID ${customer.id}`);
    };

    const resetForm = () => {
        setCustomer({
            id: '',
            name: '',
            age: '',
            gender: '',
            passportNumber: '',
            status: '',
            flightBooked: ''
        });
        setEditMode(false);
    };

    return (
        <div className="customer-container">
            {message && (
                <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <h2>Airline Customer Management</h2>

            <div>
                <h3>{editMode ? 'Edit Customer' : 'Add Customer'}</h3>
                <div className="form-grid">
                    <input type="number" name="id" placeholder="ID" value={customer.id} onChange={handleChange} />
                    <input type="text" name="name" placeholder="Name" value={customer.name} onChange={handleChange} />
                    <input type="number" name="age" placeholder="Age" value={customer.age} onChange={handleChange} />
                    <input type="text" name="gender" placeholder="Gender" value={customer.gender} onChange={handleChange} />
                    <input type="text" name="passportNumber" placeholder="Passport Number" value={customer.passportNumber} onChange={handleChange} />
                    <input type="text" name="status" placeholder="Status" value={customer.status} onChange={handleChange} />
                    <input type="text" name="flightBooked" placeholder="Flight Booked" value={customer.flightBooked} onChange={handleChange} />
                </div>

                <div className="btn-group">
                    {!editMode ? (
                        <button className="btn-blue" onClick={addCustomer}>Add Customer</button>
                    ) : (
                        <>
                            <button className="btn-green" onClick={updateCustomer}>Update Customer</button>
                            <button className="btn-gray" onClick={resetForm}>Cancel</button>
                        </>
                    )}
                </div>
            </div>

            <div>
                <h3>Get Customer By ID</h3>
                <input
                    type="number"
                    value={idToFetch}
                    onChange={(e) => setIdToFetch(e.target.value)}
                    placeholder="Enter ID"
                />
                <button className="btn-blue" onClick={getCustomerById}>Fetch</button>

                {fetchedCustomer && (
                    <div className="fetched-table">
                        <h4>Customer Found:</h4>
                        <table className="single-customer-table">
                            <tbody>
                                {Object.entries(fetchedCustomer).map(([key, value]) => (
                                    <tr key={key}>
                                        <th>{key}</th>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div>
                <h3>All Customers</h3>
                {Array.isArray(customers) && customers.length > 0 ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(customers[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        {Object.values(customer).map((value, index) => (
                                            <td key={index}>{value}</td>
                                        ))}
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-green" onClick={() => handleEdit(customer)}>Edit</button>
                                                <button className="btn-red" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerManager;