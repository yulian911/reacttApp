export const checkNumbers = (value: string) => {
  const quantityTest = /^[0-9]{1,2}([,.][0-9]{1,2})?$/;

  if (value.length === 0) return false;

  return !quantityTest.test(value);
};
