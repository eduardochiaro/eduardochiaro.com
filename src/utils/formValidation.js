
const isFormValid = (form, elements = []) => {
  return !elements.some((x) => form[x] == '');
};

const findInvalidElement = (form, elements = []) => {
  return elements.filter((x) => form[x] == '');
};

export { isFormValid, findInvalidElement }