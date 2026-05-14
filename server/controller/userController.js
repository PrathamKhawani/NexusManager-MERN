import User from "../model/userModel.js";
import mongoose from "mongoose";

let mockUsers = [
    { _id: "64a2b1c3d4e5f6g7h8i9j0", name: "Alice Johnson", email: "alice@example.com", address: "San Francisco, CA" },
    { _id: "64a2b1c3d4e5f6g7h8i9j1", name: "Bob Smith", email: "bob@example.com", address: "New York, NY" },
    { _id: "64a2b1c3d4e5f6g7h8i9j2", name: "Charlie Davis", email: "charlie@example.com", address: "London, UK" }
];

// Create a new user
export const create = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const newUser = { ...req.body, _id: "mock_" + Date.now() };
            mockUsers.push(newUser);
            return res.status(200).json({ message: "Mock: User created successfully.", data: newUser });
        }
        const newUser = new User(req.body);
        const { email } = newUser;

        // Check if user with the same email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User with this email already exists." });
        }   
        const savedData = await newUser.save();
        res.status(200).json({ message: "User created successfully.", data: savedData });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const searchParams = req.query.search ? req.query.search.toLowerCase() : "";

        if (mongoose.connection.readyState !== 1) {
            let filteredMock = mockUsers;
            if (searchParams) {
                filteredMock = mockUsers.filter(u => 
                    u.name.toLowerCase().includes(searchParams) || 
                    u.email.toLowerCase().includes(searchParams)
                );
            }
            return res.status(200).json(filteredMock);
        }

        let query = {};
        if (searchParams) {
            query = {
                $or: [
                    { name: { $regex: searchParams, $options: 'i' } },
                    { email: { $regex: searchParams, $options: 'i' } }
                ]
            };
        }

        const userData = await User.find(query);
        if(!userData || userData.length === 0){
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json(mockUsers.find(u => u._id === req.params.id) || mockUsers[0]);
        }
        const { id } = req.params;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update user by ID
export const update = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const index = mockUsers.findIndex(u => u._id === req.params.id);
            if (index !== -1) {
                mockUsers[index] = { ...mockUsers[index], ...req.body };
            }
            return res.status(200).json({ message: "Mock: User updated successfully.", data: req.body });
        }
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({ message: "User not found." });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully.", data: updatedData });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            mockUsers = mockUsers.filter(u => u._id !== req.params.id);
            return res.status(200).json({ message: "Mock: User deleted successfully." });
        }
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({ message: "User not found." });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};