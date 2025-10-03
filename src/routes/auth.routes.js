import express from "express"
import { login, logout, register, verifyUser } from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.post("/verify", verifyUser);


export default authRoutes;