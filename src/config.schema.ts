import * as Joi from '@hapi/joi';

export const configurationValidation = Joi.object({
  STAGE: Joi.string().required(),
  DB_PORT: Joi.string().default('5000').required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().default(3000),
});
