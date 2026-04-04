/**
 * XP Tier definitions shared across the app.
 * Import from here — NOT from app/(dna)/quick-swipe.tsx — to avoid
 * circular / route-group import issues.
 */

export const XP_TIERS = [
  { name: "Bronze",   min: 0,      max: 999,      color: "#CD7F32", gradient: ["#CD7F32", "#A0522D"] as [string, string] },
  { name: "Silver",   min: 1000,   max: 4999,     color: "#C0C0C0", gradient: ["#C0C0C0", "#A8A8A8"] as [string, string] },
  { name: "Gold",     min: 5000,   max: 14999,    color: "#FFD700", gradient: ["#FFD700", "#F59E0B"] as [string, string] },
  { name: "Platinum", min: 15000,  max: 49999,    color: "#E5E4E2", gradient: ["#E5E4E2", "#B8B8B8"] as [string, string] },
  { name: "Diamond",  min: 50000,  max: Infinity, color: "#B9F2FF", gradient: ["#B9F2FF", "#6443F4"] as [string, string] },
];

export type XPTier = (typeof XP_TIERS)[number];

export function getTierForXP(xp: number): XPTier {
  return XP_TIERS.find((t) => xp >= t.min && xp <= t.max) ?? XP_TIERS[0];
}
