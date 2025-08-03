"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const CREDIT_VALUE = 10; // $10 per credit total
const PLATFORM_FEE_PER_CREDIT = 2; // $2 platform fee
const DOCTOR_EARNINGS_PER_CREDIT = 8; // $8 to doctor

/**
 * Request payout for all remaining credits
 */
export async function requestPayout(formData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    const paypalEmail = formData.get("paypalEmail");

    if (!paypalEmail) {
      return { success: false, error: "PayPal email is required" };
    }

    // Check if doctor has any pending payout requests
    const existingPendingPayout = await db.payout.findFirst({
      where: {
        doctorId: doctor.id,
        status: "PROCESSING",
      },
    });

    if (existingPendingPayout) {
      return { 
        success: false, 
        error: "You already have a pending payout request. Please wait for it to be processed." 
      };
    }

    // Get doctor's current credit balance
    const creditCount = doctor.credits;

    if (creditCount === 0) {
      return { success: false, error: "No credits available for payout" };
    }

    if (creditCount < 1) {
      return { success: false, error: "Minimum 1 credit required for payout" };
    }

    const totalAmount = creditCount * CREDIT_VALUE;
    const platformFee = creditCount * PLATFORM_FEE_PER_CREDIT;
    const netAmount = creditCount * DOCTOR_EARNINGS_PER_CREDIT;

    // Create payout request
    const payout = await db.payout.create({
      data: {
        doctorId: doctor.id,
        amount: totalAmount,
        credits: creditCount,
        platformFee,
        netAmount,
        paypalEmail,
        status: "PROCESSING",
      },
    });

    revalidatePath("/doctor");
    return { success: true, payout };
  } catch (error) {
    return { success: false, error: "Failed to request payout: " + error.message };
  }
}

/**
 * Get doctor's payout history
 */
export async function getDoctorPayouts() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    const payouts = await db.payout.findMany({
      where: {
        doctorId: doctor.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, payouts };
  } catch (error) {
    return { success: false, error: "Failed to fetch payouts: " + error.message };
  }
}

/**
 * Get doctor's earnings summary
 */
export async function getDoctorEarnings() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Get total credits earned by doctor (positive transactions)
    const totalCreditsEarned = await db.creditTransaction.aggregate({
      where: {
        userId: doctor.id,
        amount: {
          gt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Get total credits used for payouts
    const totalCreditsPayout = await db.payout.aggregate({
      where: {
        doctorId: doctor.id,
        status: {
          in: ["PROCESSED", "PROCESSING"],
        },
      },
      _sum: {
        credits: true,
      },
    });

    const totalEarned = totalCreditsEarned._sum.amount || 0;
    const totalPayout = totalCreditsPayout._sum.credits || 0;
    const availableCredits = doctor.credits;
    const totalEarnings = totalEarned * DOCTOR_EARNINGS_PER_CREDIT;
    const totalPayoutAmount = totalPayout * DOCTOR_EARNINGS_PER_CREDIT;
    const availableEarnings = availableCredits * DOCTOR_EARNINGS_PER_CREDIT;

    return {
      success: true,
      earnings: {
        totalEarned,
        totalPayout,
        availableCredits,
        totalEarnings,
        totalPayoutAmount,
        availableEarnings,
      },
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch earnings: " + error.message };
  }
}
