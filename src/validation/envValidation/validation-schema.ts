import Joi from 'joi';

export const validationSchema = Joi.object({
  apiBaseUrl: Joi.string().uri().required(),
  apiBasePrefix: Joi.string().required(),
});
