import { chromium } from "playwright";

async function captureAdminMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const page = await context.newPage();

  // Login as admin
  await page.goto("http://localhost:3000/admin/login");
  await page.fill("input[type=email]", "nanasante2000@gmail.com");
  await page.fill("input[type=password]", "AdminPassword2026!");
  await page.click("button[type=submit]");
  await page.waitForURL("**/admin", { timeout: 10000 });

  // Take screenshot of mobile admin dashboard
  await page.screenshot({ path: "public/admin-mobile-preview.png", fullPage: true });
  console.log("Saved admin mobile screenshot to public/admin-mobile-preview.png");

  await browser.close();
}

captureAdminMobile().catch(console.error);
