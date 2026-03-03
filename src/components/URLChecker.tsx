import { useState, useCallback } from 'react';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Download, 
  Copy, 
  Trash2, 
  Filter, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Clock,
  Settings,
  Shield,
  Info
} from 'lucide-react';
import { URLCheckResult, CheckOptions, FilterType } from '../types';
import { parseURLs, checkURLs, exportToCSV, getStatusColor } from '../utils/urlChecker';

const SAMPLE_URLS = `https://httpbin.org/status/200
https://httpbin.org/status/404
https://httpbin.org/status/500
https://httpbin.org/redirect/3
https://httpbin.org/delay/1
https://example.com
https://invalid-domain-12345.com`;

export default function URLChecker() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<URLCheckResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [filter, setFilter] = useState<FilterType>('all');
  const [options, setOptions] = useState<CheckOptions>({
    concurrency: 10,
    timeout: 10000,
    method: 'HEAD',
    followRedirects: true,
    useProxy: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [proxyWarning, setProxyWarning] = useState(false);

  const handleLoadSamples = () => {
    setInput(SAMPLE_URLS);
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
    setProgress({ completed: 0, total: 0 });
  };

  const handleScan = useCallback(async () => {
    const urls = parseURLs(input);
    if (urls.length === 0) return;

    setIsScanning(true);
    setResults([]);
    setProgress({ completed: 0, total: urls.length });

    const proxyUrl = options.useProxy ? '/api/check' : undefined;

    try {
      await checkURLs(
        urls,
        options,
        (completed, total, result) => {
          setProgress({ completed, total });
          setResults(prev => [...prev, result]);
        },
        proxyUrl
      );
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  }, [input, options]);

  const handleStop = () => {
    setIsScanning(false);
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(filteredResults);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `url-check-results-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyErrors = () => {
    const errors = filteredResults
      .filter(r => r.status === 'error')
      .map(r => r.url)
      .join('\n');
    navigator.clipboard.writeText(errors);
  };

  const filteredResults = results.filter(r => {
    switch (filter) {
      case 'errors':
        return r.status === 'error';
      case 'redirects':
        return r.status === 'redirect';
      case 'slow':
        return r.responseTime && r.responseTime > 5000;
      default:
        return true;
    }
  });

  const stats = {
    total: results.length,
    ok: results.filter(r => r.status === 'ok').length,
    errors: results.filter(r => r.status === 'error').length,
    redirects: results.filter(r => r.status === 'redirect').length,
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bulk URL Checker</h1>
              <p className="text-xs text-slate-400">Check images, PDFs, and URLs in bulk</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Privacy</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Section */}
        <section className="mb-8 animate-fade-in">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="urls" className="text-lg font-semibold">
                Paste URLs to check (one per line)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadSamples}
                  className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  disabled={isScanning}
                >
                  Load Samples
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
                  disabled={isScanning}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              id="urls"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/image.jpg&#10;https://example.com/page.html&#10;https://example.com/document.pdf"
              className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm font-mono resize-y focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isScanning}
            />
            <div className="mt-2 text-sm text-slate-500">
              {parseURLs(input).length} URLs detected • Max 10,000 lines supported
            </div>
          </div>
        </section>

        {/* Options Section */}
        <section className="mb-8">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showSettings ? 'Hide' : 'Show'} Options
          </button>
          
          {showSettings && (
            <div className="mt-4 bg-slate-800 rounded-xl border border-slate-700 p-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Concurrency (1-50)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={options.concurrency}
                    onChange={(e) => setOptions(o => ({ ...o, concurrency: Math.max(1, Math.min(50, parseInt(e.target.value) || 1)) }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timeout (ms)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={60000}
                    step={1000}
                    value={options.timeout}
                    onChange={(e) => setOptions(o => ({ ...o, timeout: parseInt(e.target.value) || 10000 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Method</label>
                  <select
                    value={options.method}
                    onChange={(e) => setOptions(o => ({ ...o, method: e.target.value as 'HEAD' | 'GET' }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
                  >
                    <option value="HEAD">HEAD (faster)</option>
                    <option value="GET">GET (more accurate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Redirects</label>
                  <select
                    value={options.followRedirects ? 'follow' : 'manual'}
                    onChange={(e) => setOptions(o => ({ ...o, followRedirects: e.target.value === 'follow' }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
                  >
                    <option value="follow">Follow redirects</option>
                    <option value="manual">Don't follow</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.useProxy}
                    onChange={(e) => {
                      setOptions(o => ({ ...o, useProxy: e.target.checked }));
                      setProxyWarning(e.target.checked);
                    }}
                    className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-medium">Use server proxy (for CORS-blocked URLs)</span>
                    <p className="text-sm text-slate-500 mt-1">
                      Some URLs can't be checked directly from browser due to CORS. Enable this to use our minimal proxy.
                    </p>
                  </div>
                </label>
                
                {proxyWarning && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-200">
                      Proxy is enabled. Your URLs will be forwarded to a minimal serverless function. 
                      No URLs are logged, stored, or tracked. This adds a small server cost so we only enable it when needed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Action Bar */}
        <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {!isScanning ? (
              <button
                onClick={handleScan}
                disabled={!input.trim() || parseURLs(input).length === 0}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Scan URLs
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Square className="w-5 h-5" />
                Stop
              </button>
            )}
            
            {isScanning && (
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                <span className="text-sm text-slate-400">
                  Checking: {progress.completed} / {progress.total}
                </span>
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={handleCopyErrors}
                disabled={stats.errors === 0}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Errors ({stats.errors})
              </button>
            </div>
          )}
        </section>

        {/* Stats */}
        {results.length > 0 && (
          <section className="mb-6 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-sm">Total:</span>
              <span className="ml-2 font-semibold">{stats.total}</span>
            </div>
            <div className="px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
              <span className="text-green-500 text-sm">OK:</span>
              <span className="ml-2 font-semibold text-green-400">{stats.ok}</span>
            </div>
            <div className="px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
              <span className="text-red-500 text-sm">Errors:</span>
              <span className="ml-2 font-semibold text-red-400">{stats.errors}</span>
            </div>
            <div className="px-4 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <span className="text-yellow-500 text-sm">Redirects:</span>
              <span className="ml-2 font-semibold text-yellow-400">{stats.redirects}</span>
            </div>
          </section>
        )}

        {/* Filter */}
        {results.length > 0 && (
          <section className="mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Results</option>
                <option value="errors">Errors Only</option>
                <option value="redirects">Redirects Only</option>
                <option value="slow">Slow Responses (&gt;5s)</option>
              </select>
              <span className="text-sm text-slate-500">
                Showing {filteredResults.length} of {results.length}
              </span>
            </div>
          </section>
        )}

        {/* Results Table */}
        {filteredResults.length > 0 && (
          <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="table-container max-h-[600px] overflow-auto">
              <table>
                <thead>
                  <tr>
                    <th className="w-16">Status</th>
                    <th>URL</th>
                    <th className="w-24">HTTP</th>
                    <th className="w-32">Time</th>
                    <th>Final URL</th>
                    <th>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="animate-fade-in">
                      <td>
                        <span className={`badge ${getStatusColor(result.status)}`}>
                          {result.status === 'ok' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {result.status === 'error' && <XCircle className="w-3 h-3 mr-1" />}
                          {result.status === 'redirect' && <ArrowRight className="w-3 h-3 mr-1" />}
                          {result.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {result.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="font-mono text-sm max-w-xs truncate" title={result.url}>
                        {result.url}
                      </td>
                      <td className={`font-mono text-sm ${result.httpCode && result.httpCode >= 400 ? 'text-red-400' : result.httpCode && result.httpCode >= 300 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {result.httpCode || '-'}
                      </td>
                      <td className="text-sm">
                        {result.responseTime ? (
                          <span className={result.responseTime > 5000 ? 'text-yellow-400' : ''}>
                            {result.responseTime}ms
                          </span>
                        ) : '-'}
                      </td>
                      <td className="font-mono text-sm max-w-xs truncate text-slate-400" title={result.finalUrl || ''}>
                        {result.finalUrl && result.finalUrl !== result.url ? result.finalUrl : '-'}
                      </td>
                      <td className="text-sm text-red-400 max-w-xs truncate" title={result.errorMessage || ''}>
                        {result.errorMessage || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Empty State */}
        {results.length === 0 && !isScanning && (
          <section className="text-center py-16 text-slate-500">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Enter URLs above and click "Scan URLs" to check their status</p>
            <p className="text-sm mt-2">All processing happens in your browser. No data is stored.</p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% privacy: URLs are processed locally and never stored</span>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Bulk URL Checker - Free and open source
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
