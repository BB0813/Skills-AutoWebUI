"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Check, Save, Loader2, Server, Globe, Zap, Shield, Laptop } from "lucide-react";
import { Config, Provider, ProviderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const PROVIDER_PRESETS = [
  { name: "OpenAI", type: "openai", baseUrl: "https://api.openai.com/v1", model: "gpt-4o" },
  { name: "SiliconFlow (DeepSeek)", type: "openai", baseUrl: "https://api.siliconflow.cn/v1", model: "deepseek-ai/DeepSeek-V3" },
  { name: "Gemini (OpenAI Compatible)", type: "openai", baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai", model: "gemini-1.5-flash" },
  { name: "DeepSeek Official", type: "openai", baseUrl: "https://api.deepseek.com", model: "deepseek-chat" },
  { name: "Moonshot (Kimi)", type: "openai", baseUrl: "https://api.moonshot.cn/v1", model: "moonshot-v1-8k" },
  { name: "OpenRouter", type: "openai", baseUrl: "https://openrouter.ai/api/v1", model: "anthropic/claude-3.5-sonnet" },
];

export default function SettingsPage() {
  const { t } = useTranslation();
  const [config, setConfig] = useState<Config>({ providers: [], activeProvider: null });
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load config from localStorage on client side
    const savedConfig = localStorage.getItem("skills-auto-webui-config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse config from localStorage", e);
      }
    }
    setLoading(false);
  }, []);

  const saveConfig = async (newConfig: Config) => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem("skills-auto-webui-config", JSON.stringify(newConfig));
      setConfig(newConfig);
      setIsDirty(false);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to save config", error);
    } finally {
      setSaving(false);
    }
  };

  const addProvider = (preset?: typeof PROVIDER_PRESETS[0]) => {
    const newProvider: Provider = {
      id: crypto.randomUUID(),
      name: preset?.name || "New Provider",
      type: (preset?.type as ProviderType) || "openai",
      baseUrl: preset?.baseUrl || "https://api.openai.com/v1",
      apiKey: "",
      model: preset?.model || "gpt-4o",
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

  const toggleClientSideRequest = () => {
    const newConfig = { ...config, clientSideRequest: !config.clientSideRequest };
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
          {/* Advanced Settings */}
          <section className="space-y-4">
            <h2 className="text-apple-title flex items-center gap-2 px-2">
                <Shield className="w-5 h-5 text-accent" />
                Advanced
            </h2>
            <div className="glass-card flex items-center justify-between p-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium">
                        <Laptop className="w-4 h-4 text-muted-foreground" />
                        Client-Side Request Mode
                    </div>
                    <p className="text-sm text-muted-foreground max-w-lg">
                        Enable this if you are experiencing timeouts on Vercel or IP blocking. 
                        Requests will be made directly from your browser to the API provider. 
                        <br/>
                        <span className="text-yellow-600 dark:text-yellow-400 text-xs">
                            Requires API provider to support CORS.
                        </span>
                    </p>
                </div>
                <button
                    onClick={toggleClientSideRequest}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                        config.clientSideRequest ? "bg-accent" : "bg-muted-foreground/30"
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            config.clientSideRequest ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                </button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-apple-title flex items-center gap-2">
                <Server className="w-5 h-5 text-accent" />
                {t.settings.providers}
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative group">
                   <button className="glass-button flex items-center gap-2 text-sm text-accent hover:text-accent-foreground">
                    <Zap className="w-4 h-4" />
                    <span>Presets</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 glass-card bg-white/90 dark:bg-black/90 backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
                    <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1 uppercase tracking-wider">Quick Add</div>
                    {PROVIDER_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => addProvider(preset)}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-accent/10 hover:text-accent transition-colors flex items-center gap-2"
                      >
                        <Globe className="w-3 h-3" />
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => addProvider()} className="glass-button flex items-center gap-2 text-sm text-accent hover:text-accent-foreground">
                  <Plus className="w-4 h-4" />
                  {t.settings.addProvider}
                </button>
              </div>
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
                  <button onClick={() => addProvider()} className="glass-button-primary">
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
