"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Check, Save, Loader2, Server } from "lucide-react";
import { Config, Provider, ProviderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [config, setConfig] = useState<Config>({ providers: [], activeProvider: null });
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const saveConfig = async (newConfig: Config) => {
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setConfig(newConfig);
        setIsDirty(false);
      }
    } catch (error) {
      console.error("Failed to save config", error);
    } finally {
      setSaving(false);
    }
  };

  const addProvider = () => {
    const newProvider: Provider = {
      id: crypto.randomUUID(),
      name: "New Provider",
      type: "openai",
      baseUrl: "https://api.openai.com/v1",
      apiKey: "",
      model: "gpt-4o",
    };
    const newConfig = {
      ...config,
      providers: [...config.providers, newProvider],
      activeProvider: config.activeProvider || newProvider.id,
    };
    setConfig(newConfig);
    setIsDirty(true);
  };

  const updateProvider = (id: string, updates: Partial<Provider>) => {
    const newConfig = {
      ...config,
      providers: config.providers.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    };
    setConfig(newConfig);
    setIsDirty(true);
  };

  const removeProvider = (id: string) => {
    const newConfig = {
      ...config,
      providers: config.providers.filter((p) => p.id !== id),
      activeProvider: config.activeProvider === id ? null : config.activeProvider,
    };
    setConfig(newConfig);
    setIsDirty(true);
  };

  const setActiveProvider = (id: string) => {
    const newConfig = { ...config, activeProvider: id };
    setConfig(newConfig);
    setIsDirty(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <span className="text-muted-foreground">{t.common.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 font-sans relative overflow-hidden">
       {/* Decorative background blobs */}
       <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="glass-button p-2.5 rounded-full hover:bg-muted/50">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-apple-headline">{t.settings.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isDirty && (
              <button
                onClick={() => saveConfig(config)}
                disabled={saving}
                className="glass-button-primary flex items-center gap-2 animate-apple-fade-in"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {t.common.save}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6 animate-apple-fade-in [animation-delay:0.1s]">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-apple-title flex items-center gap-2">
                <Server className="w-5 h-5 text-accent" />
                {t.settings.providers}
              </h2>
              <button onClick={addProvider} className="glass-button flex items-center gap-2 text-sm text-accent hover:text-accent-foreground">
                <Plus className="w-4 h-4" />
                {t.settings.addProvider}
              </button>
            </div>

            <div className="grid gap-6">
              {config.providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`glass-card relative transition-all duration-300 group ${
                    config.activeProvider === provider.id 
                      ? "ring-2 ring-accent shadow-lg shadow-accent/10" 
                      : "hover:border-accent/30"
                  }`}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setActiveProvider(provider.id)}
                      className={`p-2 rounded-full transition-all ${
                        config.activeProvider === provider.id
                          ? "bg-accent text-white shadow-md"
                          : "bg-muted text-muted-foreground hover:bg-accent hover:text-white"
                      }`}
                      title={t.settings.actions.setActive}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeProvider(provider.id)}
                      className="p-2 rounded-full bg-muted text-destructive hover:bg-destructive hover:text-white transition-all"
                      title={t.settings.actions.remove}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                          {t.settings.fields.name}
                        </label>
                        <input
                          type="text"
                          value={provider.name}
                          onChange={(e) => updateProvider(provider.id, { name: e.target.value })}
                          className="glass-input w-full"
                          placeholder="My Provider"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                          {t.settings.fields.type}
                        </label>
                        <div className="relative">
                          <select
                            value={provider.type}
                            onChange={(e) =>
                              updateProvider(provider.id, { type: e.target.value as ProviderType })
                            }
                            className="glass-input w-full appearance-none cursor-pointer"
                          >
                            <option value="openai">OpenAI</option>
                            <option value="newapi">NewAPI</option>
                            <option value="openwebui">OpenWebUI</option>
                            <option value="custom">Custom</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                        {t.settings.fields.baseUrl}
                      </label>
                      <input
                        type="text"
                        value={provider.baseUrl}
                        onChange={(e) => updateProvider(provider.id, { baseUrl: e.target.value })}
                        className="glass-input w-full font-mono text-sm"
                        placeholder="https://api.openai.com/v1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                          {t.settings.fields.apiKey}
                        </label>
                        <input
                          type="password"
                          value={provider.apiKey}
                          onChange={(e) => updateProvider(provider.id, { apiKey: e.target.value })}
                          className="glass-input w-full font-mono text-sm"
                          placeholder="sk-..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                          {t.settings.fields.model}
                        </label>
                        <input
                          type="text"
                          value={provider.model}
                          onChange={(e) => updateProvider(provider.id, { model: e.target.value })}
                          className="glass-input w-full font-mono text-sm"
                          placeholder="gpt-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {config.providers.length === 0 && (
                <div className="text-center py-16 glass-card border-dashed border-2 border-border/50 bg-transparent flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-muted rounded-full">
                    <Server className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground max-w-sm">
                    {t.settings.noProviders}
                  </p>
                  <button onClick={addProvider} className="glass-button-primary">
                    {t.settings.addProvider}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
