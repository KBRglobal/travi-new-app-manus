import { describe, it, expect, vi, beforeEach } from "vitest";
import { pointsToUsd, usdToPoints } from "../lib/engines/points-engine";

/**
 * Wallet logic unit tests.
 *
 * These tests exercise the pure wallet calculation logic without requiring
 * a live database connection. The wallet balance computation rule from db.ts:
 *   - "credit" and "refund" transactions are POSITIVE (add to balance)
 *   - "debit" and "commission" transactions are NEGATIVE (subtract from balance)
 */

// ─── Wallet balance computation ────────────────────────────────────────────

type TxType = "credit" | "debit" | "refund" | "commission";

interface WalletTransaction {
  id: number;
  userId: string;
  amount: number; // in cents
  currency: string;
  type: TxType;
  description?: string;
  createdAt: Date;
}

/**
 * Pure function that mirrors the balance computation in server/db.ts
 * getWalletBalance helper.
 */
function computeBalance(transactions: WalletTransaction[]): { balance: number; transactions: WalletTransaction[] } {
  const balance = transactions.reduce((sum, tx) => {
    if (tx.type === "credit" || tx.type === "refund") {
      return sum + tx.amount;
    }
    return sum - tx.amount;
  }, 0);
  return { balance, transactions };
}

describe("Wallet balance computation", () => {
  it("empty transactions returns 0 balance", () => {
    const { balance } = computeBalance([]);
    expect(balance).toBe(0);
  });

  it("single credit transaction returns positive balance", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 10000, currency: "USD", type: "credit", createdAt: new Date() },
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(10000);
  });

  it("single debit transaction returns negative balance", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 5000, currency: "USD", type: "debit", createdAt: new Date() },
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(-5000);
  });

  it("credit then debit returns correct net balance", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 20000, currency: "USD", type: "credit", createdAt: new Date() },
      { id: 2, userId: "u1", amount: 7500, currency: "USD", type: "debit", createdAt: new Date() },
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(12500);
  });

  it("refund is treated as positive (adds to balance)", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 10000, currency: "USD", type: "credit", createdAt: new Date() },
      { id: 2, userId: "u1", amount: 10000, currency: "USD", type: "debit", createdAt: new Date() },
      { id: 3, userId: "u1", amount: 5000, currency: "USD", type: "refund", createdAt: new Date() },
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(5000);
  });

  it("commission is treated as negative (subtracts from balance)", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 50000, currency: "USD", type: "credit", createdAt: new Date() },
      { id: 2, userId: "u1", amount: 2500, currency: "USD", type: "commission", createdAt: new Date() },
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(47500);
  });

  it("multiple mixed transactions compute correctly", () => {
    const txs: WalletTransaction[] = [
      { id: 1, userId: "u1", amount: 100000, currency: "USD", type: "credit", createdAt: new Date() },  // +100000
      { id: 2, userId: "u1", amount: 30000, currency: "USD", type: "debit", createdAt: new Date() },    // -30000
      { id: 3, userId: "u1", amount: 5000, currency: "USD", type: "commission", createdAt: new Date() }, // -5000
      { id: 4, userId: "u1", amount: 10000, currency: "USD", type: "refund", createdAt: new Date() },   // +10000
      { id: 5, userId: "u1", amount: 20000, currency: "USD", type: "debit", createdAt: new Date() },    // -20000
    ];
    const { balance } = computeBalance(txs);
    expect(balance).toBe(55000);
  });
});

// ─── Insufficient balance guard ────────────────────────────────────────────

describe("Wallet insufficient balance guard", () => {
  /**
   * Mirrors the wallet.redeem logic in server/routers.ts:
   * if (balance < amount) throw new Error("Insufficient balance")
   */
  function redeemPoints(balance: number, requestedAmount: number): { success: boolean; error?: string } {
    if (balance < requestedAmount) {
      return { success: false, error: "Insufficient balance" };
    }
    return { success: true };
  }

  it("allows redemption when balance is sufficient", () => {
    const result = redeemPoints(5000, 3000);
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("allows redemption when balance equals requested amount", () => {
    const result = redeemPoints(3000, 3000);
    expect(result.success).toBe(true);
  });

  it("rejects redemption when balance is insufficient", () => {
    const result = redeemPoints(1000, 3000);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Insufficient balance");
  });

  it("rejects redemption when balance is 0", () => {
    const result = redeemPoints(0, 1);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Insufficient balance");
  });
});

// ─── Points ↔ USD conversion in wallet context ────────────────────────────

describe("Wallet points-to-USD conversion", () => {
  it("1000 TRAVI points = $1 USD wallet credit", () => {
    const points = 1000;
    const usd = pointsToUsd(points);
    expect(usd).toBe(1);
  });

  it("$50 booking = 50000 points at level 1 (1x multiplier)", () => {
    // At level 1, calculateBookingPoints(50, 0) = 50 * 1 = 50 points
    // But usdToPoints($50) = 50000 points (direct conversion)
    expect(usdToPoints(50)).toBe(50000);
  });

  it("points and USD conversion is consistent", () => {
    const originalUsd = 25;
    const points = usdToPoints(originalUsd);
    const backToUsd = pointsToUsd(points);
    expect(backToUsd).toBe(originalUsd);
  });

  it("large amounts convert correctly", () => {
    // $1000 booking
    expect(usdToPoints(1000)).toBe(1000000);
    expect(pointsToUsd(1000000)).toBe(1000);
  });
});
