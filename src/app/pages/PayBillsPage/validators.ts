/**
 * Form validators
 */

/**
 * Validate Text
 * @param text        Text value to validate
 * @param value2      optional value
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
 * @param value2      optional value
 * @param count       count length
 * @param label       field label
 * @returns {object}  returns { error: boolean, msg: string }
 */
export const validateDigits = (
  text: string,
  count: number = 0,
  label: string = '',
) => {
  if (text === '' || text.length === 0) {
    return { error: true, msg: 'Oops! This field is required.' };
  }

  if (text && !/^\d+$/.test(text)) {
    return { error: true, msg: `The ${label} must only contain numbers.` };
  }

  if (text && text.length < count) {
    return { error: true, msg: `The ${label} must be ${count} digits.` };
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
