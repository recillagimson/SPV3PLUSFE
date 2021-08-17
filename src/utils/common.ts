export const parseToNumber = (val: any): any => {
  const amount = parseFloat(val);
  const isNumber = !isNaN(amount);

  if (isNumber) {
    return amount.toFixed(2);
  } else {
    return 0.0;
  }
};

export const numberWithCommas = (val: number | string) => {
  const n = typeof val === 'number' ? val.toString() : val;
  // Number will converted with fixed 2 decimal and converted to number with commas using toLocaleString and return it
  return Number(parseFloat(n).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
