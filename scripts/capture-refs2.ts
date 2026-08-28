import { chromium } from "playwright";
import path from "path";

async function captureRemaining() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const sites = [
    { url: "https://wise.com", name: "wise" },
    { url: "https://vercel.com", name: "vercel" },
    { url: "http://localhost:3000", name: "nogadex-current" },
  ];

  for (const site of sites) {
    try {
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForTimeout(4000);
      const outPath = path.join("public", "ref-" + site.name + ".png");
      await page.screenshot({ path: outPath, fullPage: false });
      console.log("Captured:", site.name);
      await page.close();
    } catch (e: any) {
      console.log("Failed:", site.name, e.message?.slice(0, 120));
    }
  }

  // Nogadex mobile
  try {
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
    await mobilePage.waitForTimeout(4000);
    await mobilePage.screenshot({ path: "public/ref-nogadex-mobile.png", fullPage: true });
    console.log("Captured: nogadex-mobile");
  } catch (e: any) {
    console.log("Failed mobile:", e.message?.slice(0, 100));
  }

  await browser.close();
  console.log("Done");
}

captureRemaining();
