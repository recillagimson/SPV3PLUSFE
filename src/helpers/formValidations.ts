/**
 * Form Validations
 * Enter your form field validations here
 * NOTE: start your function name with validate ie: validateEmailOrMobile()
 */

import {
  regExEmail,
  regExIsGonnaBeEmail,
  regExMobile,
} from 'app/components/Helpers';

export type PasswordValidationErrorCodes = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

/**
 * Validate if the entered value is email or mobile
 * @param {string}    value
 * @returns {error: boolean, msg: string} or false
 */
export function validateEmailOrMobile(value: string) {
  if (value !== '') {
    if (/\s/.test(value) && regExIsGonnaBeEmail.test(value)) {
      return {
        error: true,
        msg: 'The email must be a valid email address.',
      };
    }

    if (
      /\s/.test(value) ||
      value.length < 5 ||
      (/[A-Za-z0-9]/.test(value) &&
        !regExIsGonnaBeEmail.test(value) &&
        !/^0(9)\d/.test(value))
    ) {
      return {
        error: true,
        msg: 'Invalid email address or mobile number.',
      };
    }

    if (regExIsGonnaBeEmail.test(value) && !regExEmail.test(value)) {
      return {
        error: true,
        msg: 'The email must be a valid email address.',
      };
    }

    if (regExIsGonnaBeEmail.test(value) && !regExEmail.test(value)) {
      return {
        error: true,
        msg: 'The email must be a valid email address.',
      };
    }

    if (
      /^[0-9]*$/.test(value) &&
      value.length <= 5 &&
      /^0(9)\d/.test(value) &&
      !regExIsGonnaBeEmail.test(value)
    ) {
      return {
        error: true,
        msg:
          'The mobile number is invalid. Use the format 09 + 9 digit mobile number.',
      };
    }
    if (
      /^[0-9]*$/.test(value) &&
      value.length > 5 &&
      !regExIsGonnaBeEmail.test(value) &&
      !regExMobile.test(value)
    ) {
      return {
        error: true,
        msg:
          'The mobile number is invalid. Use the format 09 + 9 digit mobile number.',
      };
    }
    if (regExEmail.test(value) && value.length > 50) {
      return {
        error: true,
        msg: 'The email must not be greater than 50 characters.',
      };
    }
    if (/^[0-9]*$/.test(value) && /^0(9)\d/.test(value) && value.length > 11) {
      return {
        error: true,
        msg: 'The mobile number must not be greater than 11 characters.',
      };
    }

    return {
      error: false,
      msg: '',
    };
  }

  return {
    error: false,
    msg: '',
  };
}

/**
 * Validate Password
 * @param {string}   value
 * @returns { error: boolean, msg: string, errors: array}
 */
export function validatePassword(value: string) {
  let errorCodes = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let msg = '';
  if (value !== '') {
    errorCodes[1] = value.length >= 8 ? 1 : value.length < 8 ? 2 : 0;
    errorCodes[2] = /(?=.*\d)/.test(value)
      ? 1
      : !/(?=.*\d)/.test(value)
      ? 2
      : 0;
    errorCodes[3] = /(?=.*[A-Z])/.test(value)
      ? 1
      : !/(?=.*[A-Z])/.test(value)
      ? 2
      : 0;
    errorCodes[4] = /(?=.*[a-z])/.test(value)
      ? 1
      : !/(?=.*[a-z])/.test(value)
      ? 2
      : 0;
    errorCodes[5] = /[^A-Za-z0-9]/.test(value)
      ? 1
      : !/[^A-Za-z0-9]/.test(value)
      ? 2
      : 0;
    // errorCodes[5] = /(?=.*[@$!%*#?&_])/.test(value)
    //   ? 1
    //   : !/(?=.*[@$!%*#?&_])/.test(value)
    //   ? 2
    //   : 0;
    // errorCodes[5] =
    //   value.length >= 8 && value.length <= 20 ? 1 : value.length > 20 ? 2 : 0;

    if (errorCodes[1] === 2 && msg === '') {
      msg = 'The password must be at least 8 characters';
    }
    if (errorCodes[2] === 2 && msg === '') {
      msg = 'The password must have at least one number.';
    }
    if (errorCodes[3] === 2 && msg === '') {
      msg = 'The password must have at least one uppercase.';
    }
    if (errorCodes[4] === 2 && msg === '') {
      msg = 'The password must have at least one lowercase.';
    }
    if (errorCodes[5] === 2 && msg === '') {
      msg = 'The password must have at least one special character.';
    }

    // If we have an error
    return {
      error: msg !== '',
      msg: msg,
      errorCodes: errorCodes as PasswordValidationErrorCodes,
    };
  }

  // default return value
  return {
    error: false,
    msg: '',
    errorCodes: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    } as PasswordValidationErrorCodes,
  };
}
