/**
 * Form Validations
 * Enter your form field validations here
 * NOTE: start your function name with validate ie: validateEmailOrMobile()
 */

import {
  regExEmail,
  regExIsGonnaBeMobile,
  regExIsGonnaBeEmail,
  regExMobile,
} from 'app/components/Helpers';

/**
 * Validate if the entered value is email or mobile
 * @param {string}    value
 * @returns {error: boolean, msg: string} or false
 */
export function validateEmailOrMobile(value: string) {
  if (value !== '') {
    console.log(/^([0-9]|[a-z])+([0-9a-z]+)$/.test(value));
    if (/\s/.test(value)) {
      return {
        error: true,
        msg: 'Invalid email address or mobile number',
      };
      // first remove the spaces and check if it is all numbers
      // if (!isNaN(value.replace(' ', ''))) {
      //   console.log('it is a number');
      // }
      // if (!parseInt(value.replace(' ', ''))) {
      //   console.log('it is alphanumeric');
      // }
    }

    // console.log(value.match(/^[a-zA-Z0-9]*$/));
    // if (/^[a-zA-Z0-9]*$/.test(value) && !/\s/.test(value)) {
    //   console.log('alpha numeric without spaces');
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }
    // // any character that doesn't contain any spaces
    // if (!/\s/.test(value)) {
    //   console.log('no spaces');
    //   return {
    //     error: true,
    //     msg: 'Invalid email address or mobile number',
    //   };
    // }

    // // if a valid email and length is more than 50 characters
    // if (regExEmail.test(value.toLowerCase()) && value.length > 50) {
    //   return {
    //     error: true,
    //     msg: 'The email must not be greater than 50 characters.',
    //   };
    // }

    // // if it is not an email, check if mobile
    // if (!regExMobile.test(value.toLowerCase())) {
    //   return {
    //     error: true,
    //     msg:
    //       'The mobile number is invalid. Use the format 09 + 9 digit mobile number.',
    //   };
    // }

    // // value is going to be in email format but incomplete
    // if (
    //   regExIsGonnaBeEmail.test(value.toLowerCase()) &&
    //   !regExEmail.test(value.toLowerCase())
    // ) {
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }
    // // value is in email format but with spaces
    // if (regExEmail.test(value.toLowerCase()) && /\s/.test(value)) {
    //   console.log('email with spaces');
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }

    // check if we are typing a value that is supposed to be an email
    // if (
    //   !/\d/g.test(value) &&
    //   /\s/.test(value) // check if there are no spaces
    // ) {
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }
    // // check if we are typing into an email format ie: asb@
    // if (regExIsGonnaBeEmail.test(value)) {
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }
    // if (regExEmail.test(String(value).toLowerCase()) && /\s/.test(value)) {
    //   return {
    //     error: true,
    //     msg: 'The email must be a valid email address.',
    //   };
    // }

    // // check if we are not typing an email and value starts with a digit
    // if (
    //   !regExIsGonnaBeEmail.test(value) && // check if we are not typing into an email format
    //   !regExEmail.test(String(value).toLowerCase()) // validate if it's not valid email
    // ) {
    //   if (!regExMobile.test(value) && value.length > 11) {
    //     return {
    //       error: true,
    //       msg: 'The mobile number must not be greater than 11 characters.',
    //     };
    //   }
    //   // we have typed a digit and did not pass the email validation
    //   // now check if it's in valid mobile format ie: 09 + 9 digit number
    //   if (!regExMobile.test(value) && value.length <= 11 && /\d/g.test(value)) {
    //     return {
    //       error: true,
    //       msg:
    //         'The mobile number is invalid. Use the format 09 + 9 digit mobile number.',
    //     };
    //   }
    // }
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
