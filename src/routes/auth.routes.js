import express from "express"
import { login, logout, register, verify } from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.post("/verify", verify);


export default authRoutes;