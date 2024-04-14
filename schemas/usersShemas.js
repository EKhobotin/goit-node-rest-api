import Joi from "joi";

export const signupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const signinSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
