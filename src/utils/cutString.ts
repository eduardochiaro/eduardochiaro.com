const cutStrig = (str: string, length: number) => {
  // cut string at length by preserving words
  if (str.length > length) {
    const cut = str.substring(0, length);
    const lastSpace = cut.lastIndexOf(' ');
    return `${cut.substring(0, lastSpace)}...`;
  }
};

export default cutStrig;