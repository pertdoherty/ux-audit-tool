"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Code, Loader2, Sparkles } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<{ ux_summary?: string; dev_bugs?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDev, setShowDev] = useState(false);

  const runAudit = async () => {
    if (!url) return;
    setLoading(true);
    setReport(null);

    const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    setReport(data);
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.4),_transparent_58%)]" />
      <div className="pointer-events-none absolute right-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10 lg:px-8">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="inline-flex rounded-full bg-indigo-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300 shadow-sm">
                Premium UX audit
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Transform your website with data-driven UX intelligence.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Elite UX insights in one click. Discover clarity, accessibility, and conversion improvements with a polished AI-driven audit designed for modern digital experiences.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-indigo-300 shadow-inner shadow-indigo-500/10">
                  <Bot size={24} />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">AI-driven audit</p>
                  <p className="font-semibold text-white">Instant, actionable UX recommendations.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                <p>Optimized for performance, accessibility, and conversion.</p>
                <p>Enterprise-ready interface with design-first delivery.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">Start your audit</h2>
              <p className="text-slate-400">Paste any live or staging URL and unlock a premium evaluation with crisp, developer-ready guidance.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="url-input">Website URL</label>
              <input
                id="url-input"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="min-h-[56px] rounded-3xl border border-slate-700 bg-slate-950/90 px-5 text-base text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
              />
              <button
                onClick={runAudit}
                disabled={loading}
                className="inline-flex min-h-[56px] items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Sparkles size={18} /> Audit</>}
              </button>
            </div>

            <div className="grid gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 text-slate-300 sm:grid-cols-3">
              {[
                ['Performance', 'Fast scans with instant feedback'],
                ['Accessibility', 'Best-practice audits for all users'],
                ['Conversion', 'Actionable design improvements'],
              ].map(([title, detail]) => (
                <div key={title} className="space-y-2 rounded-3xl bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>
                  <p className="font-medium text-white">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/95 to-slate-950/95 p-8 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-white/5 bg-slate-900/80 p-6">
              <h3 className="text-xl font-semibold text-white">Premium UX dashboard</h3>
              <p className="mt-3 text-slate-400">Receive a refined presentation of findings with clear sections, priorities, and a developer-ready technical summary.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['High-priority issues', 'Critical UX fixes first'],
                ['Design polish', 'Sleek, conversion-focused flows'],
                ['Accessibility', 'Inclusive experience review'],
                ['Metrics', 'Empowered decisions with insight'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {report && (
          <section className="mt-10 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)]">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">UX analysis complete</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Detailed report</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <Sparkles size={18} className="text-indigo-300" /> Expert recommendations
                </div>
              </div>
              <div className="prose prose-invert max-w-none text-slate-200 prose-headings:text-white prose-a:text-indigo-300 prose-a:hover:text-indigo-200">
                <ReactMarkdown>{report.ux_summary}</ReactMarkdown>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/95 p-7 shadow-xl shadow-slate-950/50">
              <button
                onClick={() => setShowDev(!showDev)}
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:text-white"
              >
                <Code size={16} /> {showDev ? 'Hide developer report' : 'Show developer report'}
              </button>
              {showDev ? (
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 font-mono text-sm leading-7 text-slate-300">
                  <ReactMarkdown>{report.dev_bugs}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-slate-400">Expand the developer report for technical issues, bug details, and code-level recommendations.</p>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
