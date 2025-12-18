import "dotenv/config";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://ai.vinfotech.com";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

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
  const outDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Always generate at least the homepage sitemap (even if Supabase env is missing)
  const urls = [];
  urls.push(urlEntry(`${SITE_URL}/`, isoDate(), "daily", "1.0"));

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => "  " + u.replace(/\n/g, "\n  ")).join("\n")}
</urlset>
`;
    fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
    console.log("⚠️ Supabase env missing, generated sitemap with homepage only.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from("case_studies")
    .select("slug, updated_at, created_at")
    .order("display_order", { ascending: true });

  if (error) {
    console.log("⚠️ Supabase error, generated sitemap with homepage only:", error.message);
  } else {
    for (const row of data || []) {
      if (!row?.slug) continue;
      urls.push(
        urlEntry(
          `${SITE_URL}/case-studies/${row.slug}`,
          isoDate(row.updated_at || row.created_at || new Date()),
          "weekly",
          "0.8"
        )
      );
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => "  " + u.replace(/\n/g, "\n  ")).join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
  console.log(`✅ sitemap.xml generated. URLs: ${urls.length}`);
}

main();
