import pg from "pg";
const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
      max: 3,
    });
  }
  return pool;
}

let migrated = false;

export async function ensureMigrated() {
  if (migrated) return;
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS articles (
      external_id     TEXT PRIMARY KEY NOT NULL,
      title           TEXT,
      slug            TEXT UNIQUE,
      content_html    TEXT,
      content_markdown TEXT,
      meta_title      TEXT,
      meta_description TEXT,
      subtitle        TEXT,
      category        TEXT,
      author_name     TEXT,
      image_url       TEXT,
      read_time       TEXT,
      word_count      INTEGER,
      tags            JSONB,
      faqs            JSONB,
      json_ld_schema  JSONB,
      language_code   TEXT,
      published_at    TIMESTAMPTZ,
      updated_at      TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await p.query(
    `CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);`
  );
  migrated = true;
}
