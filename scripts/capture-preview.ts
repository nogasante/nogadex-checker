import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function capture() {
  console.log("Launching Playwright Chromium...");
  const browser = await chromium.launch();

  // 1. Mobile iPhone 14 Viewport (390 x 844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  const mobilePath = path.join(process.cwd(), "public", "preview-mobile.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Saved mobile screenshot to ${mobilePath}`);

  // 2. Mobile Viewport (Above the Fold)
  const mobileFoldPath = path.join(process.cwd(), "public", "preview-mobile-fold.png");
  await mobilePage.screenshot({ path: mobileFoldPath, fullPage: false });
  console.log(`Saved mobile fold screenshot to ${mobileFoldPath}`);

  // 3. Desktop Viewport (1280 x 800)
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  const desktopPath = path.join(process.cwd(), "public", "preview-desktop.png");
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log(`Saved desktop screenshot to ${desktopPath}`);

  await browser.close();
  console.log("All Playwright captures complete!");
}

capture().catch((err) => {
  console.error("Playwright capture error:", err);
  process.exit(1);
});
