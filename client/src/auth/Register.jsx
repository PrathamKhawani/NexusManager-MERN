import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../adduser/adduser.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', formData);
            toast.success(response.data.message, { style: { background: '#10b981', color: '#fff' } });
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed", { style: { background: '#ef4444', color: '#fff' } });
        }
    };

    return (
        <div className="form-container fade-in" style={{ marginTop: '10vh' }}>
            <div className="form-card">
                <div className="form-header">
                    <h2><i className="fa-solid fa-user-shield" style={{color: 'var(--primary)', marginRight: '10px'}}></i> Register Admin</h2>
                    <p>Create a new administrator account.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} minLength="6" required />
                    </div>
                    <div className="form-actions" style={{ flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <button type="submit" className="btn-submit">Create Account</button>
                        <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                            Already have an account? <Link to="/login" style={{color: 'var(--primary)'}}>Sign in</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
