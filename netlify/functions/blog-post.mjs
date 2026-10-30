import { getPool, ensureMigrated } from "../../lib/db.mjs";

const SITE = "https://draftinghelpers.com";

function headerHTML() {
  return `<header class="header" id="header">
    <div class="container header-inner">
        <div class="logo-group">
            <a href="/" class="logo" aria-label="Drafting Helpers">
                <div class="logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#fff">
                        <path d="M3 21h18"/>
                        <path d="M5 21V7l7-4 7 4v14"/>
                        <path d="M9 21v-6h6v6"/>
                    </svg>
                </div>
                Drafting Helpers
            </a>
            <span class="powered-by">by <a href="https://hardhathelpers.com" target="_blank" rel="noopener">Hard Hat Helpers</a></span>
        </div>
        <nav class="nav-links" aria-label="Main navigation">
            <a href="/blog">Blog</a>
            <a href="/#roles">Services</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#contact" class="btn btn-primary nav-cta">Get Started</a>
        </nav>
        <button class="mobile-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
    </div>
</header>
<nav class="mobile-nav" aria-label="Mobile navigation">
    <a href="/blog">Blog</a>
    <a href="/#roles">Services</a>
    <a href="/#pricing">Pricing</a>
    <a href="/#how-it-works">How It Works</a>
    <a href="/#contact" class="btn btn-primary">Get Started</a>
</nav>`;
}

function footerHTML() {
  return `<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="logo-group">
                    <a href="/" class="logo">
                        <div class="logo-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#fff">
                                <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/>
                            </svg>
                        </div>
                        Drafting Helpers
                    </a>
                    <span class="powered-by">by <a href="https://hardhathelpers.com" target="_blank" rel="noopener">Hard Hat Helpers</a></span>
                </div>
                <p>Remote staffing solutions built exclusively for architecture firms. Skilled talent, fully managed, at a fraction of the cost.</p>
            </div>
            <div class="footer-col">
                <h4>Roles</h4>
                <a href="/roles/administrative-assistant/">Administrative Assistant</a>
                <a href="/roles/drafter/">Drafter</a>
                <a href="/roles/architectural-designer/">Architectural Designer</a>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <a href="/#about">About Us</a>
                <a href="/#pricing">Pricing</a>
                <a href="/blog">Blog</a>
                <a href="/#faq">FAQ</a>
                <a href="/#contact">Contact</a>
            </div>
            <div class="footer-col">
                <h4>Parent Company</h4>
                <a href="https://hardhathelpers.com" target="_blank" rel="noopener">Hard Hat Helpers</a>
                <h4>Sister Company</h4>
                <a href="https://bluebookhelpers.com" target="_blank" rel="noopener">Bluebook Helpers</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} Drafting Helpers. All rights reserved.</span>
            <span><a href="/privacy/">Privacy Policy</a> &middot; <a href="/terms/">Terms of Service</a></span>
            <span>4645 Van Nuys Blvd. #202, Sherman Oaks, CA 91403</span>
        </div>
    </div>
</footer>`;
}

function articleCSS() {
  return `
<style>
  .article-hero {
    background: linear-gradient(135deg, #f0f4ff 0%, #e8edf5 100%);
    padding: 3.5rem 0 2.5rem;
  }
  .article-hero .container { max-width: 780px; }
  .article-breadcrumb {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 1.25rem;
  }
  .article-breadcrumb a { color: #2563eb; text-decoration: none; }
  .article-breadcrumb a:hover { text-decoration: underline; }

  .article-hero-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.85rem;
    color: #64748b;
  }
  .article-hero-category {
    background: #eff6ff;
    color: #2563eb;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .article-hero h1 {
    font-size: 2.25rem;
    line-height: 1.25;
    color: #1e293b;
    margin: 0 0 0.5rem;
  }
  .article-hero-subtitle {
    font-size: 1.15rem;
    color: #475569;
    margin: 0;
    line-height: 1.5;
  }

  .article-feature-img {
    max-width: 780px;
    margin: -1.5rem auto 0;
    position: relative;
    z-index: 1;
    padding: 0 1rem;
  }
  .article-feature-img img {
    width: 100%;
    border-radius: 12px;
    display: block;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .article-body {
    max-width: 720px;
    margin: 2.5rem auto 4rem;
    padding: 0 1rem;
    font-size: 1.05rem;
    line-height: 1.75;
    color: #334155;
  }
  .article-body h2 { font-size: 1.5rem; color: #1e293b; margin: 2.5rem 0 1rem; }
  .article-body h3 { font-size: 1.25rem; color: #1e293b; margin: 2rem 0 0.75rem; }
  .article-body p { margin: 0 0 1.25rem; }
  .article-body ul, .article-body ol { margin: 0 0 1.25rem; padding-left: 1.5rem; }
  .article-body li { margin-bottom: 0.5rem; }
  .article-body img { max-width: 100%; border-radius: 8px; margin: 1.5rem 0; }
  .article-body blockquote {
    border-left: 4px solid #2563eb;
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-radius: 0 8px 8px 0;
    color: #475569;
  }
  .article-body a { color: #2563eb; }
  .article-body pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .article-body code {
    background: #f1f5f9;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
  .article-body pre code {
    background: none;
    padding: 0;
  }

  .article-faq { max-width: 720px; margin: 0 auto 3rem; padding: 0 1rem; }
  .article-faq h2 { font-size: 1.5rem; color: #1e293b; margin-bottom: 1.5rem; }
  .article-faq-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    overflow: hidden;
  }
  .article-faq-q {
    font-weight: 600;
    padding: 1rem 1.25rem;
    background: #f8fafc;
    color: #1e293b;
    cursor: pointer;
  }
  .article-faq-a {
    padding: 0 1.25rem 1rem;
    color: #475569;
    line-height: 1.6;
  }

  .article-cta {
    max-width: 720px;
    margin: 0 auto 4rem;
    padding: 2rem;
    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
    border-radius: 12px;
    text-align: center;
  }
  .article-cta h3 { color: #1e293b; margin: 0 0 0.5rem; }
  .article-cta p { color: #475569; margin: 0 0 1.25rem; }

  .not-found-page { text-align: center; padding: 5rem 1rem; }
  .not-found-page h1 { font-size: 3rem; color: #1e293b; }
  .not-found-page p { color: #64748b; margin-bottom: 2rem; }

  @media (max-width: 640px) {
    .article-hero h1 { font-size: 1.75rem; }
  }
</style>`;
}

function esc(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function notFoundPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Not Found — Drafting Helpers</title>
    <meta name="robots" content="noindex">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    ${articleCSS()}
</head>
<body>
${headerHTML()}
<div class="not-found-page">
  <h1>404</h1>
  <p>Sorry, we couldn't find that article.</p>
  <a href="/blog" class="btn btn-primary">Browse All Articles</a>
</div>
${footerHTML()}
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

export const handler = async (event) => {
  try {
    // Extract slug from path: /blog/some-slug -> some-slug
    const pathParts = event.path.replace(/^\/+|\/+$/g, "").split("/");
    // pathParts = ["blog", "some-slug"]
    const slug = pathParts.length >= 2 ? pathParts.slice(1).join("/") : null;

    if (!slug) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: notFoundPage(),
      };
    }

    await ensureMigrated();
    const pool = getPool();

    const { rows } = await pool.query(
      `SELECT * FROM articles WHERE slug = $1 AND published_at IS NOT NULL LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: notFoundPage(),
      };
    }

    const a = rows[0];
    const canonicalURL = `${SITE}/blog/${a.slug}`;
    const pageTitle = a.meta_title || a.title || "Article";
    const pageDesc = a.meta_description || a.subtitle || "";

    // Build FAQ section if present
    let faqHTML = "";
    let faqSchemaJSON = "";
    if (a.faqs && Array.isArray(a.faqs) && a.faqs.length > 0) {
      const faqItems = a.faqs
        .map(
          (f) => `<div class="article-faq-item">
            <div class="article-faq-q">${esc(f.question)}</div>
            <div class="article-faq-a">${esc(f.answer)}</div>
          </div>`
        )
        .join("");

      faqHTML = `<section class="article-faq">
        <h2>Frequently Asked Questions</h2>
        ${faqItems}
      </section>`;

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: a.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      };
      faqSchemaJSON = `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
    }

    // JSON-LD from the article itself
    let jsonLdTag = "";
    if (a.json_ld_schema) {
      const schema =
        typeof a.json_ld_schema === "string"
          ? a.json_ld_schema
          : JSON.stringify(a.json_ld_schema);
      jsonLdTag = `<script type="application/ld+json">${schema}</script>`;
    }

    const html = `<!DOCTYPE html>
<html lang="${a.language_code || "en"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(pageTitle)} — Drafting Helpers</title>
    <meta name="description" content="${esc(pageDesc)}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="${canonicalURL}">

    <meta property="og:title" content="${esc(pageTitle)}">
    <meta property="og:description" content="${esc(pageDesc)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonicalURL}">
    <meta property="og:site_name" content="Drafting Helpers">
    ${a.image_url ? `<meta property="og:image" content="${esc(a.image_url)}">` : ""}

    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/analytics.js"></script>
    ${articleCSS()}
    ${jsonLdTag}
    ${faqSchemaJSON}
</head>
<body>

${headerHTML()}

<section class="article-hero">
  <div class="container">
    <div class="article-breadcrumb">
      <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; ${esc(a.title)}
    </div>
    <div class="article-hero-meta">
      ${a.category ? `<span class="article-hero-category">${esc(a.category)}</span>` : ""}
      ${a.read_time ? `<span>${esc(a.read_time)}</span>` : ""}
      ${a.published_at ? `<span>${formatDate(a.published_at)}</span>` : ""}
      ${a.author_name ? `<span>by ${esc(a.author_name)}</span>` : ""}
    </div>
    <h1>${esc(a.title)}</h1>
    ${a.subtitle ? `<p class="article-hero-subtitle">${esc(a.subtitle)}</p>` : ""}
  </div>
</section>

${
  a.image_url
    ? `<div class="article-feature-img"><img src="${esc(a.image_url)}" alt="${esc(a.title)}" loading="eager"></div>`
    : ""
}

<article class="article-body">
  ${a.content_html || ""}
</article>

${faqHTML}

<div class="article-cta">
  <h3>Need Remote Architectural Staff?</h3>
  <p>Drafting Helpers places vetted drafters, designers, and admin assistants into architecture firms — starting at $2,100/mo.</p>
  <a href="/#contact" class="btn btn-primary">Get a Free Consultation</a>
</div>

${footerHTML()}

<script src="/assets/site.js" defer></script>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: html,
    };
  } catch (err) {
    console.error("Blog post error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: "<h1>500 — Server Error</h1><p>Please try again later.</p>",
    };
  }
};
