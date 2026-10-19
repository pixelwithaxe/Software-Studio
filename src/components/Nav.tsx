import Link from "next/link";
import { Github, Menu } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "AI App Builder" },
  { href: "/explore", label: "Explore Projects" },
  { href: "/tutorials", label: "API Tutorials" },
  { href: "/help", label: "Help & Support" },
];
const github = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-edge bg-ink/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-bold tracking-tight">Software Studio</Link>
        <ul className="hidden items-center gap-6 text-sm text-mute md:flex">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
          ))}
          <li>
            <a href={github} className="inline-flex items-center gap-1.5 hover:text-white" target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden /> GitHub
            </a>
          </li>
        </ul>
        <details className="relative md:hidden">
          <summary className="list-none rounded-lg border border-edge p-2" aria-label="Open menu"><Menu size={18} /></summary>
          <ul className="absolute right-0 mt-2 w-52 rounded-xl border border-edge bg-panel p-2 text-sm">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="block rounded-lg px-3 py-2 hover:bg-ink">{l.label}</Link></li>
            ))}
            <li><a href={github} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 hover:bg-ink">GitHub</a></li>
          </ul>
        </details>
      </nav>
    </header>
  );
}
