import Joi from 'joi';

export const create = Joi.object({
});

export const update = Joi.object({
});

export const deleteQuery = Joi.object({
  hard: Joi.bool(),
});

export const paramIdQuery = Joi.object({
  id: Joi.string(),
});

export const getQuery = Joi.object({
  search: Joi.string(),
});
