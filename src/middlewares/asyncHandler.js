import { catchError } from '../utils/jsonResponse';

const asyncHandler = contoller => async (req, res, next) => {
  try {
    await contoller(req, res, next);
  } catch (err) {
    return catchError(err, res);
  }
};

export default asyncHandler;
