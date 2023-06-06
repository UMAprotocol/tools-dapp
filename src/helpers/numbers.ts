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

// random number between two values
export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
