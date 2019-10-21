import * as StatusCodes from './statusCodes';

const jsonResponse = (status, data) => {
  return data.res.status(status).json({
    ...data,
    res: undefined
  });
};

export const success = data => {
  return jsonResponse(StatusCodes.OK, {
    status: 'success',
    ...data
  });
};

export const created = data => {
  return jsonResponse(StatusCodes.CREATED, {
    status: 'success',
    ...data
  });
};

export const noContent = () => {
  return jsonResponse(StatusCodes.NO_CONTENT, {
    status: 'success'
  });
};

export const badRequest = data => {
  return jsonResponse(StatusCodes.BAD_REQUEST, {
    status: 'failed',
    ...data
  });
};

export const conflict = data => {
  return jsonResponse(StatusCodes.CONFLICT, {
    status: 'failed',
    ...data
  });
};

export const unAuthorized = data => {
  return jsonResponse(StatusCodes.UNAUTHORIZED, {
    status: 'failed',
    ...data
  });
};

export const notFound = data => {
  return jsonResponse(StatusCodes.NOT_FOUND, {
    status: 'failed',
    ...data
  });
};

export const serverError = data => {
  return jsonResponse(StatusCodes.SERVER_ERROR, {
    status: 'failed',
    message: 'Server Error',
    ...data
  });
};

export const catchError = (error, req, res) => {
  const regex = /(\(.+\))=(\(.+\))/;
  let convertedkeys;

  if (error.detail) {
    let [, keys, values] = error.detail.match(regex);
    keys = keys.replace(/[()]/g, '').split(', ');
    values = values.replace(/[()]/g, '').split(', ');
    const requestArr = Object.values(req.body);
    const requestArr2 = Object.keys(req.body);
    values.forEach((value, index) => {
      keys[index] = requestArr2[requestArr.indexOf(value)];
    });
    convertedkeys = keys.join(', ').replace(/.+/, '($&)');
  }

  const isDuplicateKey = error.message.includes('duplicate key');
  if (isDuplicateKey) {
    return conflict({
      message: error.detail
        .replace(/^Key /, '')
        .replace(/(\(.+?\))/, convertedkeys),
      res
    });
  }

  const isForeignKeyErr = error.message.includes('violates foreign key');
  if (isForeignKeyErr) {
    return badRequest({
      message: error.detail
        .replace(/^Key /, '')
        .replace(/(is.+)/, 'does not exist')
        .replace(/(\(.+?\))/, convertedkeys),
      res
    });
  }

  return serverError({ res });
};
