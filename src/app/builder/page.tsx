import BuilderForm from "./BuilderForm";

export const metadata = { title: "AI App Builder | Software Studio" };

export default function BuilderPage({ searchParams }: { searchParams: { prompt?: string } }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">AI App Builder</h1>
      <p className="mb-6 mt-2 text-mute">Choose a provider, paste your key and model ID, then describe your app.</p>
      <BuilderForm defaultPrompt={(searchParams.prompt ?? "").slice(0, 4000)} />
    </div>
  );
}
