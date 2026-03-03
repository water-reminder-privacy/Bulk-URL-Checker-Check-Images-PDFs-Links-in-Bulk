import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CheckCircle, ArrowRight, Home, ChevronRight } from 'lucide-react';
import { SEOContent } from '../types';
import { generateJSONLD } from '../data/content';

interface SEOPageProps {
  content: SEOContent;
  children?: React.ReactNode;
}

export default function SEOPage({ content, children }: SEOPageProps) {
  const [location] = useLocation();
  const [jsonLd, setJsonLd] = useState('');

  useEffect(() => {
    setJsonLd(generateJSONLD('faq', { faqs: content.faqs }));
  }, [content]);

  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: content.h1, href: location }
  ];

  return (
    <>
      {/* SEO Metadata */}
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="keywords" content={content.keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://bulkurlchecker.com${location}`} />
      
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Breadcrumb */}
      <nav className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumb.map((item, index) => (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 text-slate-500" />}
                {index === 0 ? (
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-white font-medium truncate max-w-xs">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {content.h1}
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            {content.description}
          </p>
        </section>

        {/* Tool Section (for pages that include it) */}
        {children && (
          <section className="mb-16">
            {children}
          </section>
        )}

        {/* Content Section */}
        <section className="prose prose-invert max-w-4xl mb-16">
          <div dangerouslySetInnerHTML={{ __html: content.content
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[hupol])/gm, '<p>')
            .replace(/(?<![>])$/gm, '</p>')
          }} />
        </section>

        {/* FAQ Section */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-slate-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to check your URLs?</h3>
              <p className="text-slate-400">Start scanning now - it's free and takes seconds</p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <CheckCircle className="w-5 h-5" />
              Go to Checker Tool
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RelatedLink href="/bulk-404-error-checker" title="404 Error Checker" description="Find broken links" />
            <RelatedLink href="/redirect-chain-checker" title="Redirect Checker" description="Detect redirect chains" />
            <RelatedLink href="/broken-image-checker" title="Image Checker" description="Find broken images" />
            <RelatedLink href="/server-response-time-checker" title="Speed Checker" description="Measure response times" />
            <RelatedLink href="/ecommerce-image-error-checker" title="Ecommerce Tool" description="Validate product images" />
            <RelatedLink href="/api-endpoint-status-checker" title="API Checker" description="Test endpoints" />
          </div>
        </section>
      </main>
    </>
  );
}

function RelatedLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors"
    >
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-slate-500">{description}</p>
    </Link>
  );
}
