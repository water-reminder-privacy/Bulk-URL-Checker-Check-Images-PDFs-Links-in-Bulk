export interface URLCheckResult {
  id: string;
  url: string;
  status: 'pending' | 'ok' | 'error' | 'redirect';
  httpCode: number | null;
  finalUrl: string | null;
  redirectCount: number;
  responseTime: number | null;
  errorMessage: string | null;
  method: 'HEAD' | 'GET';
  contentType?: string;
}

export interface CheckOptions {
  concurrency: number;
  timeout: number;
  method: 'HEAD' | 'GET';
  followRedirects: boolean;
  useProxy: boolean;
}

export type FilterType = 'all' | 'errors' | 'redirects' | 'slow';

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  content: string;
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface JSONLD {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}
