import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "AI Co-Founder API Engine",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      features: {
        roadmapGenerator: "active",
        taskScheduler: "active",
        mockAdvisory: "active",
        llmBackend: process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY ? "configured" : "mock_mode",
      },
    },
    { status: 200 }
  );
}
