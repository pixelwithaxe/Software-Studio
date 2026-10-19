import Link from "next/link";
import { KeyRound, Cpu, MonitorPlay, Smartphone, Download, GitBranch } from "lucide-react";

const features = [
  { icon: KeyRound, title: "Bring Your Own API Key", text: "Use your own Gemini or OpenRouter key. Keys are not saved by default." },
  { icon: Cpu, title: "Custom AI Models", text: "Type any model ID your provider offers." },
  { icon: MonitorPlay, title: "Live Website Preview", text: "Preview websites in an isolated sandbox." },
  { icon: Smartphone, title: "Android APK Downloads", text: "Build real APKs through an external build service." },
  { icon: Download, title: "Downloadable Source Code", text: "Export every project as a ZIP with a README." },
  { icon: GitBranch, title: "Open-Source Platform", text: "The full source is public on GitHub." },
];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Build Apps with AI. Bring Your Own API Key.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-mute">
          Turn your ideas into websites and Android applications. Use your preferred AI provider, generate code,
          preview websites, download source code, and build Android APKs.
        </p>
        <form action="/builder" method="get" className="mt-8 rounded-2xl border border-edge bg-panel p-3">
          <label htmlFor="prompt" className="sr-only">Describe the app you want to create</label>
          <textarea id="prompt" name="prompt" rows={3} maxLength={4000} placeholder="Describe the app you want to create..."
            className="w-full resize-none bg-transparent p-2 font-mono text-sm placeholder:text-mute focus:outline-none" />
          <div className="mt-2 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">Start Building</button>
            <Link href="/explore" className="btn-ghost">Explore Projects</Link>
          </div>
        </form>
      </section>

      <section aria-labelledby="features">
        <h2 id="features" className="mb-6 text-2xl font-bold">What you get</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-xl border border-edge bg-panel p-5">
              <Icon size={20} className="text-accent" aria-hidden />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-mute">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-mute">AI usage is billed or limited by your provider. Software Studio does not provide free or unlimited AI.</p>
      </section>
    </div>
  );
}
