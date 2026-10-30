import { getPool, ensureMigrated } from "../../lib/db.mjs";

const SITE = "https://draftinghelpers.com";

function headerHTML() {
  return `<!-- ===== HEADER ===== -->
<header class="header" id="header">
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

function blogCSS() {
  return `
<style>
  .blog-hero {
    background: linear-gradient(135deg, #f0f4ff 0%, #e8edf5 100%);
    padding: 4rem 0 3rem;
    text-align: center;
  }
  .blog-hero h1 { font-size: 2.25rem; color: #1e293b; margin: 0 0 0.5rem; }
  .blog-hero p { color: #64748b; font-size: 1.1rem; margin: 0; }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
    padding: 3rem 0 4rem;
  }

  .article-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
  }
  .article-card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .article-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .article-card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .article-card-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    color: #64748b;
  }
  .article-card-category {
    background: #eff6ff;
    color: #2563eb;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .article-card-body h2 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    line-height: 1.35;
  }
  .article-card-body h2 a {
    color: #1e293b;
    text-decoration: none;
  }
  .article-card-body h2 a:hover { color: #2563eb; }

  .article-card-subtitle {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 1rem;
    flex: 1;
  }

  .article-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #94a3b8;
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;
    margin-top: auto;
  }

  .blog-empty {
    text-align: center;
    padding: 5rem 1rem;
    color: #64748b;
  }
  .blog-empty h2 { color: #1e293b; margin-bottom: 0.5rem; }

  @media (max-width: 480px) {
    .blog-grid { grid-template-columns: 1fr; }
    .blog-hero h1 { font-size: 1.75rem; }
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

export const handler = async (event) => {
  try {
    await ensureMigrated();
    const pool = getPool();

    const { rows } = await pool.query(
      `SELECT slug, title, subtitle, category, read_time, published_at, image_url
       FROM articles
       WHERE published_at IS NOT NULL
       ORDER BY published_at DESC`
    );

    let cardsHTML;
    if (rows.length === 0) {
      cardsHTML = `<div class="blog-empty">
        <h2>No Articles Yet</h2>
        <p>Check back soon for insights on architectural staffing, remote teams, and growing your firm.</p>
      </div>`;
    } else {
      cardsHTML = `<div class="blog-grid">${rows
        .map(
          (a) => `
        <article class="article-card">
          ${a.image_url ? `<img class="article-card-img" src="${esc(a.image_url)}" alt="${esc(a.title)}" loading="lazy">` : ""}
          <div class="article-card-body">
            <div class="article-card-meta">
              ${a.category ? `<span class="article-card-category">${esc(a.category)}</span>` : ""}
              ${a.read_time ? `<span>${esc(a.read_time)}</span>` : ""}
            </div>
            <h2><a href="/blog/${esc(a.slug)}">${esc(a.title)}</a></h2>
            ${a.subtitle ? `<p class="article-card-subtitle">${esc(a.subtitle)}</p>` : ""}
            <div class="article-card-footer">
              <span>${formatDate(a.published_at)}</span>
              <a href="/blog/${esc(a.slug)}" style="color:#2563eb;text-decoration:none;font-weight:600;">Read more &rarr;</a>
            </div>
          </div>
        </article>`
        )
        .join("")}</div>`;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog — Drafting Helpers | Architectural Staffing Insights</title>
    <meta name="description" content="Insights on architectural staffing, remote teams, CAD drafting, BIM, and growing your architecture firm with offshore talent.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE}/blog">
    <meta property="og:title" content="Blog — Drafting Helpers">
    <meta property="og:description" content="Insights on architectural staffing, remote teams, and growing your architecture firm.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE}/blog">
    <meta property="og:site_name" content="Drafting Helpers">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/analytics.js"></script>
    ${blogCSS()}
</head>
<body>

${headerHTML()}

<section class="blog-hero">
  <div class="container">
    <h1>Drafting Helpers Blog</h1>
    <p>Insights on architectural staffing, remote teams, and firm growth</p>
  </div>
</section>

<main class="container">
  ${cardsHTML}
</main>

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
    console.error("Blog listing error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: "<h1>500 — Server Error</h1><p>Please try again later.</p>",
    };
  }
};
