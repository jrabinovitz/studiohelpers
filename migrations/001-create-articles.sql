CREATE TABLE IF NOT EXISTS articles (
    external_id     TEXT PRIMARY KEY NOT NULL UNIQUE,
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

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);
