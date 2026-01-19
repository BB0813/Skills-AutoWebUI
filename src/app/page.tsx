"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Sparkles, Settings2 } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center text-center mb-16 space-y-6">
        <div className="animate-apple-fade-in space-y-4">
          <h1 className="text-apple-display bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            {t.home.title}
          </h1>
          <p className="text-apple-title text-muted-foreground font-normal max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>
      </div>

      <div className="grid text-left lg:max-w-4xl lg:w-full lg:grid-cols-2 gap-6 animate-apple-fade-in [animation-delay:0.2s]">
        <Link
          href="/generator"
          className="glass-card group relative overflow-hidden hover:border-accent/30 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Sparkles className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="p-3 bg-accent/10 w-fit rounded-xl group-hover:bg-accent/20 transition-colors">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                {t.home.generator.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 text-muted-foreground/50">
                  -&gt;
                </span>
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {t.home.generator.desc}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/settings"
          className="glass-card group relative overflow-hidden hover:border-accent/30 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
            <Settings2 className="w-32 h-32" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="p-3 bg-accent/10 w-fit rounded-xl group-hover:bg-accent/20 transition-colors">
              <Settings2 className="w-6 h-6 text-accent" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                {t.home.settings.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 text-muted-foreground/50">
                  -&gt;
                </span>
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {t.home.settings.desc}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
