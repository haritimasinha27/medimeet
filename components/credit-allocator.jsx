"use client";

import { useEffect } from "react";
import { allocateCreditsIfNeeded } from "@/actions/credits";

export default function CreditAllocator() {
  useEffect(() => {
    // Allocate credits when component mounts (client-side)
    const allocateCredits = async () => {
      try {
        await allocateCreditsIfNeeded();
      } catch (error) {
        // Silent error handling - no console output
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      allocateCredits();
    }
  }, []);

  // This component doesn't render anything
  return null;
} 