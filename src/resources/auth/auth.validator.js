import Validate from '../../validator';

export const registerSchema = {
  firstName: Validate.validate()
    .string()
    .alpha()
    .maxLen(20)
    .minLen(3)
    .required(),

  lastName: Validate.validate()
    .string()
    .alpha()
    .maxLen(20)
    .minLen(3)
    .required(),

  email: Validate.validate()
    .string()
    .email()
    .maxLen(50)
    .required(),

  password: Validate.validate()
    .string()
    .maxLen(50)
    .required()
};

export const loginSchema = {
  email: Validate.validate()
    .string()
    .email()
    .maxLen(50)
    .required(),

  password: Validate.validate()
    .string()
    .maxLen(50)
    .required()
};
