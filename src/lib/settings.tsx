"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import SettingsDialog from "@/components/SettingsDialog";

export type Provider = "gemini" | "openrouter";
type Theme = "dark" | "light";
type Ctx = {
  theme: Theme; setTheme: (t: Theme) => void;
  provider: Provider; setProvider: (p: Provider) => void;
  model: string; setModel: (m: string) => void;
  apiKey: string; setApiKey: (k: string) => void;
  remember: boolean; setRemember: (r: boolean) => void;
  open: boolean; setOpen: (o: boolean) => void;
};
const SettingsCtx = createContext<Ctx | null>(null);
export const useSettings = () => {
  const c = useContext(SettingsCtx);
  if (!c) throw new Error("useSettings must be used inside SettingsProvider");
  return c;
};
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string | null) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} };

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [provider, setProvider] = useState<Provider>("gemini");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (get("ss-theme") === "light") setTheme("light");
    const p = get("ss-provider"); if (p === "gemini" || p === "openrouter") setProvider(p);
    setModel(get("ss-model") ?? "");
    const k = get("ss-key"); if (k) { setApiKey(k); setRemember(true); }
    setLoaded(true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    if (loaded) set("ss-theme", theme);
  }, [theme, loaded]);
  useEffect(() => { if (loaded) { set("ss-provider", provider); set("ss-model", model); } }, [provider, model, loaded]);
  useEffect(() => { if (loaded) set("ss-key", remember && apiKey ? apiKey : null); }, [remember, apiKey, loaded]);

  return (
    <SettingsCtx.Provider value={{ theme, setTheme, provider, setProvider, model, setModel, apiKey, setApiKey, remember, setRemember, open, setOpen }}>
      {children}
      <SettingsDialog />
    </SettingsCtx.Provider>
  );
}
