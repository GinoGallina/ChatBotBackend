/* eslint-disable import/extensions */
import express from "express";
import { login, logout, register } from "../controllers/User/userController.js";
import { isLogged } from "../middlewares/isLoggedMiddleware.js";
import { isNotLogged } from "../middlewares/isNotLoggedMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", isNotLogged, login);
userRouter.post("/logout", isLogged, logout);

export default userRouter;
