import { NextResponse } from "next/server";

/**
 * IndexNow API route — instantly notifies Bing, Yandex, Seznam, Naver
 * that our pages exist. Hit GET /api/indexnow to submit all pages.
 * https://www.indexnow.org/
 */

const INDEXNOW_KEY = "b1b1d4fa945b4b849affbb128c94533a";
const HOST = "https://nogadexconsults.app";

const ALL_URLS = [
  `${HOST}/`,
  `${HOST}/wassce-result-checker`,
  `${HOST}/novdec-result-checker`,
  `${HOST}/bece-result-checker`,
  `${HOST}/buy-waec-checker-online`,
  `${HOST}/how-to-check-waec-result-on-phone`,
  `${HOST}/privacy`,
  `${HOST}/terms`,
];

export async function GET() {
  try {
    // IndexNow supports batch submission
    const body = {
      host: "nogadexconsults.app",
      key: INDEXNOW_KEY,
      keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: ALL_URLS,
    };

    const results: Record<string, string> = {};

    // Submit to all IndexNow endpoints
    const engines = [
      { name: "Bing", url: "https://www.bing.com/indexnow" },
      { name: "Yandex", url: "https://yandex.com/indexnow" },
      { name: "Seznam", url: "https://search.seznam.cz/indexnow" },
      { name: "Naver", url: "https://searchadvisor.naver.com/indexnow" },
    ];

    for (const engine of engines) {
      try {
        const res = await fetch(engine.url, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
        });
        results[engine.name] = `${res.status} ${res.statusText}`;
      } catch (err) {
        results[engine.name] = `Error: ${(err as Error).message}`;
      }
    }

    // Also ping Google & Bing sitemaps
    const sitemapUrl = `${HOST}/sitemap.xml`;
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      results["Google Sitemap Ping"] = "OK";
    } catch {
      results["Google Sitemap Ping"] = "Failed";
    }
    try {
      await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      results["Bing Sitemap Ping"] = "OK";
    } catch {
      results["Bing Sitemap Ping"] = "Failed";
    }

    return NextResponse.json({
      success: true,
      submitted: ALL_URLS.length,
      urls: ALL_URLS,
      results,
      message:
        "All URLs submitted to IndexNow (Bing, Yandex, Seznam, Naver) and sitemaps pinged (Google, Bing).",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
