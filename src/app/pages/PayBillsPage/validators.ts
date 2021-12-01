/**
 * Form validators
 */

export const validateText = (text: string, value2?: string) => {
  if (text === '') {
    return { error: true, msg: 'Oops! This field is required.' };
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
  if (parseFloat(amount).toFixed(2) > parseFloat(balance).toFixed(2)) {
    return { error: true, msg: 'Oops! You do not have enough balance.' };
  }
  return { error: false, msg: '' };
};
