// Tier discount percentages
export const TIER_DISCOUNT = {
  bronze: 5,
  silver: 10,
  gold: 15,
  platinum: 20,
}

// Points thresholds for each tier (cumulative)
export const TIER_THRESHOLDS = {
  bronze: { min: 0, max: 499 },
  silver: { min: 500, max: 1499 },
  gold: { min: 1500, max: 2999 },
  platinum: { min: 3000, max: Infinity },
}

// 1 point per this amount spent (on total_final)
export const POINTS_PER_AMOUNT = 10000

// Calculate discount based on tier and original total
export function calculateDiscount(totalOriginal, tier) {
  const percent = TIER_DISCOUNT[tier] || 0
  return totalOriginal * (percent / 100)
}

// Calculate points earned from final total
export function calculatePoints(totalFinal) {
  return Math.floor(totalFinal / POINTS_PER_AMOUNT)
}

// Get next tier info for progress display
export function getNextTier(currentTier, currentPoints) {
  const tierOrder = ['bronze', 'silver', 'gold', 'platinum']
  const idx = tierOrder.indexOf(currentTier)
  if (idx === tierOrder.length - 1) return null // already platinum

  const nextTier = tierOrder[idx + 1]
  const pointsNeeded = TIER_THRESHOLDS[nextTier].min - currentPoints
  return { nextTier, pointsNeeded }
}
