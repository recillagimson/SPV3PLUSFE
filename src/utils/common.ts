export const parseToNumber = (val: any): any => {
  const amount = parseFloat(val);
  const isNumber = !isNaN(amount);

  if (isNumber) {
    return amount.toFixed(2);
  } else {
    return 0.0;
  }
};

export const numberWithCommas = (val: string) => {
  return parseToNumber(val)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
