export const formatNumber = (numberString, maxDecimalPlaces) => {
  if (parseFloat(numberString) === 0 || !parseFloat(numberString)) return "0.00";
  return parseFloat(numberString).toLocaleString("en-US", {
    maximumFractionDigits: maxDecimalPlaces,
  });
};
