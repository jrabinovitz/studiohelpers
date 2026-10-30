import { getPool, ensureMigrated } from "../../lib/db.mjs";

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  // Health check
  if (event.httpMethod === "GET" || event.httpMethod === "HEAD") {
    return { statusCode: 200, headers, body: JSON.stringify({ status: "OK" }) };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Auth
  const apiKey = event.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.GRANDRANKER_SECRET) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  try {
    await ensureMigrated();
    const pool = getPool();
    const payload = JSON.parse(event.body);
    const { event_type, data } = payload;

    if (event_type === "publish_articles") {
      const articles = data.articles || [];
      let upserted = 0;

      for (const item of articles) {
        await pool.query(
          `INSERT INTO articles (
            external_id, title, slug, content_html, content_markdown,
            meta_title, meta_description, subtitle, category, author_name,
            image_url, read_time, word_count, tags, faqs,
            json_ld_schema, language_code, published_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15,
            $16, $17, $18, NOW()
          )
          ON CONFLICT (external_id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            content_html = EXCLUDED.content_html,
            content_markdown = EXCLUDED.content_markdown,
            meta_title = EXCLUDED.meta_title,
            meta_description = EXCLUDED.meta_description,
            subtitle = EXCLUDED.subtitle,
            category = EXCLUDED.category,
            author_name = EXCLUDED.author_name,
            image_url = EXCLUDED.image_url,
            read_time = EXCLUDED.read_time,
            word_count = EXCLUDED.word_count,
            tags = EXCLUDED.tags,
            faqs = EXCLUDED.faqs,
            json_ld_schema = EXCLUDED.json_ld_schema,
            language_code = EXCLUDED.language_code,
            published_at = EXCLUDED.published_at,
            updated_at = NOW()`,
          [
            item.id,
            item.title || null,
            item.slug || null,
            item.content_html || null,
            item.content_markdown || null,
            item.meta_title || null,
            item.meta_description || null,
            item.subtitle || null,
            item.category || null,
            item.author_name || null,
            item.image_url || null,
            item.read_time || null,
            item.word_count || null,
            item.tags ? JSON.stringify(item.tags) : null,
            item.faqs ? JSON.stringify(item.faqs) : null,
            item.json_ld_schema ? JSON.stringify(item.json_ld_schema) : null,
            item.language_code || null,
            item.publish_date || null,
          ]
        );
        upserted++;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          upserted,
          message: `Upserted ${upserted} article(s)`,
        }),
      };
    }

    if (event_type === "unpublish_article") {
      const result = await pool.query(
        `DELETE FROM articles WHERE external_id = $1`,
        [data.id]
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          deleted: result.rowCount,
          message: `Deleted article ${data.id}`,
        }),
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `Unknown event_type: ${event_type}` }),
    };
  } catch (err) {
    console.error("Webhook error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
