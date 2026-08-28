import { chromium } from "playwright";
import path from "path";

async function captureReferences() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const sites = [
    { url: "https://stripe.com/payments", name: "stripe" },
    { url: "https://wise.com", name: "wise" },
    { url: "https://linear.app", name: "linear" },
    { url: "https://vercel.com", name: "vercel" },
    { url: "http://localhost:3000", name: "nogadex-current" },
  ];

  for (const site of sites) {
    try {
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2500);
      const outPath = path.join("public", "ref-" + site.name + ".png");
      await page.screenshot({ path: outPath, fullPage: false });
      console.log("Captured:", site.name);
      await page.close();
    } catch (e: any) {
      console.log("Failed:", site.name, e.message?.slice(0, 120));
    }
  }

  // Also capture nogadex mobile
  try {
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 10000 });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({ path: "public/ref-nogadex-mobile.png", fullPage: true });
    console.log("Captured: nogadex-mobile");
  } catch (e: any) {
    console.log("Failed mobile:", e.message?.slice(0, 100));
  }

  await browser.close();
  console.log("Done capturing all references");
}

captureReferences();
