import { chromium } from "playwright";
import path from "path";
import fs from "fs";

async function slice() {
  const imgPath = path.resolve(
    "C:/Users/nanas/.gemini/antigravity-ide/brain/c931bf51-ec3e-4d88-b287-db919b7b4bc0/.user_uploaded/media_1787926726027.png"
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
        <canvas id="c1"></canvas>
        <canvas id="c2"></canvas>
        <canvas id="c3"></canvas>
      </body>
    </html>
  `);

  await page.evaluate(() => {
    const img = document.getElementById("src") as HTMLImageElement;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const third = w / 3;

    // 1. Crop MTN
    const c1 = document.getElementById("c1") as HTMLCanvasElement;
    const ctx1 = c1.getContext("2d")!;
    c1.width = third;
    c1.height = h;
    ctx1.drawImage(img, 0, 0, third, h, 0, 0, third, h);

    // 2. Crop AT
    const c2 = document.getElementById("c2") as HTMLCanvasElement;
    const ctx2 = c2.getContext("2d")!;
    c2.width = third;
    c2.height = h;
    ctx2.drawImage(img, third, 0, third, h, 0, 0, third, h);

    // 3. Crop Telecel
    const c3 = document.getElementById("c3") as HTMLCanvasElement;
    const ctx3 = c3.getContext("2d")!;
    c3.width = third;
    c3.height = h;
    ctx3.drawImage(img, third * 2, 0, third, h, 0, 0, third, h);
  });

  const mtnData = await page.evaluate(
    () => (document.getElementById("c1") as HTMLCanvasElement).toDataURL("image/png")
  );
  const atData = await page.evaluate(
    () => (document.getElementById("c2") as HTMLCanvasElement).toDataURL("image/png")
  );
  const telecelData = await page.evaluate(
    () => (document.getElementById("c3") as HTMLCanvasElement).toDataURL("image/png")
  );

  const outDir = path.resolve("public/payments");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "mtn.png"), Buffer.from(mtnData.split(",")[1], "base64"));
  fs.writeFileSync(path.join(outDir, "at.png"), Buffer.from(atData.split(",")[1], "base64"));
  fs.writeFileSync(path.join(outDir, "telecel.png"), Buffer.from(telecelData.split(",")[1], "base64"));

  console.log("Successfully extracted official MTN, AT, and Telecel logos!");
  await browser.close();
}

slice();
