import { Router } from "express";
import { Delete, GetUsers, Login, Register } from "../controller/AuthController";

export const authRouter = Router();

authRouter.post("/login", Login);

/**
 * Functions for debugging purposes
 */
// authRouter.post("/register", Register);
// authRouter.delete("/delete/:id", Delete);
// authRouter.get("/users", GetUsers);
