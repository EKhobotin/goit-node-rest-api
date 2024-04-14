import express from "express";
import authControllers from "../controllers/authControllers.js";
import authtenticate from "../middliware/authenticate.js";
import upload from "../middliware/upload.js";
const authRouter = express.Router();

const { signup, signin, getCurrent, signout, updateAvatar } = authControllers;

authRouter.post("/register", signup);
authRouter.post("/login", signin);
authRouter.get("/current", authtenticate, getCurrent);
authRouter.post("/logout", authtenticate, signout);
authRouter.patch(
  "/avatar",
  authtenticate,
  upload.single("avatarURL"),
  updateAvatar
);

export default authRouter;
