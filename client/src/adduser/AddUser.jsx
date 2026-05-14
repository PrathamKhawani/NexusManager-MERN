import React, { useState } from 'react'
import "./adduser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user', user);
            toast.success(response.data.message, {
                position: "top-right",
                style: {
                    background: '#10b981',
                    color: '#fff',
                    borderRadius: '8px',
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || "Failed to create user", {
                position: "top-right",
                style: {
                    background: '#ef4444',
                    color: '#fff',
                }
            });
        }
    }

  return (
    <div className='form-container fade-in'>
        <div className="page-header">
            <Link to="/" className="btn-secondary-premium">
                <i className="fa-solid fa-arrow-left"></i> Back to Directory
            </Link>
        </div>

        <div className="form-card">
            <div className="form-header">
                <h2>Add New User</h2>
                <p>Fill out the information below to add a new user to the system.</p>
            </div>
            
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" onChange={inputHandler} autoComplete='off' placeholder='e.g. Jane Doe' className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" onChange={inputHandler} autoComplete='off' placeholder='e.g. jane@example.com' className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Location / Address</label>
                    <input type="text" name="address" id="address" onChange={inputHandler} autoComplete='off' placeholder='e.g. New York, NY' className="form-control" required />
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn-submit">
                        <i className="fa-solid fa-check"></i> Create User
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser;
