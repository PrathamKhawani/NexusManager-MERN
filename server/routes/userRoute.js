import express from "express";
import { create, getAllUsers, getUserById, update, deleteUser } from "../controller/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const route = express.Router();

// Apply protectRoute to all user routes
route.post("/user", protectRoute, create);
route.get("/users", protectRoute, getAllUsers);
route.get("/user/:id", protectRoute, getUserById);
route.put("/update/user/:id", protectRoute, update);
route.delete("/delete/user/:id", protectRoute, deleteUser);

export default route;