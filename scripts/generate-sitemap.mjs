import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://ai.vinfotech.com";

// Reuse your existing envs (these already exist in your project)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE env vars. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function isoDate(d = new Date()) {
  return new Date(d).toISOString().split("T")[0];
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${priority ? `<priority>${priority}</priority>` : ""}
  </url>`.trim();
}

async function main() {
  // Pull all case study slugs
  const { data, error } = await supabase
    .from("case_studies")
    .select("slug, updated_at, created_at")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
  }

  const urls = [];

  // Home
  urls.push(
    urlEntry(`${SITE_URL}/`, isoDate(), "daily", "1.0")
  );

  // Case studies detail pages (dynamic)
  for (const row of data || []) {
    if (!row?.slug) continue;
    const lastmod = isoDate(row.updated_at || row.created_at || new Date());
    urls.push(
      urlEntry(`${SITE_URL}/case-studies/${row.slug}`, lastmod, "weekly", "0.8")
    );
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => "  " + u.replace(/\n/g, "\n  ")).join("\n")}
</urlset>
`;

  const outPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outPath, sitemap, "utf8");
  console.log(`✅ sitemap.xml generated: ${outPath}`);
  console.log(`✅ URLs included: ${urls.length}`);
}

main();
