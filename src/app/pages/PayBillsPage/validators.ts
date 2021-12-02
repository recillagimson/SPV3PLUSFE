/**
 * Form validators
 */

export const validateText = (
  text: string,
  value2: string = '',
  count: number = 0,
  label: string = '',
) => {
  if (text === '') {
    return { error: true, msg: 'Oops! This field is required.' };
  }

  if (count > 0 && text) {
    if (text.length > count) {
      return { error: true, msg: `The ${label} must be ${count} digits.` };
    }
  }

  return { error: false, msg: '' };
};

export const validateAmount = (
  amount: string,
  balance: string,
): { error: boolean; msg: string } => {
  if (!amount) {
    return { error: true, msg: 'Oops! This field is required.' };
  }
  if (parseFloat(amount) === 0) {
    return { error: true, msg: 'Oops! Please enter an amount greater than 0' };
  }

  if (parseFloat(amount) > parseFloat(balance)) {
    return { error: true, msg: 'Oops! You do not have enough balance.' };
  }
  return { error: false, msg: '' };
};
