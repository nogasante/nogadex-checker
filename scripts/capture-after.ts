import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // Desktop
  const desk = await context.newPage();
  await desk.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
  await desk.waitForTimeout(3000);
  await desk.screenshot({ path: "public/after-desktop.png", fullPage: true });
  console.log("Captured desktop");

  // Desktop — click "Check result & get PDF" to see the form
  await desk.click("text=Check result");
  await desk.waitForTimeout(1000);
  await desk.screenshot({ path: "public/after-desktop-form.png", fullPage: true });
  console.log("Captured desktop form");

  // Mobile
  const mob = await context.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
  await mob.waitForTimeout(3000);
  await mob.screenshot({ path: "public/after-mobile.png", fullPage: true });
  console.log("Captured mobile");

  // Mobile form
  await mob.click("text=Check result");
  await mob.waitForTimeout(1000);
  await mob.screenshot({ path: "public/after-mobile-form.png", fullPage: true });
  console.log("Captured mobile form");

  await browser.close();
  console.log("Done");
}

capture();
