import express from "express";
import authControllers from "../controllers/authControllers.js";
import authtenticate from "../middliware/authenticate.js";

const authRouter = express.Router();

const { signup, signin, getCurrent, signout } = authControllers;

authRouter.post("/register", signup);
authRouter.post("/login", signin);
authRouter.get("/current", authtenticate, getCurrent);
authRouter.post("/logout", authtenticate, signout);

export default authRouter;
