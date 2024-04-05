import express from "express";
import AuthController from "../controllers/AuthController";
const AuthRouter = express();

AuthRouter.post("/login", AuthController.login);

export default AuthRouter;
