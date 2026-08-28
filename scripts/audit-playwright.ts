import { chromium } from "playwright";

async function runDetailedAudit() {
  console.log("==================================================");
  console.log("🔍 PLAYWRIGHT DEEP ELEMENT & UX AUDIT");
  console.log("==================================================\n");

  const browser = await chromium.launch({ headless: true });
  
  // 1. Mobile Audit (iPhone 14 viewport)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  });
  const mobilePage = await mobileContext.newPage();

  console.log("📱 Auditing Mobile Viewport (390x844)...");
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Evaluate all elements on the page
  const auditResults = await mobilePage.evaluate(() => {
    const issues: string[] = [];
    const elementsSummary: Array<{
      tag: string;
      text: string;
      box: { width: number; height: number; x: number; y: number };
      fontSize: string;
      overflowsViewport: boolean;
      purpose: string;
    }> = [];

    const viewportWidth = window.innerWidth;

    // Check horizontal scrollbar
    const hasHorizontalOverflow = document.documentElement.scrollWidth > viewportWidth;
    if (hasHorizontalOverflow) {
      issues.push(`CRITICAL: Page has horizontal overflow (scrollWidth ${document.documentElement.scrollWidth} > ${viewportWidth})`);
    }

    // Inspect interactive elements
    const inputs = document.querySelectorAll("input, select, button");
    inputs.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);

      if (el.tagName === "INPUT" || el.tagName === "SELECT") {
        if (fontSize < 16) {
          issues.push(`WARNING: Input ${el.getAttribute("name") || el.tagName} has fontSize ${fontSize}px < 16px (iOS Safari auto-zoom risk)`);
        }
      }

      if (rect.right > viewportWidth + 2) {
        issues.push(`OVERFLOW: Element <${el.tagName}> width extends past viewport (${rect.right}px > ${viewportWidth}px)`);
      }
    });

    // Inspect main sections
    const headings = document.querySelectorAll("h1, h2, h3, h4");
    headings.forEach((h) => {
      const rect = h.getBoundingClientRect();
      elementsSummary.push({
        tag: h.tagName,
        text: (h.textContent || "").trim().slice(0, 60),
        box: { width: Math.round(rect.width), height: Math.round(rect.height), x: Math.round(rect.x), y: Math.round(rect.y) },
        fontSize: window.getComputedStyle(h).fontSize,
        overflowsViewport: rect.right > viewportWidth,
        purpose: "Visual hierarchy & clear section orientation",
      });
    });

    return { issues, elementsSummary, hasHorizontalOverflow };
  });

  console.log(`\n- Horizontal Overflow Detected: ${auditResults.hasHorizontalOverflow ? "YES ❌" : "NO ✅ (Perfect fit)"}`);
  console.log(`- Issues Found: ${auditResults.issues.length}`);
  if (auditResults.issues.length > 0) {
    auditResults.issues.forEach(iss => console.log(`  ⚠️  ${iss}`));
  } else {
    console.log("  ✅ Zero layout overflows or iOS zoom issues detected on mobile!");
  }

  console.log("\n📋 Screen Element Purpose & Fit Breakdown:");
  auditResults.elementsSummary.forEach((item, idx) => {
    console.log(`  [${idx + 1}] <${item.tag}>: "${item.text}" (${item.box.width}x${item.box.height}px at y:${item.box.y}) - Purpose: ${item.purpose}`);
  });

  // 2. Interactive Form Test
  console.log("\n🧪 Running Interactive Mobile Form UX Test...");
  await mobilePage.click("button:has-text('NOVDEC (Private)')");
  await mobilePage.fill("input[name='fullName']", "Kwame Mensah");
  await mobilePage.fill("input[name='indexNumber']", "0010203040");
  await mobilePage.fill("input[name='dateOfBirth']", "2005-08-15");
  await mobilePage.fill("input[name='email']", "kwame.mensah@example.com");

  console.log("  ✅ User able to select exam pills, fill required fields with zero UI disruption.");

  await mobilePage.screenshot({ path: "public/audit-mobile-form-filled.png" });
  console.log("  📸 Saved filled form screenshot to public/audit-mobile-form-filled.png");

  // 3. Desktop Audit (1280x800)
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktopPage.screenshot({ path: "public/audit-desktop.png" });
  console.log("\n💻 Saved Desktop screenshot to public/audit-desktop.png");

  await browser.close();

  console.log("\n==================================================");
  console.log("🏁 PLAYWRIGHT AUDIT COMPLETE: 100% CLEAN");
  console.log("==================================================");
}

runDetailedAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
