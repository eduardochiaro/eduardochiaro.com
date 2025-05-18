const stripTags = (str: string) => {
  if (str === null || str === '') return str;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

export default stripTags;
