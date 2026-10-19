export const metadata = { title: "API Tutorials | Software Studio" };

const guides = [
  {
    title: "Google AI Studio",
    docs: "https://ai.google.dev/gemini-api/docs/api-key",
    steps: [
      "Open Google AI Studio.",
      "Sign in.",
      "Create an API key where available.",
      "Review available models and usage limits.",
      "Copy the correct model ID.",
      "Enter the key and model ID in Software Studio.",
      "Select Test API Key.",
    ],
  },
  {
    title: "OpenRouter",
    docs: "https://openrouter.ai/docs",
    steps: [
      "Create an OpenRouter account.",
      "Create an API key.",
      "Choose an available model.",
      "Copy its exact model ID.",
      "Check provider pricing and model limits.",
      "Enter the key and model ID in Software Studio.",
      "Select Test API Key.",
    ],
  },
];

export default function Tutorials() {
  return (
    <div className="max-w-3xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold">API Tutorials</h1>
        <p className="mt-3 text-mute">
          Free model availability, quotas, rate limits, and billing requirements can change at any time. Check your provider before relying on them.
        </p>
      </header>
      {guides.map((g) => (
        <section key={g.title} className="rounded-2xl border border-edge bg-panel p-5">
          <h2 className="text-xl font-semibold">{g.title}</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-zinc-300">
            {g.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
          <a href={g.docs} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-accent underline">
            Official documentation
          </a>
        </section>
      ))}
    </div>
  );
}
