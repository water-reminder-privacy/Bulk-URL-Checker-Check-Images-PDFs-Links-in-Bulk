import { URLCheckResult, CheckOptions } from '../types';

// Parse and clean URLs from input
export function parseURLs(input: string): string[] {
  const lines = input.split(/[\n,;\t]+/);
  const urlSet = new Set<string>();
  
  for (let line of lines) {
    // Trim whitespace
    line = line.trim();
    
    // Remove quotes if present
    line = line.replace(/^["']|["']$/g, '');
    
    // Skip empty lines
    if (!line) continue;
    
    // Try to detect if it's a URL, add https:// if missing
    if (line && !line.match(/^https?:\/\//i)) {
      // Check if it looks like a domain or URL
      if (line.match(/^[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]/)) {
        line = 'https://' + line;
      }
    }
    
    // Basic URL validation
    try {
      const url = new URL(line);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        urlSet.add(url.toString());
      }
    } catch {
      // Skip invalid URLs
      continue;
    }
  }
  
  return Array.from(urlSet);
}

// Check a single URL
export async function checkURL(
  url: string,
  options: CheckOptions,
  proxyUrl?: string
): Promise<URLCheckResult> {
  const startTime = performance.now();
  const result: URLCheckResult = {
    id: Math.random().toString(36).substr(2, 9),
    url,
    status: 'pending',
    httpCode: null,
    finalUrl: null,
    redirectCount: 0,
    responseTime: null,
    errorMessage: null,
    method: options.method,
  };

  try {
    let fetchUrl: string;
    let fetchOptions: RequestInit;

    if (options.useProxy && proxyUrl) {
      // Use proxy
      fetchUrl = `${proxyUrl}?url=${encodeURIComponent(url)}`;
      fetchOptions = {
        method: 'GET',
        signal: AbortSignal.timeout(options.timeout),
      };
    } else {
      // Direct browser fetch
      fetchUrl = url;
      fetchOptions = {
        method: options.method,
        mode: 'cors',
        signal: AbortSignal.timeout(options.timeout),
        redirect: options.followRedirects ? 'follow' : 'manual',
      };
    }

    const response = await fetch(fetchUrl, fetchOptions);
    const endTime = performance.now();
    
    result.httpCode = response.status;
    result.responseTime = Math.round(endTime - startTime);
    result.finalUrl = response.url;
    
    // Count redirects
    if (response.redirected) {
      result.redirectCount = 1;
      if (options.followRedirects && response.url !== url) {
        result.status = 'redirect';
      }
    }

    // Check status
    if (response.ok) {
      result.status = 'ok';
      result.contentType = response.headers.get('content-type') || undefined;
    } else if (response.status >= 300 && response.status < 400) {
      result.status = 'redirect';
    } else {
      result.status = 'error';
      result.errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
  } catch (error) {
    const endTime = performance.now();
    result.responseTime = Math.round(endTime - startTime);
    result.status = 'error';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        result.errorMessage = 'Request timed out';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
        result.errorMessage = 'CORS blocked or network error - try using proxy';
      } else {
        result.errorMessage = error.message;
      }
    } else {
      result.errorMessage = 'Unknown error occurred';
    }
  }

  return result;
}

// Batch check URLs with concurrency control
export async function checkURLs(
  urls: string[],
  options: CheckOptions,
  onProgress: (completed: number, total: number, result: URLCheckResult) => void,
  proxyUrl?: string
): Promise<URLCheckResult[]> {
  const results: URLCheckResult[] = [];
  let completed = 0;
  
  // Process in chunks based on concurrency
  for (let i = 0; i < urls.length; i += options.concurrency) {
    const chunk = urls.slice(i, i + options.concurrency);
    
    const promises = chunk.map(async (url) => {
      const result = await checkURL(url, options, proxyUrl);
      completed++;
      onProgress(completed, urls.length, result);
      return result;
    });
    
    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }
  
  return results;
}

// Export results to CSV
export function exportToCSV(results: URLCheckResult[]): string {
  const headers = ['URL', 'Status', 'HTTP Code', 'Final URL', 'Redirect Count', 'Response Time (ms)', 'Error Message'];
  const rows = results.map(r => [
    r.url,
    r.status,
    r.httpCode?.toString() || '',
    r.finalUrl || '',
    r.redirectCount.toString(),
    r.responseTime?.toString() || '',
    r.errorMessage || '',
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
  ].join('\n');
  
  return csvContent;
}

// Get status color class
export function getStatusColor(status: URLCheckResult['status']): string {
  switch (status) {
    case 'ok':
      return 'badge-success';
    case 'error':
      return 'badge-error';
    case 'redirect':
      return 'badge-warning';
    case 'pending':
      return 'badge-info';
    default:
      return '';
  }
}

// Get HTTP code color
export function getHTTPCodeColor(code: number | null): string {
  if (!code) return '';
  if (code >= 200 && code < 300) return 'text-green-500';
  if (code >= 300 && code < 400) return 'text-yellow-500';
  if (code >= 400 && code < 500) return 'text-orange-500';
  if (code >= 500) return 'text-red-500';
  return '';
}
