"""Generate role landing pages, /thanks/, 404 and sitemap.xml.

index.html is the source of truth for the header, mobile nav, contact form and
footer; this script lifts those blocks out of it so every page stays in sync.

Run from the repo root:  python build/build.py
"""
import datetime
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).parent))
from roles_data import ROLES  # noqa: E402

SITE = "https://draftinghelpers.com"
TODAY = datetime.date.today().isoformat()
PRICES = {"drafter": (2450, 1500), "admin": (2100, 1300)}

index = (ROOT / "index.html").read_text(encoding="utf-8")


def block(pattern):
    m = re.search(pattern, index, re.S)
    if not m:
        raise SystemExit(f"index.html block not found: {pattern}")
    return m.group(0)


def subpage_links(fragment):
    """Point same-page anchors at the homepage sections."""
    return re.sub(r'href="#([\w-]+)"', r'href="/#\1"', fragment)


HEADER = subpage_links(block(r"<header class=\"header\".*?</header>\s*<!-- Mobile Nav -->\s*<nav class=\"mobile-nav\".*?</nav>"))
FOOTER = subpage_links(block(r"<footer class=\"footer\">.*?</footer>"))
CONTACT = block(r"<section class=\"contact\" id=\"contact\".*?</section>")
STICKY = block(r"<div class=\"mobile-sticky-cta\".*?</div>")
# On subpages, contact and sticky CTA anchors stay on-page (#contact exists there).


def esc(s):
    return html.escape(s, quote=True)


def head(title, description, path, extra=""):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{esc(title)}</title>
    <meta name="description" content="{esc(description)}">
    <link rel="canonical" href="{url}">
    <meta property="og:title" content="{esc(title)}">
    <meta property="og:description" content="{esc(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:site_name" content="Drafting Helpers">
    <meta property="og:image" content="{SITE}/assets/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="{SITE}/assets/og-image.png">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/analytics.js"></script>{extra}
</head>
<body class="subpage">

{HEADER}
"""


def tail(scripts=""):
    return f"""
{FOOTER}

<script src="/assets/site.js" defer></script>
{scripts}</body>
</html>
"""


def ld(obj):
    return '\n<script type="application/ld+json">\n' + json.dumps(obj, indent=2) + "\n</script>\n"


def money(n):
    return f"${n:,}"


def role_page(role, by_slug):
    ft, pt = PRICES[role["tier"]]
    path = f"/roles/{role['slug']}/"
    url = SITE + path
    cc = role["cost_comparison"]
    savings = round((1 - ft / cc["us_monthly"]) * 100)

    tasks = "\n".join(
        f'                <div class="task-item"><h3>{esc(t)}</h3><p>{esc(d)}</p></div>' for t, d in role["tasks"]
    )
    software = "".join(f'<span class="sw-chip">{esc(s)}</span>' for s in role["software"])
    ideal = "\n".join(f"                    <li>{esc(i)}</li>" for i in role["ideal_for"])
    faq_icon = '<svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
    faqs = "\n".join(
        f"""            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    {esc(q)}
                    {faq_icon}
                </button>
                <div class="faq-answer"><p>{esc(a)}</p></div>
            </div>"""
        for q, a in role["faqs"]
    )
    related = "\n".join(
        f'                <a class="related-card" href="/roles/{s}/"><strong>{esc(by_slug[s]["name"])}</strong><span>From {money(PRICES[by_slug[s]["tier"]][1])}/mo</span></a>'
        for s in role["related"]
    )

    contact = CONTACT.replace(
        f'<option value="{role["form_value"]}">', f'<option value="{role["form_value"]}" selected>'
    )
    contact = contact.replace("Book a Free Consultation", f"Hire a Remote {esc(role['name'])}")

    schema = ld({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": f"Remote {role['name']} Staffing",
                "serviceType": f"Remote {role['name']}",
                "url": url,
                "description": role["meta_description"],
                "provider": {"@type": "Organization", "name": "Drafting Helpers", "url": SITE},
                "areaServed": {"@type": "Country", "name": "United States"},
                "offers": [
                    {"@type": "Offer", "name": "Full-time", "price": ft, "priceCurrency": "USD",
                     "priceSpecification": {"@type": "UnitPriceSpecification", "price": ft, "priceCurrency": "USD", "unitText": "MONTH"}},
                    {"@type": "Offer", "name": "Part-time", "price": pt, "priceCurrency": "USD",
                     "priceSpecification": {"@type": "UnitPriceSpecification", "price": pt, "priceCurrency": "USD", "unitText": "MONTH"}},
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                    {"@type": "ListItem", "position": 2, "name": "Roles", "item": SITE + "/#roles"},
                    {"@type": "ListItem", "position": 3, "name": role["name"], "item": url},
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                    for q, a in role["faqs"]
                ],
            },
        ],
    })

    body = f"""
<main>
<!-- ===== ROLE HERO ===== -->
<section class="role-hero">
    <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/#roles">Roles</a> <span>/</span> {esc(role['name'])}</nav>
        <div class="role-hero-grid">
            <div>
                <div class="section-label">Remote {esc(role['name'])}</div>
                <h1>{esc(role['h1'])}</h1>
                <p class="role-lede">{esc(role['lede'])}</p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Get Matched in 1-2 Weeks</a>
                    <a href="#tasks" class="btn btn-secondary">What They Do</a>
                </div>
            </div>
            <aside class="price-panel" aria-label="{esc(role['name'])} pricing">
                <div class="price-panel-label">All-inclusive monthly rate</div>
                <div class="price-row"><span>Full-time</span><strong>{money(ft)}<small>/mo</small></strong></div>
                <div class="price-row"><span>Part-time</span><strong>{money(pt)}<small>/mo</small></strong></div>
                <ul class="price-includes">
                    <li>Payroll, benefits &amp; equipment</li>
                    <li>Dedicated account manager</li>
                    <li>Activity monitoring</li>
                    <li>Free replacement guarantee</li>
                    <li>Month-to-month, no minimums</li>
                </ul>
            </aside>
        </div>
    </div>
</section>

<!-- ===== TASKS ===== -->
<section class="role-section" id="tasks">
    <div class="container">
        <div class="section-label">Day-to-Day Work</div>
        <h2 class="section-title">What a Remote {esc(role['name'])} Handles for Your Firm</h2>
        <div class="task-grid">
{tasks}
        </div>
    </div>
</section>

<!-- ===== SOFTWARE + IDEAL FOR ===== -->
<section class="role-section role-section-alt">
    <div class="container role-split">
        <div>
            <div class="section-label">Software</div>
            <h2 class="section-title">Tested in the Tools You Already Use</h2>
            <p class="section-subtitle">Every candidate is skills-tested in your firm's software before you meet them.</p>
            <div class="sw-chips">{software}</div>
        </div>
        <div>
            <div class="section-label">A Good Fit For</div>
            <h2 class="section-title">Who Hires a Remote {esc(role['name'])}</h2>
            <ul class="check-list">
{ideal}
            </ul>
        </div>
    </div>
</section>

<!-- ===== COST COMPARISON ===== -->
<section class="role-section">
    <div class="container">
        <div class="section-label">Cost Comparison</div>
        <h2 class="section-title">What You Save vs. a Local Hire</h2>
        <div class="compare-grid">
            <div class="compare-card">
                <div class="compare-label">{esc(cc['us_label'])}</div>
                <div class="compare-value">~{money(cc['us_monthly'])}<small>/mo</small></div>
            </div>
            <div class="compare-card compare-card-us">
                <div class="compare-label">Drafting Helpers {esc(role['name'])} (full-time, all-inclusive)</div>
                <div class="compare-value">{money(ft)}<small>/mo</small></div>
                <div class="compare-save">About {savings}% less</div>
            </div>
        </div>
        <p class="compare-note">{esc(cc['note'])}</p>
    </div>
</section>

<!-- ===== FAQ ===== -->
<section class="faq" id="faq">
    <div class="container">
        <div class="text-center">
            <div class="section-label">FAQ</div>
            <h2 class="section-title">Questions About Hiring a Remote {esc(role['name'])}</h2>
        </div>
        <div class="faq-grid">
{faqs}
        </div>
    </div>
</section>

{contact}

<!-- ===== RELATED ===== -->
<section class="role-section">
    <div class="container">
        <div class="section-label">Related Roles</div>
        <h2 class="section-title">Often Hired Alongside</h2>
        <div class="related-grid">
{related}
        </div>
    </div>
</section>
</main>

{STICKY}
"""
    return head(role["title"], role["meta_description"], path, schema) + body + tail()


def simple_page(path, title, description, h1, text, robots="noindex"):
    extra = f'\n    <meta name="robots" content="{robots}">'
    body = f"""
<main>
<section class="role-hero simple-hero">
    <div class="container text-center">
        <h1>{h1}</h1>
        <p class="role-lede">{text}</p>
        <div class="hero-buttons" style="justify-content:center">
            <a href="/" class="btn btn-primary">Back to Home</a>
            <a href="/#roles" class="btn btn-secondary">Browse Roles</a>
        </div>
    </div>
</section>
</main>
"""
    return head(title, description, path, extra) + body + tail()


def legal_page(path, title, description, html_body):
    body = f"""
<main>
<section class="role-section" style="padding-top:3rem">
    <div class="container legal-content">
{html_body}
    </div>
</section>
</main>
"""
    return head(title, description, path) + body + tail()


def write(rel, content):
    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(content, encoding="utf-8", newline="\n")
    print("wrote", rel)


PRIVACY_HTML = """\
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> October 26, 2026</p>

        <p>Drafting Helpers ("we", "us", "our") operates the website draftinghelpers.com. This page explains how we collect, use and protect your information when you use our site.</p>

        <h2>Information We Collect</h2>
        <p><strong>Information you provide:</strong> When you fill out our consultation form, we collect your name, email address, phone number (optional), firm name (optional), the role you are interested in, and any details you share in the message field.</p>
        <p><strong>Information collected automatically:</strong> We use Google Analytics 4 and may use Microsoft Clarity to collect anonymized usage data such as pages visited, time on site, device type and approximate location. We do not collect financial information through the website.</p>

        <h2>How We Use Your Information</h2>
        <ul>
            <li>To respond to your staffing inquiry and provide a custom plan</li>
            <li>To improve our website and services based on aggregated usage data</li>
            <li>To measure the effectiveness of our advertising (Google Ads conversion tracking)</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        <p>We use cookies set by Google Analytics, Google Ads and Microsoft Clarity to understand how visitors interact with our site. You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade or rent your personal information to third parties. We may share data with service providers (e.g., Netlify for hosting, Google for analytics) who assist in operating our website, subject to confidentiality agreements.</p>

        <h2>Data Retention</h2>
        <p>We retain form submissions for as long as necessary to provide our services and follow up on your inquiry. Analytics data is retained per the default retention periods of the respective platforms.</p>

        <h2>Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by emailing us at the address below. California residents have additional rights under the CCPA.</p>

        <h2>Security</h2>
        <p>We use HTTPS encryption and follow industry-standard practices to protect your data. However, no method of electronic transmission is 100% secure.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time. Changes will be posted on this page with a revised date.</p>

        <h2>Contact</h2>
        <p>Drafting Helpers<br>Sherman Oaks, California<br>Email: info@draftinghelpers.com</p>
"""

TERMS_HTML = """\
        <h1>Terms of Service</h1>
        <p><strong>Last updated:</strong> October 26, 2026</p>

        <p>These terms govern your use of the draftinghelpers.com website ("Site") operated by Drafting Helpers ("we", "us", "our"). By using the Site, you agree to these terms.</p>

        <h2>Services</h2>
        <p>Drafting Helpers is a staffing agency that places remote architectural professionals with US-based architecture firms. The Site provides information about our services and allows you to submit a consultation request. Submitting a request does not create a binding agreement for staffing services; a separate service agreement is required.</p>

        <h2>Use of the Site</h2>
        <p>You agree to use the Site for lawful purposes only. You may not:</p>
        <ul>
            <li>Submit false or misleading information through our forms</li>
            <li>Attempt to interfere with or disrupt the Site</li>
            <li>Scrape, crawl or harvest content from the Site for commercial purposes without permission</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>All content on this Site, including text, graphics, logos and design, is the property of Drafting Helpers and is protected by copyright and trademark laws. You may not reproduce or distribute our content without written permission.</p>

        <h2>Disclaimer</h2>
        <p>The Site and its content are provided "as is" without warranties of any kind. While we strive for accuracy, we do not guarantee that all information on the Site is complete or current. Savings estimates (e.g., "up to 70% less") are based on general industry comparisons and actual savings vary.</p>

        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Drafting Helpers shall not be liable for any indirect, incidental or consequential damages arising from your use of the Site.</p>

        <h2>Third-Party Links</h2>
        <p>The Site may contain links to third-party websites. We are not responsible for the content or practices of those sites.</p>

        <h2>Changes</h2>
        <p>We may update these terms at any time. Continued use of the Site after changes constitutes acceptance of the revised terms.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the State of California.</p>

        <h2>Contact</h2>
        <p>Drafting Helpers<br>Sherman Oaks, California<br>Email: info@draftinghelpers.com</p>
"""


def main():
    by_slug = {r["slug"]: r for r in ROLES}
    for role in ROLES:
        write(f"roles/{role['slug']}/index.html", role_page(role, by_slug))

    write("thanks/index.html", simple_page(
        "/thanks/", "Thanks | Drafting Helpers", "We received your request.",
        "Thanks, we got your request.",
        "A member of our team will review your needs and get back to you within one business day with a staffing plan for your firm."))
    write("404.html", simple_page(
        "/404.html", "Page Not Found | Drafting Helpers", "Page not found.",
        "That page doesn't exist.", "It may have moved. Head back home or browse the roles we staff."))

    write("privacy/index.html", legal_page(
        "/privacy/",
        "Privacy Policy | Drafting Helpers",
        "Privacy policy for Drafting Helpers — how we collect, use and protect your data.",
        PRIVACY_HTML))
    write("terms/index.html", legal_page(
        "/terms/",
        "Terms of Service | Drafting Helpers",
        "Terms of service for Drafting Helpers staffing services.",
        TERMS_HTML))

    urls = [("/", "1.0")] + [(f"/roles/{r['slug']}/", "0.8") for r in ROLES] + [("/privacy/", "0.3"), ("/terms/", "0.3")]
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, pr in urls:
        sitemap.append(f"  <url><loc>{SITE}{u}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>")
    sitemap.append("</urlset>")
    write("sitemap.xml", "\n".join(sitemap) + "\n")


if __name__ == "__main__":
    main()
