/**
 * Form validators
 */

/**
 * Validate Text
 * @param text        Text value to validate
 * @param count       count length
 * @param label       field label
 * @returns {object}  returns { error: boolean, msg: string }
 */
export const validateText = (
  text: string,
  count: number = 0,
  label: string = '',
) => {
  if (text === '') {
    return { error: true, msg: 'Oops! This field is required.' };
  }

  if (count && count > 0 && text) {
    if (text.length > count) {
      return { error: true, msg: `The ${label} must not exceed ${count}.` };
    }
  }

  return { error: false, msg: '' };
};

/**
 * Validate string if it is all digits and doesn't exceed the count length
 * @param text        Text value to validate
 * @param min         minimum count length
 * @param max         max length
 * @param label       field label
 * @returns {object}  returns { error: boolean, msg: string }
 */
export const validateDigits = (
  text: any,
  min: number = 0,
  max: number = 0,
  label: string = '',
) => {
  console.log(text);
  if (text === '' || text.length === 0) {
    return { error: true, msg: 'Oops! This field is required.' };
  }

  if (text && isNaN(text)) {
    return { error: true, msg: `The ${label} must only contain numbers.` };
  }

  if (text && min && text.length < min) {
    return { error: true, msg: `The ${label} must be ${min} digits.` };
  }

  if (text && max && text.length > max) {
    return { error: true, msg: `The ${label} must not exceed ${max} digits.` };
  }

  return { error: false, msg: '' };
};

/**
 * Validate the value from the provided regular expression
 *
 * @param value Input field value
 * @param regex Regex pattern to test the value
 * @param placeholder what the value should look like
 * @returns
 */
export const validatePattern = (
  value: string,
  regex: RegExp,
  placeholder: string = '',
) => {
  if (regex) {
    if (!value) {
      return { error: true, msg: 'Oops! This field is required.' };
    }

    if (value && !regex.test(value)) {
      console.log('failed');
      return {
        error: true,
        msg: `Please enter value in this format ${placeholder}`,
      };
    }
  }

  return { error: false, msg: '' };
};

/**
 * Validate Amount
 * @param amount      amount field to validate
 * @param balance     check user balance
 * @param min         minimum amount to enter
 * @param max         maximum amount to enter
 * @returns {object}  returns { error: boolean, msg: string }
 */
export const validateAmount = (
  amount: string,
  balance: string,
  min?: string | number,
  max?: string | number,
): { error: boolean; msg: string } => {
  if (!amount) {
    return { error: true, msg: 'Oops! This field is required.' };
  }

  if (parseFloat(amount) > parseFloat(balance)) {
    return { error: true, msg: 'Oops! You do not have enough balance.' };
  }

  if (min && parseFloat(amount) < min) {
    return { error: true, msg: `Oops! The minimum amount is ${min}.00` };
  }

  if (max && parseFloat(amount) > max) {
    return { error: true, msg: `Oops! The maximum amount is ${max}.00` };
  }

  return { error: false, msg: '' };
};
