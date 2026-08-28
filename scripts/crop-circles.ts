import { chromium } from "playwright";
import path from "path";
import fs from "fs";

async function cropCircles() {
  const imgPath = path.resolve(
    "C:/Users/nanas/.gemini/antigravity-ide/brain/c931bf51-ec3e-4d88-b287-db919b7b4bc0/.user_uploaded/media_1787926883511.png"
  );
  const base64 = fs.readFileSync(imgPath).toString("base64");
  const dataUrl = "data:image/png;base64," + base64;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;">
        <img id="src" src="${dataUrl}" />
        <canvas id="cMtn"></canvas>
        <canvas id="cTelecel"></canvas>
        <canvas id="cAt"></canvas>
      </body>
    </html>
  `);

  await page.evaluate(`
    const img = document.getElementById("src");
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    function crop(canvasId, cx, cy, r) {
      const canvas = document.getElementById(canvasId);
      const size = Math.round(r * 2);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      // Create circular clipping path
      ctx.beginPath();
      ctx.arc(r, r, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, cx - r, cy - r, size, size, 0, 0, size, size);
    }

    // MTN: top-left circle
    crop("cMtn", w * 0.278, h * 0.208, h * 0.175);
    // Telecel: center circle
    crop("cTelecel", w * 0.500, h * 0.510, h * 0.175);
    // AT: bottom-right circle
    crop("cAt", w * 0.722, h * 0.812, h * 0.175);
  `);

  const mtnData = await page.evaluate(
    `document.getElementById("cMtn").toDataURL("image/png")`
  );
  const telecelData = await page.evaluate(
    `document.getElementById("cTelecel").toDataURL("image/png")`
  );
  const atData = await page.evaluate(
    `document.getElementById("cAt").toDataURL("image/png")`
  );

  const outDir = path.resolve("public/payments");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "mtn-circle.png"),
    Buffer.from(mtnData.split(",")[1], "base64")
  );
  fs.writeFileSync(
    path.join(outDir, "telecel-circle.png"),
    Buffer.from(telecelData.split(",")[1], "base64")
  );
  fs.writeFileSync(
    path.join(outDir, "at-circle.png"),
    Buffer.from(atData.split(",")[1], "base64")
  );

  console.log("Successfully extracted circular MTN, Telecel, and AT badges!");
  await browser.close();
}

cropCircles();
