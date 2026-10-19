export type Provider = "gemini" | "openrouter";
export class ProviderError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const MODEL_RE = /^[A-Za-z0-9._\-\/:]{1,120}$/;

export type Creds = { provider: Provider; apiKey: string; model: string };
export function parseCreds(b: unknown): Creds | { error: string } {
  const o = (b ?? {}) as Record<string, unknown>;
  const provider = o.provider, apiKey = typeof o.apiKey === "string" ? o.apiKey.trim() : "", model = typeof o.model === "string" ? o.model.trim().replace(/^models\//, "") : "";
  if (provider !== "gemini" && provider !== "openrouter") return { error: "Choose a supported provider." };
  if (apiKey.length < 8 || apiKey.length > 300) return { error: "Enter a valid API key." };
  if (!MODEL_RE.test(model)) return { error: "Enter a valid model ID." };
  return { provider, apiKey, model };
}

const hits = new Map<string, { n: number; reset: number }>();
export function rateLimit(req: Request, max: number): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { n: 1, reset: now + 60_000 }); return true; }
  return ++h.n <= max;
}

function friendly(status: number): string {
  if (status === 401 || status === 403) return "The API key was rejected. Check that it belongs to the selected provider.";
  if (status === 404) return "Model not found. Check the exact model ID and your account access.";
  if (status === 429) return "Rate limit or quota exceeded. Wait and retry, or check your provider's limits.";
  if (status === 400) return "The provider rejected the request. Check the model ID and try again.";
  if (status >= 500) return "The provider is having problems. Try again later.";
  return "The request failed. Try again.";
}

export async function callModel(o: Creds & { system: string; prompt: string; maxTokens: number; json?: boolean; allowEmpty?: boolean }): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 55_000);
  let res: Response;
  try {
    if (o.provider === "gemini") {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${o.model}:generateContent`, {
        method: "POST", signal: ctrl.signal,
        headers: { "Content-Type": "application/json", "x-goog-api-key": o.apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: o.system }] },
          contents: [{ role: "user", parts: [{ text: o.prompt }] }],
          generationConfig: { maxOutputTokens: o.maxTokens, ...(o.json ? { responseMimeType: "application/json" } : {}) },
        }),
      });
    } else {
      res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST", signal: ctrl.signal,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${o.apiKey}`, "X-Title": "Software Studio" },
        body: JSON.stringify({ model: o.model, max_tokens: o.maxTokens, messages: [{ role: "system", content: o.system }, { role: "user", content: o.prompt }] }),
      });
    }
  } catch {
    throw new ProviderError(504, "The request timed out or could not connect. Check your connection and try again.");
  } finally { clearTimeout(timer); }
  if (!res.ok) throw new ProviderError(res.status, friendly(res.status));
  const data = await res.json().catch(() => null);
  const text: string = o.provider === "gemini"
    ? (data?.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("")
    : data?.choices?.[0]?.message?.content ?? "";
  if (!text && !o.allowEmpty) throw new ProviderError(502, "The model returned no text. Try again or pick another model.");
  return text;
}
