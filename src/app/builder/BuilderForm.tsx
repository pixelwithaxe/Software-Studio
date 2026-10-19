"use client";
import { useState } from "react";

const NOT_READY = "Not configured yet: this feature arrives in a later phase. Nothing was sent.";

export default function BuilderForm({ defaultPrompt }: { defaultPrompt: string }) {
  const [apiKey, setApiKey] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function onGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const missing = ["name", "model", "description"].filter((k) => !String(data.get(k) ?? "").trim());
    if (missing.length || !apiKey.trim()) {
      setNotice("");
      setError("Fill in the project name, API key, model ID, and description first.");
      return;
    }
    setError("");
    setNotice(NOT_READY);
  }

  function reset() {
    setApiKey("");
    setNotice("");
    setError("");
  }

  return (
    <form onSubmit={onGenerate} onReset={reset} className="grid gap-5 rounded-2xl border border-edge bg-panel p-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">Project name</label>
        <input id="name" name="name" maxLength={80} className="field" placeholder="My portfolio" />
      </div>
      <div>
        <label htmlFor="type" className="mb-1 block text-sm font-medium">Application type</label>
        <select id="type" name="type" className="field">
          <option>Website</option>
          <option>React Web App</option>
          <option>Android App</option>
        </select>
      </div>
      <div>
        <label htmlFor="provider" className="mb-1 block text-sm font-medium">AI provider</label>
        <select id="provider" name="provider" className="field">
          <option>Google Gemini API</option>
          <option>OpenRouter</option>
        </select>
      </div>
      <div>
        <label htmlFor="model" className="mb-1 block text-sm font-medium">Model ID</label>
        <input id="model" name="model" className="field font-mono" placeholder="Paste the exact model ID" autoComplete="off" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="key" className="mb-1 block text-sm font-medium">API key</label>
        <div className="flex gap-2">
          <input id="key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
            className="field font-mono" autoComplete="off" spellCheck={false} placeholder="Stays in this tab only" />
          <button type="button" className="btn-ghost shrink-0" onClick={() => { setError(""); setNotice(NOT_READY); }}>Test API Key</button>
        </div>
        <p className="mt-1 text-xs text-mute">Your key is kept in memory only and cleared when you reset or leave this page.</p>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="description" className="mb-1 block text-sm font-medium">Application description</label>
        <textarea id="description" name="description" rows={6} maxLength={4000} defaultValue={defaultPrompt}
          className="field" placeholder="Describe the app you want to create..." />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" className="btn-primary">Generate project</button>
        <button type="reset" className="btn-ghost">Reset</button>
        <p role="status" className="text-sm text-mute">{notice}</p>
        <p role="alert" className="text-sm text-red-400">{error}</p>
      </div>
    </form>
  );
}
