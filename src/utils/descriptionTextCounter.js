// Truncate text to a specified word limit
export const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export const truncateCharacters = (text, characterLimit) => {
  if (text?.length > characterLimit) {
    return text?.slice(0, characterLimit) + "...";
  }
  return text;
};
