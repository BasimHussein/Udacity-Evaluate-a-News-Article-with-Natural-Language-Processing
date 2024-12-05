// Validate if the URL is properly formed
const isValidUrl = (url) => {
  // Regular expression for validating a URL
  const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
  return regex.test(url);
};

export { isValidUrl };
