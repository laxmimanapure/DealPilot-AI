/**
 * Currency formatting utilities for INR ₹
 */
export function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function calculateSavingsPercent(original, current) {
  if (!original || original <= 0 || current >= original) return 0;
  return Math.round(((original - current) / original) * 100);
}
