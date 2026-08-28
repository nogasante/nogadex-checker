import { chromium } from "playwright";

async function captureAuditLogsMobile() {
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

  // Navigate to audit logs
  await page.goto("http://localhost:3000/admin/audit-logs");
  await page.waitForTimeout(1000);

  // Check horizontal overflow
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  console.log(`Mobile Audit Logs Horizontal Overflow: ${hasOverflow ? "YES ❌" : "NO ✅ (100% Fits Screen)"}`);

  await page.screenshot({ path: "public/admin-audit-mobile.png", fullPage: true });
  console.log("Saved admin audit mobile screenshot to public/admin-audit-mobile.png");

  await browser.close();
}

captureAuditLogsMobile().catch(console.error);
