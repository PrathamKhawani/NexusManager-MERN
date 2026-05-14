import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../adduser/adduser.css'; // Reusing premium form styles

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', credentials);
            login(response.data.token, response.data.admin);
            toast.success("Welcome back!", { style: { background: '#10b981', color: '#fff' } });
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed", { style: { background: '#ef4444', color: '#fff' } });
        }
    };

    return (
        <div className="form-container fade-in" style={{ marginTop: '10vh' }}>
            <div className="form-card">
                <div className="form-header">
                    <h2><i className="fa-solid fa-lock" style={{color: 'var(--primary)', marginRight: '10px'}}></i> Admin Login</h2>
                    <p>Enter your credentials to access the NexusManager.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-actions" style={{ flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <button type="submit" className="btn-submit">Sign In</button>
                        <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                            Don't have an account? <Link to="/register" style={{color: 'var(--primary)'}}>Register here</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
