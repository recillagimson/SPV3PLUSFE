export const parseToNumber = (val: any): any => {
  const amount = parseFloat(val);
  const isNumber = !isNaN(amount);

  if (isNumber) {
    return amount.toFixed(2);
  } else {
    return 0;
  }
};

export const numberWithCommas = (val: Number) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
