import Joi from "joi";

export const userSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
