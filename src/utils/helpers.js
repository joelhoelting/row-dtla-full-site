const parsePhone = int => {
  return int.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3');
};

const truncateText = (text, wordLimit) => {
  const textArray = text.split(' ');
  if (textArray.length < wordLimit) return text;
  let shortened = textArray.slice(0, wordLimit);
  return `${shortened.join(' ')}...`;
};

export { parsePhone, truncateText };
