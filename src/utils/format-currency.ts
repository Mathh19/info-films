export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-Us', {
    style: 'currency',
    currency: 'USD',
  });
};
