import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid("min", "medium", "max"),
  dueDate: Joi.date(),
  taskComments: Joi.array().items(Joi.string()),
});
