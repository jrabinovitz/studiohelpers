import { getPool, ensureMigrated } from "../../lib/db.mjs";

const SITE = "https://draftinghelpers.com";

const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/blog", priority: "0.8", changefreq: "daily" },
  { loc: "/privacy/", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms/", priority: "0.3", changefreq: "yearly" },
  { loc: "/roles/administrative-assistant/", priority: "0.7", changefreq: "monthly" },
  { loc: "/roles/drafter/", priority: "0.7", changefreq: "monthly" },
  { loc: "/roles/architectural-designer/", priority: "0.7", changefreq: "monthly" },
];

function toW3C(d) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export const handler = async () => {
  try {
    await ensureMigrated();
    const pool = getPool();

    const { rows } = await pool.query(
      `SELECT slug, updated_at, published_at
       FROM articles
       WHERE published_at IS NOT NULL
       ORDER BY published_at DESC`
    );

    const staticEntries = STATIC_PAGES.map(
      (p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ).join("\n");

    const articleEntries = rows
      .map(
        (a) => `  <url>
    <loc>${SITE}/blog/${a.slug}</loc>
    <lastmod>${toW3C(a.updated_at || a.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
      body: xml,
    };
  } catch (err) {
    console.error("Sitemap error:", err);
    // Fallback static sitemap on DB error
    const fallback = STATIC_PAGES.map(
      (p) => `  <url><loc>${SITE}${p.loc}</loc></url>`
    ).join("\n");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
      body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallback}
</urlset>`,
    };
  }
};
