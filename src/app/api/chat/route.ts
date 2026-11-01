import { NextResponse } from "next/server";

interface ChatRequest {
  message?: unknown;
  agentId?: unknown;
  projectName?: unknown;
  targetMarket?: unknown;
  stage?: unknown;
  systemPrompt?: unknown;
  aiCloneRules?: unknown;
}

function getAgentPersona(agentId: string): { name: string; role: string; focus: string } {
  switch (agentId) {
    case "scout-validation":
      return {
        name: "Scout",
        role: "Customer Discovery & Mom Test Lead",
        focus: "Extracting unbiased behavioral evidence, testing willingness-to-pay, and preventing building without validation.",
      };
    case "pulse-growth":
      return {
        name: "Pulse",
        role: "Head of Growth & Outbound",
        focus: "High-converting zero-pitch outbound angles, distribution channels, cold outreach, and organic waitlist growth.",
      };
    case "nexus-product":
      return {
        name: "Nexus",
        role: "Technical Architect & Ruthless Scope Cutter",
        focus: "Stripping non-essential features, isolating the single core atomic loop, and compressing time-to-first-value to <60s.",
      };
    default:
      return {
        name: "Alex Vanguard",
        role: "Chief of Staff & Strategy Co-Founder",
        focus: "90-day milestone execution, clearing operational bottlenecks, and prioritizing daily sprint velocity.",
      };
  }
}

async function callGemini(apiKey: string, prompt: string, systemInstruction: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch {
    return null;
  }
}

async function callOpenAI(apiKey: string, prompt: string, systemInstruction: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

async function callAnthropic(apiKey: string, prompt: string, systemInstruction: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        system: systemInstruction,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    return NextResponse.json({ error: "A non-empty message is required." }, { status: 400 });
  }

  const userQuery = body.message.trim();
  const agentId = typeof body.agentId === "string" ? body.agentId : "vanguard-strategy";
  const persona = getAgentPersona(agentId);
  const projectName = typeof body.projectName === "string" && body.projectName.trim() ? body.projectName.trim() : "your startup";
  const targetMarket = typeof body.targetMarket === "string" && body.targetMarket.trim() ? body.targetMarket.trim() : "early adopters";
  const stage = typeof body.stage === "string" ? body.stage : "validation";

  const systemInstruction = `You are ${persona.name}, ${persona.role} for ${projectName}.
Focus: ${persona.focus}
Target Market: ${targetMarket} (Stage: ${stage}).
Style Guidelines:
- Direct, concise, zero corporate jargon, actionable.
- Prioritize real user validation, willingness-to-pay, and ruthless scope cut.
- Never give generic advice; tailor strictly to ${projectName}.`;

  // 1. Check for live API keys
  let llmResponse: string | null = null;
  let providerUsed = "local_heuristic";

  if (process.env.GEMINI_API_KEY) {
    llmResponse = await callGemini(process.env.GEMINI_API_KEY, userQuery, systemInstruction);
    if (llmResponse) providerUsed = "gemini";
  } else if (process.env.OPENAI_API_KEY) {
    llmResponse = await callOpenAI(process.env.OPENAI_API_KEY, userQuery, systemInstruction);
    if (llmResponse) providerUsed = "openai";
  } else if (process.env.ANTHROPIC_API_KEY) {
    llmResponse = await callAnthropic(process.env.ANTHROPIC_API_KEY, userQuery, systemInstruction);
    if (llmResponse) providerUsed = "anthropic";
  }

  // 2. Fallback to specialized strategic synthesis if no API keys or call failed
  if (!llmResponse) {
    if (persona.name === "Scout") {
      llmResponse = `[Scout • Customer Discovery Analysis]\n\nRegarding "${userQuery}" for ${projectName}:\n\n1. **The Mom Test Filter**: Do not ask ${targetMarket} if they want this feature. Ask: *"When was the last time this exact bottleneck cost you money or engineering hours?"*\n2. **Willingness-to-Pay Benchmark**: If they haven't tried to patch this with an ugly workaround (spreadsheets, Zapier, manual agency) in the last 60 days, they will not pay for software.\n3. **Immediate Action**: Book 3 discovery calls this week. Offer zero slides; spend 80% of the call asking about their existing workflow.`;
    } else if (persona.name === "Pulse") {
      llmResponse = `[Pulse • Outbound & Growth Hook]\n\nFor ${projectName} targeting ${targetMarket}:\n\nHere is the highest-converting angle for "${userQuery}":\n\n• **Subject**: Quick question on how your team manages ${targetMarket.split(" ")[0] || "workflows"}\n• **Copy**: "Hey {Name} — saw you lead operations at {Company}. We're assembling a benchmark on how Series A/B teams handle this pain point. Not pitching anything—just doing 15-minute perspective calls with 5 leaders this week. Open to a brief chat?"\n\nThis simple zero-pitch angle converts cold leads at 28–34% without triggering sales resistance.`;
    } else if (persona.name === "Nexus") {
      llmResponse = `[Nexus • Technical Architecture & Scope Cut]\n\nAnalyzing technical execution for "${userQuery}":\n\n1. **The MVP Scope Cut**: Remove any team permission logic, custom notification toggles, or secondary dashboards. You only need the single atomic input-to-output loop.\n2. **Time-to-Value Target**: A new user from ${targetMarket} must experience the core 'aha' moment within 60 seconds of signing up.\n3. **Rule**: Every line of code written before customer payment is liability. Build strictly what validates willingness-to-pay.`;
    } else {
      llmResponse = `[Alex Vanguard • Strategic Sprint Triage]\n\nReviewing strategic priority for "${userQuery}" in ${projectName} (${stage} stage):\n\n• **Current Sprint Objective**: Validate the core value proposition with real paying design partners.\n• **Immediate Priority**: Finish active sprint deliverables before branching into new feature ideas.\n• **Next Move**: Convert your latest discovery insights into one concrete deliverable in your 90-day roadmap today.`;
    }
  }

  return NextResponse.json({
    mode: providerUsed,
    agent: persona.name,
    message: llmResponse,
  });
}
