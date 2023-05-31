export function truncateDecimalString(s: string) {
  const hasDecimal = s.includes(".");
  if (hasDecimal) {
    const [wholePart, decimalPart] = s.split(".");
    if (decimalPart.length > 3) {
      return `${wholePart}.${decimalPart.slice(0, 3)}`;
    }
  }
  return s;
}
