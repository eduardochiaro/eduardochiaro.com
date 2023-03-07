const isFormValid = (form:any, elements: string[] = []) => {
  return !elements.some((x) => form[x] == '');
};

const findInvalidElement = (form:any, elements: string[] = []) => {
  return elements.filter((x) => form[x] == '');
};

export { isFormValid, findInvalidElement };
