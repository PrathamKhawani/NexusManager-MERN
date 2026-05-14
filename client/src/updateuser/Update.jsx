import React, { useEffect, useState } from 'react'
import "../adduser/adduser.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";

const UpdateUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch ((error) => {
                console.error("Error fetching user:", error);
            });
        }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
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
            toast.error(error.response?.data?.message || "Failed to update user", {
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
                <h2>Update User</h2>
                <p>Modify the information below to update the user's profile.</p>
            </div>
            
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" value={user?.name || ""} onChange={inputHandler} autoComplete='off' placeholder='e.g. Jane Doe' className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" value={user?.email || ""} onChange={inputHandler} autoComplete='off' placeholder='e.g. jane@example.com' className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Location / Address</label>
                    <input type="text" name="address" id="address" value={user?.address || ""} onChange={inputHandler} autoComplete='off' placeholder='e.g. New York, NY' className="form-control" required />
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn-submit">
                        <i className="fa-solid fa-floppy-disk"></i> Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateUser;