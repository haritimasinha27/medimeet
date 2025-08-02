"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ClerkDebug() {
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      console.log("Clerk Debug:", {
        isSignedIn,
        isLoaded,
        userId,
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "Set" : "Not Set",
      });
    }
  }, [isSignedIn, isLoaded, userId]);

  return null;
} 