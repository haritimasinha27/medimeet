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
        console.error("Failed to allocate credits:", error);
      }
    };

    allocateCredits();
  }, []);

  // This component doesn't render anything
  return null;
} 