import { validate } from '../validator';
import { badRequest } from '../utils/jsonResponse';

export const validatorHandler = schema => (req, res, next) => {
  try {
    validate(req.body, schema);
    return next();
  } catch (error) {
    const err = error.map(val => val[Object.keys(val)[0]][0]);
    return badRequest({
      messages: err,
      res
    });
  }
};
