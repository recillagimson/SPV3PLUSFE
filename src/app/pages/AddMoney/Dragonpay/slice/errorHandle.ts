import { ErrorState } from './types';

export function errorHandler(err: any): ErrorState {
  const error = {
    error: 400,
    message: 'Something went wrong',
  };

  try {
    if (err && err.response && err.response.status) {
      switch (err.response.status) {
        case 401:
          error.error = 401;
          error.message = 'Unauthorized Account';
          return error;
        case 422:
          error.error = 422;
          error.message = 'Transaction Failed';
          return error;
        default:
          return error;
      }
    } else {
      return error;
    }
  } catch (err) {
    return error;
  }
}
