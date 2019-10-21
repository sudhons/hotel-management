import { catchError } from '../utils/jsonResponse';

const asyncHandler = contoller => async (req, res, next) => {
  try {
    await contoller(req, res, next);
  } catch (err) {
    console.log(err.message);
    console.log(err.detail);
    return catchError(err, req, res);
  }
};

export default asyncHandler;
