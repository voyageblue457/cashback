/**
 * Price Range & Fee Configuration Table.
 * Easily update or add new ranges here.
 * Each tier applies up to `maxAmount` (inclusive).
 */
export const FEE_TIERS = [
  { maxAmount: 20, fee: 2.30 },
  { maxAmount: 40, fee: 2.50 },
  { maxAmount: 50, fee: 2.80 },
  { maxAmount: 60, fee: 3.20 },
  { maxAmount: 70, fee: 3.50 },
  { maxAmount: 80, fee: 4.00 },
  { maxAmount: 90, fee: 4.50 },
  { maxAmount: 100, fee: 5.00 },
  { maxAmount: 110, fee: 5.40 },
  { maxAmount: 120, fee: 5.50 },
  { maxAmount: 130, fee: 5.60 },
  { maxAmount: 140, fee: 7.00 },
  { maxAmount: 150, fee: 7.10 },
  { maxAmount: 160, fee: 7.20 },
  { maxAmount: 170, fee: 7.50 },
  { maxAmount: 180, fee: 8.00 },
  { maxAmount: 200, fee: 9.50 },
  { maxAmount: 250, fee: 12.00 },
  { maxAmount: 300, fee: 14.00 },
  { maxAmount: 350, fee: 15.00 },
  { maxAmount: 400, fee: 16.00 },
  { maxAmount: 450, fee: 16.50 },
  { maxAmount: 500, fee: 17.50 },
];

/**
 * Calculates the internal total amount (selected amount + range fee)
 * @param {number|string} amount Selected base amount
 * @returns {number} Internal total amount
 */
export const getInternalAmount = (amount) => {
  if (amount === undefined || amount === null || amount === '') return 0;
  const amt = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
  if (isNaN(amt) || amt <= 0) return 0;

  // Find matching tier
  const tier = FEE_TIERS.find((t) => amt <= t.maxAmount);
  const fee = tier ? tier.fee : (FEE_TIERS[FEE_TIERS.length - 1]?.fee || 0);

  return Number((amt + fee).toFixed(2));
};

/**
 * Helper to get just the fee amount for a given base amount
 * @param {number|string} amount
 * @returns {number} Fee amount
 */
export const getFeeForAmount = (amount) => {
  const amt = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
  if (isNaN(amt) || amt <= 0) return 0;

  const tier = FEE_TIERS.find((t) => amt <= t.maxAmount);
  return tier ? tier.fee : (FEE_TIERS[FEE_TIERS.length - 1]?.fee || 0);
};
