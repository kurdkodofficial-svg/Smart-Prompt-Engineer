import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = 3000;

const SYSTEM_PROMPT_ENGINEER = `You are an expert prompt engineer. Your job is to take a user's rough, casual, or incomplete request and turn it into a professional, ready-to-use prompt for any AI tool (text generation, image generation, video generation, code, data analysis, etc).
Before writing the final prompt, if the request is missing important details, briefly ask the user about:
Target tool — which AI tool this prompt will run on (e.g. ChatGPT for writing, Midjourney for images, Claude for code, Runway for video). Different tools respond to different prompt structures.
End goal — what happens to the output, who sees it, and why it matters
Constraints — length, tone, language, audience, anything explicitly forbidden or required
If the user doesn't know the answer to one of these, suggest a sensible default and keep moving instead of stalling the conversation.

Then write one final prompt that includes:
Role — who or what expertise the AI should adopt
Context — the background information needed for an accurate response
Task — exactly what needs to be done, stated clearly and directly
Format — length, structure, whether it should use bullets, paragraphs, a table, etc.
Constraints — explicit exclusions (e.g. no clichés, no long intros, no filler)
Example — if the request is complex, include a short example that illustrates the style wanted
Success criteria — one line on what a good output looks like, so the target AI can self-check

Write the prompt in the language appropriate for the target tool (English for most image/video tools and technical coding tools, or match the user's language for text tools). Do not add long explanations before or after — return the prompt ready to copy-paste. You may add one short line explaining a key choice only if it adds real value.
If the user asks for a revision to a previous prompt, edit it directly instead of rewriting from scratch.
Never write a prompt that is vague enough to produce generic, interchangeable output; every prompt should be specific enough that two different people using it would get noticeably different results based on their actual input.`;

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function callGemini(params: {
  contents: any;
  config?: any;
}): Promise<any> {
  const models = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any;

  for (const model of models) {
    try {
      const ai = getAI();
      return await ai.models.generateContent({
        ...params,
        model,
      });
    } catch (err: any) {
      lastError = err;
      const isTransientOrQuota =
        err?.message?.includes("503") ||
        err?.message?.includes("429") ||
        err?.message?.includes("UNAVAILABLE") ||
        err?.message?.includes("high demand") ||
        err?.message?.includes("resource_exhausted") ||
        err?.message?.includes("RESOURCE_EXHAUSTED") ||
        err?.message?.includes("Quota exceeded") ||
        err?.status === 503 ||
        err?.status === 429;
      if (isTransientOrQuota) {
        console.warn(`Model ${model} returned load/quota limitation (${err?.message?.slice(0, 100)}...), failing over to alternative model...`);
        await new Promise((res) => setTimeout(res, 400));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // Health check & Keep-Alive anti-pause endpoint
  app.get(["/api/health", "/api/ping"], (_req, res) => {
    res.json({
      status: "ok",
      service: "Smart Prompt Engineer",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      keepAlive: true,
      message: "Server is warm and active (Anti-pause keep-alive active)",
    });
  });

  // Generate / Craft Prompt API
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const {
        roughRequest,
        targetTool,
        endGoal,
        constraints,
        language = "auto",
        autoDefault = false,
        conversationHistory = [],
      } = req.body;

      if (!roughRequest || typeof roughRequest !== "string" || !roughRequest.trim()) {
        return res.status(400).json({ error: "Rough request is required." });
      }

      const ai = getAI();

      const languageDescriptions: Record<string, string> = {
        en: "English (Primary language). Ask clarifying questions and output in English.",
        ku_ckb: "Kurdish - Central Sorani dialect (کوردیی ناوەندی / سۆرانی). Formulate clarifying questions and notes in authentic Sorani Kurdish.",
        ku_bad: "Kurdish - Badini / Behdini dialect (کوردیی بادینی / بەهدینی). Formulate clarifying questions and notes in authentic Badini Kurdish.",
        ku_kmr: "Kurdish - Kurmanji dialect in Latin script (Kurdî Kurmancî). Formulate clarifying questions and notes in Kurmanji.",
        ku_hwr: "Kurdish - Hawrami / Gorani dialect (کوردیی هەورامی). Formulate clarifying questions and notes in Hawrami Kurdish.",
        ar: "Arabic (اللغة العربية). Formulate clarifying questions and notes in professional Modern Standard Arabic.",
      };

      const targetLanguageInstruction = languageDescriptions[language] || language;

      // Formulate detailed instruction
      const promptInstruction = `
User Rough Request:
"""
${roughRequest.trim()}
"""

User Provided Parameters:
- Target Tool: ${targetTool || "Not specified (infer best or ask with sensible default)"}
- End Goal: ${endGoal || "Not specified"}
- Constraints: ${constraints || "Not specified"}
- Auto-Apply Sensible Defaults: ${autoDefault ? "Yes, please finalize immediately with sensible defaults" : "No"}
- Target Language Preference: ${targetLanguageInstruction}

Task:
You are operating as the expert prompt engineer described in the system instructions.
If the user provided insufficient details and autoDefault is FALSE:
You may return a response that asks 1-3 crisp clarifying questions with sensible defaults in the requested user language (${targetLanguageInstruction}), OR if the request has sufficient substance, directly construct the complete, professional ready-to-use prompt.
If autoDefault is TRUE or the user already provided enough context, output the FINAL structured prompt directly without asking questions.

Output Format Requirement:
Return a valid JSON object matching this schema:
{
  "status": "ready" | "needs_clarification",
  "clarifyingQuestions": [
    {
      "field": "targetTool" | "endGoal" | "constraints",
      "question": "Crisp question for the user (in the requested language: ${targetLanguageInstruction})",
      "sensibleDefault": "Sensible recommended default value (in the requested language: ${targetLanguageInstruction})"
    }
  ],
  "finalPrompt": "The complete, ready-to-copy-paste prompt formatted with Role, Context, Task, Format, Constraints, Example (if applicable), and Success criteria",
  "sections": {
    "role": "Role definition",
    "context": "Context background",
    "task": "Task description",
    "format": "Format specification",
    "constraints": "Strict constraints and negative exclusions",
    "example": "Short illustrative example or empty string",
    "successCriteria": "One line success check"
  },
  "targetToolIdentified": "e.g. Claude 3.7 Sonnet / Cursor / ChatGPT / Midjourney v6 / etc",
  "keyChoiceNote": "One short single-sentence note explaining a key architectural or prompt choice (in the requested language: ${targetLanguageInstruction}), or empty string"
}

Ensure the final prompt is rigorous, highly specific, avoids clichés or filler, and is 100% ready to be copied directly into the target AI model.
Respond ONLY with the JSON object. Do not include markdown code block backticks around the JSON.
`;

      const response = await callGemini({
        contents: promptInstruction,
        config: {
          systemInstruction: SYSTEM_PROMPT_ENGINEER,
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const rawText = response.text?.trim() || "{}";
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseErr) {
        // Strip possible backticks
        const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
      }

      res.json(parsed);
    } catch (err: any) {
      console.error("Error in /api/generate-prompt:", err);
      res.status(500).json({
        error: err.message || "Failed to generate prompt",
      });
    }
  });

  // Revise Existing Prompt API
  app.post("/api/revise-prompt", async (req, res) => {
    try {
      const { currentPrompt, revisionRequest } = req.body;

      if (!currentPrompt || !revisionRequest) {
        return res.status(400).json({ error: "Current prompt and revision request are required." });
      }

      const ai = getAI();

      const revisionInstruction = `
You are the expert prompt engineer. The user wants to revise a previously generated prompt.
CRITICAL RULE: Edit it directly instead of rewriting from scratch. Preserve existing strengths and role/context definitions while applying the requested changes.

Current Prompt:
"""
${currentPrompt}
"""

Revision Requested:
"""
${revisionRequest}
"""

Return a valid JSON object matching:
{
  "revisedPrompt": "The updated, copy-paste ready prompt incorporating the revisions directly",
  "sections": {
    "role": "Role definition",
    "context": "Context background",
    "task": "Task description",
    "format": "Format specification",
    "constraints": "Strict constraints and negative exclusions",
    "example": "Short illustrative example or empty string",
    "successCriteria": "One line success check"
  },
  "changesAppliedSummary": "Brief one sentence summary of what was updated",
  "keyChoiceNote": "One short line explaining a key choice"
}

Respond ONLY with the JSON object without markdown code blocks.
`;

      const response = await callGemini({
        contents: revisionInstruction,
        config: {
          systemInstruction: SYSTEM_PROMPT_ENGINEER,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const rawText = response.text?.trim() || "{}";
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
      }

      res.json(parsed);
    } catch (err: any) {
      console.error("Error in /api/revise-prompt:", err);
      res.status(500).json({
        error: err.message || "Failed to revise prompt",
      });
    }
  });

  // Test the Prompt with Gemini (Simulate Target Response)
  app.post("/api/test-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required to test." });
      }

      const response = await callGemini({
        contents: prompt,
        config: {
          temperature: 0.6,
        },
      });

      res.json({
        output: response.text || "No output generated.",
      });
    } catch (err: any) {
      console.error("Error in /api/test-prompt:", err);
      res.status(500).json({
        error: err.message || "Failed to test prompt",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Background Keep-Alive Service (Prevents Pausing / Sleeping on Free Tier hosting)
  function initKeepAliveService(serverPort: number) {
    const targetUrl =
      process.env.APP_URL ||
      process.env.RENDER_EXTERNAL_URL ||
      process.env.RAILWAY_STATIC_URL ||
      process.env.PUBLIC_URL ||
      "";

    // Default to 8 minutes (Render sleeps at 15m; Cloud Run idle timeouts ~10-15m)
    const intervalMs = Number(process.env.KEEP_ALIVE_INTERVAL_MS) || 8 * 60 * 1000;

    if (targetUrl) {
      console.log(`[Keep-Alive] Configured with public URL: ${targetUrl}. Anti-pause ping interval: ${intervalMs / 60000} mins`);
    } else {
      console.log(`[Keep-Alive] Active in local fallback mode (port ${serverPort}). Set APP_URL for external anti-pause.`);
    }

    // Ping loop to keep runtime warm and active even with 0 visitors
    setInterval(async () => {
      try {
        const pingUrl = targetUrl
          ? `${targetUrl.replace(/\/$/, "")}/api/health`
          : `http://127.0.0.1:${serverPort}/api/health`;

        const res = await fetch(pingUrl, {
          headers: { "User-Agent": "SmartPrompt-KeepAlive/1.0" },
          signal: AbortSignal.timeout(10000),
        });

        if (res.ok) {
          const data: any = await res.json().catch(() => ({}));
          console.log(`[Keep-Alive] Heartbeat ping successful at ${new Date().toLocaleTimeString()} (uptime: ${data.uptimeSeconds || 0}s)`);
        } else {
          console.warn(`[Keep-Alive] Ping returned status ${res.status}`);
        }
      } catch (err: any) {
        // Silently log notice without crashing
        console.log(`[Keep-Alive] Heartbeat notice: ${err.message}`);
      }
    }, intervalMs);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    initKeepAliveService(PORT);
  });
}

startServer();
