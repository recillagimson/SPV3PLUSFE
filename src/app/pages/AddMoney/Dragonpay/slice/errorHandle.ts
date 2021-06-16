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
          const errorBody = err.response.json();
          if (
            errorBody &&
            errorBody.errors &&
            errorBody.errors.error_code &&
            errorBody.errors.error_code.length > 0
          ) {
            const i = errorBody.errors.error_code.findIndex(
              (j: number) => j === 405,
            );

            if (i !== -1) {
              error.message = errorBody.errors.message.join('\n');
            }
          } else {
            error.message = 'Transaction Failed';
          }
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
