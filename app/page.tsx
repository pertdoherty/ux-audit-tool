"use client";
import { useState } from 'react';
import { Bot, Code, Loader2, Search, AlertCircle } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [showDev, setShowDev] = useState(false);
  const [error, setError] = useState('');

  const runAudit = async () => {
    if (!url) return;
    setLoading(true);
    setReport(null);
    setError('');

    try {
      // REPLACE THIS URL WITH YOUR ACTUAL N8N WEBHOOK URL
      const response = await fetch('https://astroproduct.app.n8n.cloud/webhook-test/ux-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error('Failed to audit page');
      
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError('Failed to connect to the analysis engine. Please check your n8n setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">UX Audit Engine</h1>
        <p className="text-gray-600 mb-8">Enter a URL to run an AI-driven UX and Technical analysis.</p>

        <div className="flex gap-2 mb-8">
          <input 
            type="url" 
            placeholder="https://example.com"
            className="flex-1 p-3 border rounded-lg shadow-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={runAudit}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Start Audit'}
          </button>
        </div>

        {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">{error}</div>}

        {report && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {/* UX Report Section */}
            <div className="flex items-center gap-2 mb-4">
              <Bot className="text-indigo-600" />
              <h2 className="text-xl font-bold">UX Audit Report</h2>
            </div>
            <div className="prose max-w-none text-gray-700 mb-8">
              {report.ux_summary}
            </div>

            {/* Dev Mode Toggle */}
            <button 
              onClick={() => setShowDev(!showDev)}
              className="text-sm text-indigo-600 font-semibold underline mb-4"
            >
              {showDev ? 'Hide Technical Details' : 'View Technical/Dev Report'}
            </button>

            {/* Dev Report Section */}
            {showDev && (
              <div className="p-6 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <Code size={16} />
                  <span className="font-bold">Dev/Bug Report</span>
                </div>
                <pre className="whitespace-pre-wrap">{JSON.stringify(report.dev_bugs, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}