"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Code, Loader2, Sparkles } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<any>(null);
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
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">UX Audit Engine</h1>
          <p className="text-gray-500">AI-powered insights for your web projects</p>
        </div>

        {/* Input Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex gap-3">
          <input 
            type="url" 
            placeholder="Paste your URL here..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={runAudit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18}/> Audit</>}
          </button>
        </div>

        {/* Report Section */}
        {report && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Bot className="text-indigo-600" /> UX Analysis
              </h2>
              <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed">
                <ReactMarkdown>{report.ux_summary}</ReactMarkdown>
              </div>
            </div>

            {/* Dev Mode */}
            <div className="border-t pt-6">
              <button onClick={() => setShowDev(!showDev)} className="text-sm text-gray-500 hover:text-indigo-600 font-medium">
                {showDev ? 'Hide Technical Details' : 'View Technical/Dev Report'}
              </button>
              {showDev && (
                <div className="mt-4 p-6 bg-gray-900 text-gray-100 rounded-xl font-mono text-sm shadow-xl">
                  <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2"><Code size={16}/> Dev Report</h3>
                  <div className="whitespace-pre-wrap"><ReactMarkdown>{report.dev_bugs}</ReactMarkdown></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}