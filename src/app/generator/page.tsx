"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Copy, Loader2, Code, Terminal, Monitor, Download, Settings } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SupportedIDE, IDE_CONFIG, Config } from "@/lib/types";
import { constructSystemPrompt, cleanLLMResponse } from "@/lib/prompts";

export default function GeneratorPage() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [skillName, setSkillName] = useState("");
  const [generatedContents, setGeneratedContents] = useState<Record<string, string>>({});
  const [selectedIDE, setSelectedIDE] = useState<SupportedIDE>("vscode");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem("skills-auto-webui-config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    } else {
      const providerId = crypto.randomUUID();
      const defaultConfig: Config = {
        providers: [{
          id: providerId,
          name: "智谱AI (Zhipu)",
          type: "openai",
          baseUrl: "https://open.bigmodel.cn/api/paas/v4",
          apiKey: "d7818e4ba08745c9be2f1d499f1fe7a8.aDTQoKJ1LVzhXJgO",
          model: "glm-4-flash",
        }],
        activeProvider: providerId,
      };
      setConfig(defaultConfig);
      localStorage.setItem("skills-auto-webui-config", JSON.stringify(defaultConfig));
    }
  }, []);

  const hasActiveProvider = config && config.activeProvider && config.providers.find(p => p.id === config.activeProvider);

  const generateAll = async () => {
    if (!prompt) return;
    if (!hasActiveProvider) {
        alert(t.settings.noProviders); 
        return;
    }

    setLoading(true);
    const newContents: Record<string, string> = {};
    
    try {
        const activeProvider = config!.providers.find(p => p.id === config!.activeProvider);
        const ideList = Object.keys(IDE_CONFIG) as SupportedIDE[];
        
        for (const ide of ideList) {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    prompt, 
                    ide, 
                    skillName,
                    providerConfig: activeProvider 
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(`Error generating for ${ide}: ${data.error}`);
            newContents[ide] = data.content;
        }
        
        setGeneratedContents(newContents);
    } catch (e: any) {
        alert(e.message);
    } finally {
        setLoading(false);
    }
  };

  const downloadFile = async () => {
    const content = generatedContents[selectedIDE];
    if (!content) return;
    
    const ideSettings = IDE_CONFIG[selectedIDE];
    let filename = `${skillName || 'skill'}${ideSettings.extension}`;
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    if (filename.endsWith('.zip')) {
        setSaving(true);
        try {
            const res = await fetch("/api/save-skill", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename, content }),
            });
            
            if (!res.ok) throw new Error("Packaging failed");
            
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
        } catch {
            alert("Download failed");
        } finally {
            setSaving(false);
        }
    } else {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 font-sans relative overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="glass-button p-2.5 rounded-full hover:bg-muted/50">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-apple-headline">{t.generator.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-180px)] min-h-[600px]">
          <div className="flex flex-col gap-4 animate-apple-fade-in [animation-delay:0.1s]">
            {!hasActiveProvider && config !== null && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-between text-yellow-600 dark:text-yellow-400">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.settings.noProviders}</span>
                </div>
                <Link href="/settings" className="text-sm underline hover:opacity-80">
                  {t.settings.addProvider}
                </Link>
              </div>
            )}

            <div className="glass-card flex-1 flex flex-col p-6 space-y-6 relative group border-accent/10">
              
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles className="w-5 h-5" />
                    <label className="text-sm font-semibold uppercase tracking-wider">
                      {t.generator.prompt.label}
                    </label>
                  </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                  {t.generator.prompt.skillNameLabel}
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder={t.generator.prompt.skillNamePlaceholder}
                  className="glass-input w-full"
                />
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.generator.prompt.placeholder}
                className="flex-1 w-full bg-transparent resize-none focus:outline-none text-lg leading-relaxed placeholder:text-muted-foreground/30 font-light"
              />
              
              <div className="pt-4 border-t border-border/50">
                <button
                  onClick={generateAll}
                  disabled={loading || !prompt}
                  className="glass-button-primary w-full flex items-center justify-center gap-2 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-accent/10 hover:shadow-accent/20"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {loading ? t.generator.prompt.generating : "Generate All"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 animate-apple-fade-in [animation-delay:0.2s]">
            <div className="glass-card flex-1 flex flex-col p-0 overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-white/20 dark:bg-black/20">
                <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <select 
                        value={selectedIDE}
                        onChange={(e) => setSelectedIDE(e.target.value as SupportedIDE)}
                        className="glass-input py-1 px-3 text-sm appearance-none cursor-pointer min-w-[120px]"
                    >
                        {Object.entries(IDE_CONFIG).map(([key, config]) => (
                            <option key={key} value={key}>{config.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedContents[selectedIDE] || "")}
                    className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    title={t.common.copy}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <textarea
                  value={generatedContents[selectedIDE] || ""}
                  readOnly
                  className="absolute inset-0 w-full h-full bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed p-6 text-foreground/90 selection:bg-accent/20"
                  spellCheck={false}
                  placeholder={t.generator.output.placeholder}
                />
              </div>

              <div className="p-6 border-t border-border/50 bg-white/20 dark:bg-black/20 flex gap-4">
                <button
                  onClick={downloadFile}
                  disabled={saving || !generatedContents[selectedIDE]}
                  className="glass-button w-full flex-1 flex items-center justify-center gap-2 py-3 disabled:opacity-50 hover:bg-white/40 dark:hover:bg-white/10"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {saving ? "Packaging..." : "Download File"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
