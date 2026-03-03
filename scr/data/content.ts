import { SEOContent, FAQ } from '../types';

export const homeContent: SEOContent = {
  title: 'Bulk URL Checker - Check Multiple URLs for Free | Image & PDF Status',
  description: 'Free bulk URL checker tool. Check 1000s of URLs, images, and PDFs for broken links, 404 errors, and redirects. 100% client-side, no tracking.',
  keywords: ['bulk url checker', 'bulk image checker', 'check multiple urls', 'broken link checker', 'batch url validator', 'free url checker'],
  h1: 'Bulk URL Checker - Check Images, PDFs & Links in Bulk',
  content: `
# Bulk URL Checker - Find Broken Links Fast

The Bulk URL Checker is a free, privacy-first tool that helps you check thousands of URLs, images, and documents for errors. Whether you're auditing a website, migrating content, or validating product images, our tool gets the job done quickly and accurately.

## What is a Bulk URL Checker?

A bulk URL checker is a tool that allows you to test multiple URLs simultaneously to determine if they are working properly. Instead of checking each URL manually, you can paste hundreds or thousands of URLs and get instant results showing which ones return errors.

This is essential for:
- **Technical SEO audits** - Finding broken links that hurt your search rankings
- **Ecommerce** - Validating product images and links
- **Website migrations** - Ensuring all old URLs redirect properly
- **Developer workflows** - Testing API endpoints and CDN links

## How Does Our Bulk URL Checker Work?

Our tool operates in two modes:

1. **Client-Side (Default)**: Uses your browser to check URLs directly. This is 100% private - no URLs are sent to any server. However, some URLs may be blocked by CORS (Cross-Origin Resource Sharing) policies.

2. **Proxy Mode (Optional)**: When CORS blocks direct checks, you can enable our minimal serverless proxy. This forwards requests without logging, storing, or tracking any data.

### Key Features:
- Supports JPG, JPEG, PNG, WebP, GIF, and PDF files
- Checks HTTP status codes (200, 301, 302, 404, 500)
- Detects redirect chains
- Measures response times
- Exports results to CSV
- Deduplicates URLs automatically
- Filters for errors, redirects, or slow responses

## Understanding HTTP Status Codes

When checking URLs, you'll encounter various HTTP status codes. Here's what they mean:

- **200 OK**: The URL is working correctly
- **301 Moved Permanently**: The URL has permanently moved to a new location
- **302 Found**: The URL temporarily redirects to another location
- **404 Not Found**: The page or resource doesn't exist
- **500 Server Error**: The server encountered an error

Broken images (404 errors on image URLs) can significantly impact your website's user experience and SEO. Search engines may penalize sites with many broken image links.

## Use Cases

### Ecommerce Image Validation
Online stores often have hundreds or thousands of product images. A single broken image can lead to lost sales. Use our tool to:
- Verify all product images load correctly
- Find images returning 404 errors
- Check CDN-linked images

### Technical SEO Audits
Search engines prefer websites with working links. Use our bulk checker to:
- Find all broken internal and external links
- Identify redirect chains that slow down crawling
- Locate slow-loading resources

### Website Migration
When migrating to a new domain or CMS:
- Verify all old URLs have proper redirects
- Find any 404 errors that need fixing
- Ensure canonical URLs are set correctly

### API Endpoint Monitoring
Developers can use the tool to:
- Test multiple API endpoints quickly
- Verify webhook URLs are active
- Check service availability across regions
  `,
  faqs: [
    {
      question: 'How do I check multiple URLs at once?',
      answer: 'Simply paste your URLs into the text area (one URL per line), configure your options like concurrency and timeout, then click "Scan URLs". The tool will check all URLs and display the results in a table.'
    },
    {
      question: 'Can I check images in bulk?',
      answer: 'Yes! Our tool supports JPG, JPEG, PNG, WebP, GIF, and PDF files. Just paste the image URLs and the tool will check each one for availability and errors.'
    },
    {
      question: 'Is the bulk URL checker free?',
      answer: 'Yes, completely free. No registration required, no paid features, and no usage limits (up to 10,000 URLs per batch).'
    },
    {
      question: 'Is it safe to check my URLs?',
      answer: 'Absolutely. Our tool runs primarily in your browser (client-side), meaning your URLs never leave your device unless you enable the optional proxy. We do not store, log, or track any URLs.'
    },
    {
      question: 'Why do some URLs show CORS errors?',
      answer: 'Browsers block requests to certain domains for security reasons (CORS policy). If you encounter this, enable "Use server proxy" in the options to bypass CORS restrictions.'
    },
    {
      question: 'How do I export results to CSV?',
      answer: 'After scanning, click the "Export CSV" button to download all results including URL, status, HTTP code, response time, and error messages.'
    },
    {
      question: 'What does "concurrency" mean?',
      answer: 'Concurrency controls how many URLs are checked simultaneously. Higher values (up to 50) make the scan faster but use more resources. Lower values are more stable on slower connections.'
    },
    {
      question: 'What HTTP codes should I worry about?',
      answer: 'Focus on 404 (not found) and 5xx (server errors) as these indicate problems. 301/302 redirects are usually fine but may affect SEO if there are too many redirect chains.'
    }
  ]
};

export const pageContents: Record<string, SEOContent> = {
  '/bulk-http-status-code-checker': {
    title: 'Bulk HTTP Status Code Checker - Check Multiple URL Responses',
    description: 'Check HTTP status codes for multiple URLs at once. Identify 200, 301, 302, 404, and 500 errors in bulk. Free and fast.',
    keywords: ['bulk http status checker', 'http status code checker', 'check http codes bulk', 'batch http response checker'],
    h1: 'Bulk HTTP Status Code Checker',
    content: `
# Bulk HTTP Status Code Checker

The Bulk HTTP Status Code Checker is an essential tool for web developers, SEO professionals, and website owners who need to verify the status of multiple URLs quickly.

## What Are HTTP Status Codes?

HTTP status codes are three-digit responses returned by a server when a browser requests a webpage or resource. They indicate whether the request was successful, redirected, or failed.

### Common Status Codes:

**Success Codes (2xx)**
- 200 OK: The request succeeded
- 201 Created: Resource was created successfully

**Redirection Codes (3xx)**
- 301 Moved Permanently: Permanent redirect
- 302 Found: Temporary redirect
- 304 Not Modified: Cached version is valid

**Client Error Codes (4xx)**
- 400 Bad Request: Malformed request
- 401 Unauthorized: Authentication required
- 403 Forbidden: Access denied
- 404 Not Found: Resource doesn't exist

**Server Error Codes (5xx)**
- 500 Internal Server Error: Generic server error
- 502 Bad Gateway: Invalid response from upstream
- 503 Service Unavailable: Server is down
- 504 Gateway Timeout: Upstream server timed out

## Why Check HTTP Status Codes?

Checking HTTP status codes helps you:
- Identify broken links (404s)
- Find redirect chains that slow down users
- Detect server errors (5xx) that need attention
- Verify redirects are working correctly
- Ensure proper canonical URLs

## How to Use This Tool

1. Paste your list of URLs (one per line)
2. Choose HEAD or GET method
3. Set concurrency level
4. Click Scan
5. Review results and export to CSV

The tool automatically deduplicates URLs and handles errors gracefully.
    `,
    faqs: [
      { question: 'What is the difference between HEAD and GET methods?', answer: 'HEAD requests only fetch headers without downloading the body, making them faster. GET downloads the full content, more accurate but slower. Use HEAD for bulk checking.' },
      { question: 'Why am I seeing 404 errors?', answer: '404 means the URL no longer exists or was typed incorrectly. Check the URL for typos or verify the page has been moved.' },
      { question: 'Should I worry about 301 redirects?', answer: '301s are fine for SEO when used correctly. However, many redirect chains can slow down your site and should be minimized.' }
    ]
  },
  '/check-multiple-urls-at-once': {
    title: 'Check Multiple URLs at Once - Batch URL Validator',
    description: 'Validate multiple URLs simultaneously. Perfect for checking website availability, finding broken links, and batch URL validation.',
    keywords: ['check multiple urls at once', 'batch url validator', 'validate multiple urls', 'bulk url validator'],
    h1: 'Check Multiple URLs at Once',
    content: `
# Check Multiple URLs at Once

Our batch URL validator lets you check hundreds or thousands of URLs in minutes, making it perfect for website audits and maintenance.

## Benefits of Batch URL Checking

Checking URLs individually is time-consuming. Our tool lets you:
- Check up to 10,000 URLs in one batch
- See real-time progress as URLs are checked
- Export results for further analysis
- Filter for specific status codes

## Features

- Deduplication of identical URLs
- Automatic URL normalization
- Support for images, PDFs, and regular URLs
- Custom timeout settings
- Concurrent checking for speed

## Best Practices

1. Start with lower concurrency (5-10) for stability
2. Increase timeout for slower servers
3. Use the CSV export to track issues
4. Regular checks prevent link rot
    `,
    faqs: [
      { question: 'How many URLs can I check at once?', answer: 'You can check up to 10,000 URLs in a single batch. For larger lists, split into multiple batches.' },
      { question: 'Does this work with HTTPS URLs?', answer: 'Yes, both HTTP and HTTPS URLs are fully supported.' }
    ]
  },
  '/bulk-404-error-checker': {
    title: 'Bulk 404 Error Checker - Find Broken Links Fast',
    description: 'Find all 404 errors on your website with our bulk checker. Scan thousands of URLs to identify broken links instantly.',
    keywords: ['bulk 404 checker', '404 error checker', 'find broken links bulk', 'broken link finder'],
    h1: 'Bulk 404 Error Checker',
    content: `
# Bulk 404 Error Checker

404 errors frustrate users and hurt SEO. Our bulk checker finds all broken links on your site in minutes.

## Understanding 404 Errors

A 404 error means the server cannot find the requested resource. This happens when:
- A page was deleted
- A URL was mistyped
- A link points to a moved page
- The domain expired

## Impact on SEO

404 errors can:
- Crawl budget being wasted
- Poor user experience
- Lower search rankings
- Lost link equity

## Finding and Fixing 404s

1. Run a bulk scan
2. Filter for errors only
3. Copy error URLs
4. Set up redirects or fix links

Our tool makes this process fast and easy.
    `,
    faqs: [
      { question: 'How do I fix 404 errors?', answer: 'Either redirect the old URL to a new one (301 redirect) or restore the missing page.' },
      { question: 'Are 404 errors bad for SEO?', answer: 'A few 404s are normal, but many can waste crawl budget and hurt rankings.' }
    ]
  },
  '/301-redirect-checker': {
    title: '301 Redirect Checker - Check Permanent Redirects',
    description: 'Verify 301 redirects are working correctly. Check multiple URLs for proper permanent redirects.',
    keywords: ['301 redirect checker', 'check 301 redirect', 'permanent redirect checker'],
    h1: '301 Redirect Checker',
    content: `
# 301 Redirect Checker

301 redirects are crucial for SEO and user experience when moving content. Our checker verifies redirects are set up correctly.

## What is a 301 Redirect?

A 301 redirect tells browsers and search engines that a page has permanently moved to a new location. This:
- Passes SEO value to the new URL
- Prevents 404 errors for users
- Consolidates link equity

## How to Use

1. Enter URLs to check
2. Enable "Follow redirects"
3. Run the scan
4. Review redirect destinations
    `,
    faqs: [
      { question: 'How long do 301 redirects take?', answer: 'Redirects happen instantly in the browser.' },
      { question: 'Do 301s pass all SEO value?', answer: 'Most SEO value passes through, though some may be lost.' }
    ]
  },
  '/redirect-chain-checker': {
    title: 'Redirect Chain Checker - Find Multiple Redirects',
    description: 'Detect redirect chains and loops. Check if URLs have multiple redirects slowing down your site.',
    keywords: ['redirect chain checker', 'check redirect chains', 'multiple redirects finder'],
    h1: 'Redirect Chain Checker',
    content: `
# Redirect Chain Checker

Redirect chains (A → B → C) slow down your site and waste crawl budget. Find them with our tool.

## Why Redirect Chains Are Problematic

- Slower page load times
- Wasted crawl budget
- Potential for redirect loops
- Poor user experience

## Using the Tool

Our tool detects:
- Single redirects (A → B)
- Multiple redirects (A → B → C)
- Redirect loops
- Final destination URLs
    `,
    faqs: [
      { question: 'How many redirects are too many?', answer: 'Ideally, no more than 2-3 redirects per URL.' }
    ]
  },
  '/500-server-error-checker': {
    title: '500 Server Error Checker - Find Server Issues',
    description: 'Detect 500 and 5xx server errors across your website. Quickly identify server-side problems.',
    keywords: ['500 error checker', 'server error checker', '5xx error finder'],
    h1: '500 Server Error Checker',
    content: `
# 500 Server Error Checker

Server errors (5xx) indicate problems with your web server. Find them quickly before they impact users.

## Common 5xx Errors

- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable
- 504: Gateway Timeout

## Why They Matter

5xx errors mean your server isn't handling requests properly. This can:
- Crash entire pages
- Lose customers
- Trigger search engine warnings
    `,
    faqs: [
      { question: 'How do I fix 500 errors?', answer: 'Check server logs, recent code changes, and resource usage.' }
    ]
  },
  '/server-response-time-checker': {
    title: 'Server Response Time Checker - Measure Speed',
    description: 'Check server response times for multiple URLs. Identify slow-loading pages and optimize performance.',
    keywords: ['response time checker', 'server speed test bulk', 'page load time bulk'],
    h1: 'Server Response Time Checker',
    content: `
# Server Response Time Checker

Fast servers are crucial for user experience and SEO. Check response times across your site.

## What is Response Time?

Response time is how long it takes for a server to respond to a request. Measured in milliseconds (ms).

## Good vs Bad Response Times

- Fast: < 200ms
- Acceptable: 200-500ms
- Slow: 500ms - 2s
- Very Slow: > 2s

## Optimizing Response Times

- Use a CDN
- Enable caching
- Optimize database queries
- Use faster hosting
    `,
    faqs: [
      { question: 'What is a good response time?', answer: 'Under 200ms is excellent, under 500ms is good.' }
    ]
  },
  '/broken-image-checker': {
    title: 'Broken Image Checker - Find Missing Images',
    description: 'Find broken images on your website with our bulk checker. Supports JPG, PNG, WebP, GIF formats.',
    keywords: ['broken image checker', 'find missing images', 'bulk image validator'],
    h1: 'Broken Image Checker',
    content: `
# Broken Image Checker

Images are crucial for visual appeal and SEO. Find and fix broken images quickly.

## Why Broken Images Hurt

- Poor user experience
- Lower engagement
- Damaged credibility
- SEO penalties

## Supported Formats

- JPG/JPEG
- PNG
- WebP
- GIF

## Best Practices

1. Regular image audits
2. Use proper image hosting
3. Set up 301 redirects for moved images
4. Use alt text for accessibility
    `,
    faqs: [
      { question: 'How do broken images affect SEO?', answer: 'Search engines may penalize sites with many broken images.' }
    ]
  },
  '/image-404-checker': {
    title: 'Image 404 Checker - Find Missing Image Links',
    description: 'Check image URLs for 404 errors. Validate product images and website graphics in bulk.',
    keywords: ['image 404 checker', 'check image urls', 'missing image finder'],
    h1: 'Image 404 Checker',
    content: `
# Image 404 Checker

Find all images returning 404 errors. Essential for ecommerce and content-heavy sites.

## Common Causes

- File deleted from server
- Wrong file path
- Case sensitivity issues
- CDN configuration errors
    `,
    faqs: [
      { question: 'Why do my images show 404?', answer: 'Check the file path, ensure the file exists on the server.' }
    ]
  },
  '/bulk-image-status-checker': {
    title: 'Bulk Image Status Checker - Check Image URLs',
    description: 'Check status codes for multiple image URLs. Verify all images are accessible and loading correctly.',
    keywords: ['bulk image status checker', 'check image status', 'validate image urls'],
    h1: 'Bulk Image Status Checker',
    content: `
# Bulk Image Status Checker

Validate all your image URLs at once. Ensures every image on your site is accessible.
    `,
    faqs: []
  },
  '/image-url-validator': {
    title: 'Image URL Validator - Validate Image Links',
    description: 'Validate image URLs for correctness. Check if image links are working and accessible.',
    keywords: ['image url validator', 'validate image links', 'check image accessibility'],
    h1: 'Image URL Validator',
    content: `
# Image URL Validator

Validate that your image URLs point to actual images and are accessible.
    `,
    faqs: []
  },
  '/cdn-link-checker': {
    title: 'CDN Link Checker - Verify CDN URLs',
    description: 'Check CDN links for errors. Verify content delivery network URLs are working properly.',
    keywords: ['cdn link checker', 'check cdn urls', 'verify cdn links'],
    h1: 'CDN Link Checker',
    content: `
# CDN Link Checker

Verify all your CDN-hosted content is accessible. CDN issues can affect global performance.
    `,
    faqs: []
  },
  '/technical-seo-link-audit-tool': {
    title: 'Technical SEO Link Audit Tool',
    description: 'Comprehensive link audit tool for SEO. Find broken links, redirects, and performance issues.',
    keywords: ['technical seo audit', 'link audit tool', 'seo link checker'],
    h1: 'Technical SEO Link Audit Tool',
    content: `
# Technical SEO Link Audit Tool

A complete solution for technical SEO audits. Find all link issues that affect your rankings.

## What to Check

- Broken internal links
- Broken external links
- Redirect chains
- Missing alt text (manual)
- Link equity flow
    `,
    faqs: []
  },
  '/website-migration-link-checker': {
    title: 'Website Migration Link Checker',
    description: 'Verify all links during website migration. Ensure proper redirects and no broken links.',
    keywords: ['website migration checker', 'migration link audit', 'redirect verification'],
    h1: 'Website Migration Link Checker',
    content: `
# Website Migration Link Checker

Essential for website migrations. Verify every old URL has proper handling.

## Migration Checklist

- 301 redirects for all changed URLs
- No 404 errors on old URLs
- Proper canonical tags
- XML sitemap updated
    `,
    faqs: []
  },
  '/ecommerce-image-error-checker': {
    title: 'Ecommerce Image Error Checker',
    description: 'Find broken product images in your online store. Validate inventory images in bulk.',
    keywords: ['ecommerce image checker', 'product image error', 'shop image validator'],
    h1: 'Ecommerce Image Error Checker',
    content: `
# Ecommerce Image Error Checker

Broken product images cost sales. Find and fix them before customers do.

## Why It Matters

- Lost sales
- Damaged trust
- Poor SEO rankings
- Return requests
    `,
    faqs: []
  },
  '/batch-url-validator': {
    title: 'Batch URL Validator - Validate URLs in Bulk',
    description: 'Validate multiple URLs at once. Check if URLs are accessible and return proper status.',
    keywords: ['batch url validator', 'validate urls bulk', 'bulk url validation'],
    h1: 'Batch URL Validator',
    content: `
# Batch URL Validator

Validate hundreds or thousands of URLs quickly and accurately.
    `,
    faqs: []
  },
  '/api-endpoint-status-checker': {
    title: 'API Endpoint Status Checker',
    description: 'Check API endpoint availability. Test multiple endpoints for proper responses.',
    keywords: ['api endpoint checker', 'api status checker', 'api health check'],
    h1: 'API Endpoint Status Checker',
    content: `
# API Endpoint Status Checker

Developers can test API endpoints quickly. Verify endpoints return expected status codes.

## Use Cases

- Health checks
- Endpoint monitoring
- Integration testing
- Service availability
    `,
    faqs: []
  },
  '/bulk-url-checker-online-free': {
    title: 'Free Bulk URL Checker Online',
    description: 'Free online bulk URL checker. No registration required. Check URLs, images, and PDFs.',
    keywords: ['free bulk url checker', 'online url checker', 'free url validator'],
    h1: 'Free Bulk URL Checker Online',
    content: `
# Free Bulk URL Checker Online

Our free tool helps you check URLs without any cost or registration.

## Why It's Free

We believe in free tools for the web community. The tool runs primarily client-side, keeping our costs minimal.

## Features Included

- Unlimited checks
- CSV export
- Multiple filters
- Progress tracking
    `,
    faqs: []
  }
};

export function generateJSONLD(pageType: 'home' | 'page' | 'faq', data?: { faqs?: FAQ[] }): string {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bulk URL Checker',
    description: 'Free bulk URL, image, and PDF status checker tool',
    url: 'https://bulkurlchecker.com',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  if (pageType === 'faq' && data?.faqs) {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }, null, 2);
  }

  return JSON.stringify(baseSchema, null, 2);
}
