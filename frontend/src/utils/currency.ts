const INR_EXCHANGE_RATE = 83.5;

export function toINR(usd: number): number {
  return Math.round(Number(usd) * INR_EXCHANGE_RATE);
}

export function formatINR(usd: number): string {
  const inr = toINR(usd);
  return `₹${inr.toLocaleString('en-IN')}`;
}
