import React, { useState, useEffect } from 'react'
import "./user.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import * as XLSX from 'xlsx';

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users?search=${searchQuery}`);
                setUsers(response.data);
            } catch (error) {
                // Ignore 404s when searching returns nothing
                if (error.response?.status === 404) {
                    setUsers([]);
                } else {
                    console.error("Error fetching users:", error);
                }
            }
        };
        const debounce = setTimeout(fetchData, 300); // Debounce search
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success(response.data.message, {
                position: "top-right",
                style: { background: '#10b981', color: '#fff', borderRadius: '8px' }
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user", {
                position: "top-right",
                style: { background: '#ef4444', color: '#fff' }
            });
        }
    };

    const exportToCSV = () => {
        if (users.length === 0) return toast.error("No data to export");
        
        try {
            // Prepare data for Excel
            const dataToExport = users.map(u => ({
                ID: u._id,
                Name: u.name,
                Email: u.email,
                Address: u.address
            }));

            // Create workbook and worksheet
            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            // Generate Excel file using array buffer to avoid FileSaver browser quirks
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "nexus_users_export.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast.success("Excel document downloaded!");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export Excel file");
        }
    };

    return (
        <div className="user-dashboard">
            <div className="page-header" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <h1 className="page-title">Users</h1>
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <button onClick={exportToCSV} className="btn-secondary-premium">
                            <i className="fa-solid fa-file-excel" style={{color: '#10b981'}}></i> Export Excel
                        </button>
                        <Link to="/add" className="btn-premium">
                            <i className="fa-solid fa-plus"></i> Add User
                        </Link>
                    </div>
                </div>
                
                {/* Metrics Banner */}
                <div style={{display: 'flex', gap: '2rem', background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', width: '100%'}}>
                    <div>
                        <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Total Users</p>
                        <h2 style={{margin: 0, color: '#fff', fontSize: '2rem'}}>{users.length}</h2>
                    </div>
                </div>
            </div>

            <div className="data-card fade-in">
                <div className="card-header" style={{flexWrap: 'wrap', gap: '1rem'}}>
                    <div className="card-title">
                        <i className="fa-solid fa-users"></i> Directory
                    </div>
                    {/* Search Bar */}
                    <div style={{position: 'relative', width: '100%', maxWidth: '300px'}}>
                        <i className="fa-solid fa-search" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}}></i>
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(15, 23, 42, 0.6)', color: '#fff'}}
                        />
                    </div>
                </div>

                {users.length === 0 ? (
                    <div className='empty-state'>
                        <div className="empty-icon">
                            <i className="fa-solid fa-user-slash"></i>
                        </div>
                        <h3>No Users Found</h3>
                        <p>{searchQuery ? "No users match your search criteria." : "Your directory is empty. Add a new user to start building your network."}</p>
                        {!searchQuery && (
                            <Link to="/add" className="btn-premium" style={{marginTop: '1rem'}}>
                                Get Started
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="premium-table"> 
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Contact</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="user-details">
                                                    <h4>{user.name}</h4>
                                                    <p>ID: {user._id.substring(user._id.length - 6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{color: '#fff'}}>{user.email}</span>
                                        </td>
                                        <td>
                                            <span style={{color: 'var(--text-muted)'}}>
                                                <i className="fa-solid fa-location-dot" style={{marginRight: '6px', color: 'var(--primary)'}}></i>
                                                {user.address}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge">Active</span>
                                        </td>
                                        <td>
                                            <div className="action-btns" style={{justifyContent: 'flex-end'}}>
                                                <Link to={`/update/${user._id}`} className="btn-icon btn-edit" title="Edit User">
                                                    <i className="fa-solid fa-pen"></i>
                                                </Link>
                                                <button onClick={() => deleteUser(user._id)} className="btn-icon btn-delete" title="Delete User">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
