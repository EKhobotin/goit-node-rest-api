import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import gravatar from "gravatar";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET, BASE_URL } = process.env;
const avatarsDir = path.resolve("public", "avatars");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();
    const newUser = await authServices.signup({
      ...req.body,
      avatarURL,
      verificationCode,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">CLick to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.setToken(user._id, token);

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authServices.setToken(_id);

    res.json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};
const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    await authServices.setAvatar(_id, avatarURL);
    return res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
  getCurrent,
  signout,
  updateAvatar,
};
