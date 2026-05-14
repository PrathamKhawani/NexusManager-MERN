import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_for_nexus_manager";

export const protectRoute = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
