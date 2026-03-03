import { Route, Switch } from 'wouter';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import URLChecker from './components/URLChecker';
import SEOPage from './components/SEOPage';
import { homeContent, pageContents } from './data/content';
import { pageContents as additionalPages } from './data/additionalContent';
import './index.css';

// Merge all page contents
const allPages = { ...pageContents, ...additionalPages };

function HomePage() {
  return (
    <SEOPage content={homeContent}>
      <URLChecker />
    </SEOPage>
  );
}

function StaticPage({ content }: { content: typeof allPages[string] }) {
  return <SEOPage content={content} />;
}

function AboutPage() {
  return (
    <SEOPage content={{
      title: 'About - Bulk URL Checker',
      description: 'Learn about Bulk URL Checker - a free, privacy-first tool for checking URLs, images, and documents in bulk.',
      keywords: ['about', 'bulk url checker', 'free tool'],
      h1: 'About Bulk URL Checker',
      content: `
# About Bulk URL Checker

Bulk URL Checker is a free, privacy-first tool designed for web developers, SEO professionals, and website owners who need to validate multiple URLs quickly and efficiently.

## Our Mission

We believe in free tools that help make the web better. Our goal is to provide a reliable, fast, and completely private way to check URLs without any cost or registration.

## Why We Built This

- Broken links frustrate users and hurt SEO
- Existing tools often require payment or registration
- Most tools don't prioritize privacy

## Privacy First

Your privacy is our top priority:
- All checks run in your browser by default
- No URLs are stored or logged
- No user accounts required
- No tracking or analytics

## Features

- Check up to 10,000 URLs at once
- Support for images (JPG, PNG, WebP, GIF) and PDFs
- CSV export for reporting
- Real-time progress tracking
- Filter for errors, redirects, or slow responses

## Technology

Built with modern web technologies:
- React for the user interface
- Browser Fetch API for URL checking
- Cloudflare Workers for optional proxy
- Deployed on Cloudflare Pages

## Contact

For questions or feedback, contact us at: hello@bulkurlchecker.com
      `,
      faqs: [
        { question: 'Is Bulk URL Checker really free?', answer: 'Yes, completely free with no premium features or limits.' },
        { question: 'Do you store my URLs?', answer: 'No. URLs are processed in your browser and never stored on our servers.' },
        { question: 'Can I use this for commercial projects?', answer: 'Yes, feel free to use it for any project, commercial or personal.' }
      ]
    }} />
  );
}

function ContactPage() {
  return (
    <SEOPage content={{
      title: 'Contact - Bulk URL Checker',
      description: 'Contact Bulk URL Checker. Have questions or feedback? We\'d love to hear from you.',
      keywords: ['contact', 'feedback', 'support'],
      h1: 'Contact Us',
      content: `
# Contact Us

We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, our team is here to help.

## Get in Touch

The easiest way to reach us is by email:

**Email:** hello@bulkurlchecker.com

We aim to respond within 24-48 hours.

## What You Can Contact Us About

- Bug reports
- Feature requests
- General questions
- Partnership opportunities
- API access inquiries

## Feedback

Your feedback helps us improve! Let us know:
- How we can make the tool better
- Features you'd like to see
- Issues you've encountered

## Note

We're a small team building free tools. While we try to respond to all messages, please understand that we may not be able to respond to every inquiry immediately.
      `,
      faqs: [
        { question: 'How quickly do you respond?', answer: 'We aim to respond within 24-48 hours.' },
        { question: 'Do you offer support for bulk users?', answer: 'Yes, contact us for custom solutions.' }
      ]
    }} />
  );
}

function PrivacyPage() {
  return (
    <SEOPage content={{
      title: 'Privacy Policy - Bulk URL Checker',
      description: 'Privacy policy for Bulk URL Checker. We do not store, track, or share your data.',
      keywords: ['privacy', 'privacy policy', 'data'],
      h1: 'Privacy Policy',
      content: `
# Privacy Policy

Last updated: ${new Date().getFullYear()}

## Our Privacy Promise

Bulk URL Checker is built with privacy as a core principle. We believe you shouldn't have to compromise your privacy to use helpful tools.

## What We Don't Do

- We don't require user accounts
- We don't store your URLs
- We don't log your IP addresses
- We don't use cookies
- We don't run analytics or tracking
- We don't sell your data

## How It Works

### Client-Side Checking (Default)

When you use the default mode, all URL checks happen directly in your browser using the Fetch API. Your URLs never leave your device until you explicitly choose to use our optional proxy.

### Proxy Mode (Optional)

When you enable proxy mode:
- URLs are sent to a minimal serverless function
- The function only forwards your request and returning the response
- No logs are kept
- No data is persisted
- The function has no database or storage

## Third-Party Services

We don't use any third-party analytics or tracking services. The only external service is Cloudflare, which handles DNS and SSL for our domain.

## Security

- All connections use HTTPS
- We don't store any user data
- The proxy function has no persistence layer

## Changes to This Policy

If we make any changes to this privacy policy, we'll update this page. This policy has been in effect since we launched.

## Contact

If you have questions about this policy, contact us at hello@bulkurlchecker.com
      `,
      faqs: [
        { question: 'Do you store my URLs?', answer: 'No, URLs are processed in memory and discarded immediately.' },
        { question: 'Can I trust this tool?', answer: 'Yes, you can verify our claims by inspecting the code - there are no data storage mechanisms.' }
      ]
    }} />
  );
}

function ChangelogPage() {
  return (
    <SEOPage content={{
      title: 'Changelog - Bulk URL Checker',
      description: 'Latest updates and changes to Bulk URL Checker.',
      keywords: ['changelog', 'updates', 'releases'],
      h1: 'Changelog',
      content: `
# Changelog

All notable changes to Bulk URL Checker are documented here.

## Version 1.0.0 - Initial Release

### Added
- Bulk URL checking with up to 10,000 URLs
- Support for images (JPG, JPEG, PNG, WebP, GIF) and PDFs
- HEAD and GET request methods
- Redirect detection and following
- Response time measurement
- CSV export functionality
- Copy errors to clipboard
- Filter results by errors, redirects, or slow responses
- Concurrency control (1-50 parallel checks)
- Timeout configuration
- Optional proxy mode for CORS-blocked URLs
- 18 SEO-optimized pages
- JSON-LD structured data
- Sitemap and robots.txt
- Mobile responsive design
- Dark theme

### Pages Added
- Bulk HTTP Status Code Checker
- Check Multiple URLs at Once
- Bulk 404 Error Checker
- 301 Redirect Checker
- Redirect Chain Checker
- 500 Server Error Checker
- Server Response Time Checker
- Broken Image Checker
- Image 404 Checker
- Bulk Image Status Checker
- Image URL Validator
- CDN Link Checker
- Technical SEO Link Audit Tool
- Website Migration Link Checker
- Ecommerce Image Error Checker
- Batch URL Validator
- API Endpoint Status Checker
- Free Bulk URL Checker Online

## Coming Soon

- Batch processing for larger lists
- Scheduled checks
- Email notifications for monitored URLs
- Custom headers support

## Feedback

Have ideas? Contact us at hello@bulkurlchecker.com
      `,
      faqs: []
    }} />
  );
}

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        
        {/* Main pages */}
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/changelog" component={ChangelogPage} />
        
        {/* SEO Tool Pages */}
        {Object.entries(allPages).map(([pagePath, content]) => (
          <Route
            key={pagePath}
            path={pagePath}
            component={() => <StaticPage content={content} />}
          />
        ))}
        
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-slate-400 mb-8">Page not found</p>
              <a href="/" className="px-6 py-3 bg-blue-500 rounded-lg font-medium">
                Go Home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
      <Analytics />
    </Layout>
  );
}
