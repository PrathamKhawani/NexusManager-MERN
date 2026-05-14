import Admin from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// In-memory mock admins for when DB is disconnected
let mockAdmins = [];
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_for_nexus_manager";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (mongoose.connection.readyState !== 1) {
            // Mock fallback
            const existingMock = mockAdmins.find(a => a.email === email);
            if (existingMock) return res.status(400).json({ message: "Admin with this email already exists." });
            
            const newMockAdmin = { _id: "mockadmin_" + Date.now(), name, email, password: hashedPassword };
            mockAdmins.push(newMockAdmin);
            
            return res.status(200).json({ message: "Mock Admin registered successfully." });
        }

        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();
        res.status(200).json({ message: "Admin registered successfully." });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (mongoose.connection.readyState !== 1) {
            // Mock fallback
            const admin = mockAdmins.find(a => a.email === email);
            if (!admin) return res.status(404).json({ message: "Invalid credentials." });
            
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });
            
            const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
