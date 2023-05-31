export function truncateDecimalString(s: string, decimals = 3) {
  const hasDecimal = s.includes(".");
  if (hasDecimal) {
    const [wholePart, decimalPart] = s.split(".");
    if (decimalPart.length > 3) {
      return `${wholePart}.${decimalPart.slice(0, decimals)}`;
    }
  }
  return s;
}
