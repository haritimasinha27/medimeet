import { NextResponse } from "next/server";
import { testDatabaseConnection } from "@/lib/prisma";

export async function GET() {
  try {
    const dbConnected = await testDatabaseConnection();
    
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: dbConnected ? "connected" : "disconnected",
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
} 