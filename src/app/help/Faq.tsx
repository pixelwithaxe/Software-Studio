"use client";
import { useState } from "react";

type Item = { q: string; a: string[] };

const items: Item[] = [
  { q: "Invalid API key", a: ["Check the key for typing mistakes.", "Verify the key belongs to the selected provider.", "Create a new key if the old one was revoked.", "Never post your key publicly."] },
  { q: "Model not found", a: ["Verify the exact model ID.", "Check that the selected provider supports it.", "Check model availability and your account permissions."] },
  { q: "Quota exceeded", a: ["Check your provider's usage limits.", "Wait for the quota to reset if it does.", "Review billing requirements.", "Use another eligible key if appropriate."] },
  { q: "Rate limit exceeded", a: ["Wait and retry.", "Send requests less often.", "Check your provider's rate limits."] },
  { q: "API request failed", a: ["Check your internet connection.", "Check the provider's service status.", "Review the sanitized error details."] },
  { q: "Website preview failed", a: ["Read the compilation errors.", "Verify dependencies.", "Retry generation or ask the AI to repair it."] },
  { q: "APK build failed", a: ["Check the build logs.", "Verify the project configuration.", "Check dependencies and supported SDK versions.", "Fix the error and retry."] },
  { q: "Download failed", a: ["Verify the build completed.", "Generate a fresh download link.", "Check whether the artifact expired."] },
];

export default function Faq() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = items.filter((i) => !q || (i.q + " " + i.a.join(" ")).toLowerCase().includes(q));
  return (
    <div>
      <label htmlFor="search" className="sr-only">Search help topics</label>
      <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} className="field" placeholder="Search help topics" />
      <div className="mt-5 space-y-3">
        {shown.length === 0 && <p className="text-sm text-mute">No topics match. Try a different word.</p>}
        {shown.map((i) => (
          <details key={i.q} className="rounded-xl border border-edge bg-panel p-4">
            <summary className="cursor-pointer font-semibold">{i.q}</summary>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
              {i.a.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
