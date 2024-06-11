import Joi from "joi";

export const create = Joi.object({
  task: Joi.string(),
  duration: Joi.string(),
});

export const update = Joi.object({
  task: Joi.string(),
  duration: Joi.string(),
});

export const deleteQuery = Joi.object({
  hard: Joi.bool(),
});

export const paramIdQuery = Joi.object({
  id: Joi.string(),
});

export const getQuery = Joi.object({
  search: Joi.string(),
  active: Joi.string(),
});
