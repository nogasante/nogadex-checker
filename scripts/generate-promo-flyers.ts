import { chromium } from "playwright";
import fs from "fs";

async function renderFlyersWith3DIphone() {
  const browser = await chromium.launch();

  // 1. Capture ultra-crisp mobile screen of the live portal
  const mobilePage = await browser.newPage({ 
    viewport: { width: 390, height: 780 },
    deviceScaleFactor: 3
  });
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const phoneScreenBase64 = (await mobilePage.screenshot({ type: "png" })).toString("base64");
  await mobilePage.close();

  // Read brand assets
  const logoBase64 = fs.readFileSync("public/logo.png").toString("base64");
  const studentBgBase64 = fs.existsSync("public/images/ghana-bg.jpg")
    ? fs.readFileSync("public/images/ghana-bg.jpg").toString("base64")
    : "";

  // ─────────────────────────────────────────────────────────────
  // 1. SQUARE FLYER (1:1 - WhatsApp Groups / Instagram Feed)
  // ─────────────────────────────────────────────────────────────
  const squareHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1080px;
        height: 1080px;
        background: #070b14;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #ffffff;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 56px;
      }

      /* Ambient Studio Backdrop */
      .bg-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 75% 45%, rgba(220, 38, 38, 0.28) 0%, transparent 55%),
                    radial-gradient(circle at 15% 85%, rgba(37, 99, 235, 0.22) 0%, transparent 50%),
                    #070b14;
        z-index: 1;
      }

      .bg-students {
        position: absolute;
        inset: 0;
        background-image: url('data:image/jpeg;base64,${studentBgBase64}');
        background-size: cover;
        background-position: top center;
        opacity: 0.08;
        mix-blend-mode: luminosity;
        z-index: 2;
      }

      .grid-pattern {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 36px 36px;
        z-index: 3;
      }

      .content {
        position: relative;
        z-index: 10;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .brand-logo {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: #ffffff;
        padding: 4px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      }

      .brand-text {
        font-size: 24px;
        font-weight: 800;
        letter-spacing: -0.5px;
      }

      .brand-text span {
        color: #ef4444;
      }

      .live-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 18px;
        border-radius: 100px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.45);
        font-size: 12px;
        font-weight: 800;
        color: #f87171;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ef4444;
        box-shadow: 0 0 12px #ef4444;
      }

      /* Main Split Area (Left Copy + Right 3D Phone) */
      .main-split {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        align-items: center;
        gap: 20px;
        margin: 10px 0;
      }

      .copy-col {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .exam-tag {
        font-size: 13px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #fbbf24;
      }

      .headline {
        font-size: 50px;
        font-weight: 900;
        line-height: 1.08;
        letter-spacing: -1.5px;
        color: #ffffff;
      }

      .headline-red {
        background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .subhead {
        font-size: 17px;
        color: #94a3b8;
        line-height: 1.45;
        font-weight: 500;
      }

      .feature-chips {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 4px;
      }

      .chip-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 700;
        color: #e2e8f0;
      }

      .chip-check {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgba(16, 185, 129, 0.18);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #34d399;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }

      /* 3D iPhone Mockup Container */
      .phone-col {
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1200px;
      }

      .iphone-frame {
        width: 320px;
        height: 620px;
        background: #181c24;
        border-radius: 50px;
        padding: 11px;
        box-shadow: 
          -20px 30px 60px rgba(0, 0, 0, 0.7),
          0 10px 30px rgba(220, 38, 38, 0.25),
          inset 0 0 0 2px #334155,
          inset 0 0 0 4px #0f172a;
        transform: rotateY(-14deg) rotateX(8deg) rotateZ(3deg);
        transform-style: preserve-3d;
        position: relative;
      }

      .iphone-screen {
        width: 100%;
        height: 100%;
        border-radius: 40px;
        overflow: hidden;
        background: #ffffff;
        position: relative;
      }

      .screen-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }

      /* Dynamic Island / Notch */
      .dynamic-island {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 90px;
        height: 22px;
        background: #000000;
        border-radius: 20px;
        z-index: 30;
      }

      /* Screen Glass Glare */
      .screen-glare {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 45%);
        pointer-events-none;
        z-index: 20;
      }

      /* Price Badge Float */
      .float-badge {
        position: absolute;
        bottom: 30px;
        left: -35px;
        background: #dc2626;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 18px;
        box-shadow: 0 15px 35px rgba(220, 38, 38, 0.5);
        border: 2px solid rgba(255,255,255,0.3);
        transform: rotate(-6deg);
        z-index: 40;
        text-align: center;
      }

      .float-price {
        font-size: 24px;
        font-weight: 900;
        font-family: 'JetBrains Mono', monospace;
        line-height: 1;
      }

      .float-sub {
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 2px;
      }

      /* Bottom Action Bar */
      .bottom-bar {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(12px);
      }

      .site-cta {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .site-label {
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .site-link {
        font-size: 26px;
        font-weight: 900;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        letter-spacing: -0.5px;
      }

      .contact-cta {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #34d399;
        font-weight: 800;
        font-size: 15px;
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.3);
        padding: 10px 18px;
        border-radius: 12px;
      }
    </style>
  </head>
  <body>
    <div class="bg-overlay"></div>
    <div class="bg-students"></div>
    <div class="grid-pattern"></div>

    <div class="content">
      <!-- Header -->
      <div class="header">
        <div class="brand">
          <img class="brand-logo" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
          <div class="brand-text">Nogadex<span>Consults</span></div>
        </div>
        <div class="live-pill">
          <div class="live-dot"></div>
          <span>2025 WAEC Portal Live</span>
        </div>
      </div>

      <!-- Main Split Grid -->
      <div class="main-split">
        <!-- Left Copy -->
        <div class="copy-col">
          <div class="exam-tag">🎓 WASSCE • NOVDEC • BECE</div>
          <h1 class="headline">
            Check Results On Your Phone<br/>
            <span class="headline-red">&amp; Get Official PDF</span>
          </h1>
          <p class="subhead">
            No cyber cafe queues. Instant mobile money payment &amp; official printable PDF slip sent to your email in 2 minutes.
          </p>

          <div class="feature-chips">
            <div class="chip-item">
              <div class="chip-check">✓</div>
              <span>Instant MTN MoMo, Telecel Cash &amp; AT Money</span>
            </div>
            <div class="chip-item">
              <div class="chip-check">✓</div>
              <span>Formatted Printable PDF Slip (University Ready)</span>
            </div>
            <div class="chip-item">
              <div class="chip-check">✓</div>
              <span>100% Genuine WAEC Server Data Delivery</span>
            </div>
          </div>
        </div>

        <!-- Right 3D iPhone Mockup -->
        <div class="phone-col">
          <div class="iphone-frame">
            <div class="dynamic-island"></div>
            <div class="iphone-screen">
              <img class="screen-img" src="data:image/png;base64,${phoneScreenBase64}" alt="Nogadex Portal Live" />
              <div class="screen-glare"></div>
            </div>
            <div class="float-badge">
              <div class="float-price">GH₵30</div>
              <div class="float-sub">Complete PDF</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar">
        <div class="site-cta">
          <div class="site-label">👉 Check Result Directly At:</div>
          <div class="site-link">nogadexconsults.app</div>
        </div>
        <div class="contact-cta">
          <span>💬 WhatsApp:</span>
          <span>+233 534 908 166</span>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // ─────────────────────────────────────────────────────────────
  // 2. STORY FLYER (9:16 - WhatsApp Status / Instagram Story)
  // ─────────────────────────────────────────────────────────────
  const storyHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1080px;
        height: 1920px;
        background: #070b14;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #ffffff;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 70px 60px 60px;
      }

      /* Ambient Backdrop */
      .bg-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 80% 25%, rgba(220, 38, 38, 0.32) 0%, transparent 60%),
                    radial-gradient(circle at 20% 75%, rgba(37, 99, 235, 0.22) 0%, transparent 60%),
                    #070b14;
        z-index: 1;
      }

      .bg-students {
        position: absolute;
        inset: 0;
        background-image: url('data:image/jpeg;base64,${studentBgBase64}');
        background-size: cover;
        background-position: top center;
        opacity: 0.10;
        mix-blend-mode: luminosity;
        z-index: 2;
      }

      .grid-pattern {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 44px 44px;
        z-index: 3;
      }

      .content {
        position: relative;
        z-index: 10;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      /* Top Header */
      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .brand-logo {
        width: 64px;
        height: 64px;
        border-radius: 18px;
        background: #ffffff;
        padding: 5px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.5);
      }

      .brand-text {
        font-size: 28px;
        font-weight: 900;
        letter-spacing: -0.5px;
      }

      .brand-text span {
        color: #ef4444;
      }

      .urgent-chip {
        padding: 10px 22px;
        border-radius: 100px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.45);
        font-size: 14px;
        font-weight: 800;
        color: #f87171;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .urgent-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ef4444;
        box-shadow: 0 0 14px #ef4444;
      }

      /* Headline Block */
      .hero-block {
        text-align: center;
        margin-top: 10px;
      }

      .exam-tag {
        font-size: 15px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #fbbf24;
        margin-bottom: 10px;
      }

      .headline {
        font-size: 58px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -1.8px;
      }

      .headline-accent {
        background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero-sub {
        font-size: 20px;
        font-weight: 500;
        color: #94a3b8;
        margin-top: 12px;
        line-height: 1.45;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Center 3D iPhone Showcase */
      .center-showcase {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        perspective: 1400px;
        margin: 20px 0;
      }

      .iphone-story-frame {
        width: 380px;
        height: 740px;
        background: #181c24;
        border-radius: 56px;
        padding: 12px;
        box-shadow: 
          0 35px 80px rgba(0, 0, 0, 0.8),
          0 10px 40px rgba(220, 38, 38, 0.3),
          inset 0 0 0 2px #334155,
          inset 0 0 0 5px #0f172a;
        transform: rotateY(-10deg) rotateX(6deg);
        position: relative;
      }

      .iphone-story-screen {
        width: 100%;
        height: 100%;
        border-radius: 46px;
        overflow: hidden;
        background: #ffffff;
        position: relative;
      }

      .story-screen-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }

      .story-dynamic-island {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 25px;
        background: #000000;
        border-radius: 20px;
        z-index: 30;
      }

      .story-float-price {
        position: absolute;
        bottom: 80px;
        left: -40px;
        background: #dc2626;
        color: #ffffff;
        padding: 16px 26px;
        border-radius: 22px;
        box-shadow: 0 20px 45px rgba(220, 38, 38, 0.55);
        border: 2px solid rgba(255,255,255,0.3);
        transform: rotate(-6deg);
        z-index: 40;
        text-align: center;
      }

      .story-float-price-val {
        font-size: 32px;
        font-weight: 900;
        font-family: 'JetBrains Mono', monospace;
        line-height: 1;
      }

      .story-float-price-sub {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 3px;
      }

      /* 3 Process Steps */
      .steps-bar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }

      .step-box {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        padding: 16px 14px;
        text-align: center;
      }

      .step-num {
        font-size: 18px;
        font-weight: 900;
        color: #ef4444;
        font-family: 'JetBrains Mono', monospace;
        margin-bottom: 4px;
      }

      .step-title {
        font-size: 13px;
        font-weight: 800;
        color: #ffffff;
      }

      .step-desc {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 2px;
      }

      /* Call to Action Box */
      .action-box {
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        border-radius: 28px;
        padding: 28px 30px;
        text-align: center;
        box-shadow: 0 25px 50px rgba(220, 38, 38, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.25);
        margin-top: 10px;
      }

      .action-tag {
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.85);
      }

      .action-domain {
        font-size: 42px;
        font-weight: 900;
        letter-spacing: -0.5px;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        margin: 6px 0 8px;
      }

      .action-hint {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
      }

      /* Story Bottom */
      .story-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;
        font-size: 14px;
        color: #64748b;
      }

      .story-wa {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #34d399;
        font-weight: 800;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="bg-overlay"></div>
    <div class="bg-students"></div>
    <div class="grid-pattern"></div>

    <div class="content">
      <!-- Top Brand -->
      <div class="top-bar">
        <div class="brand">
          <img class="brand-logo" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
          <div class="brand-text">Nogadex<span>Consults</span></div>
        </div>
        <div class="urgent-chip">
          <div class="urgent-dot"></div>
          <span>Results Dropping</span>
        </div>
      </div>

      <!-- Headline Block -->
      <div class="hero-block">
        <div class="exam-tag">⚡ 2025 OFFICIAL CANDIDATE PORTAL</div>
        <h1 class="headline">
          Check WAEC Results<br/>
          <span class="headline-accent">Directly On Phone</span>
        </h1>
        <p class="hero-sub">
          Instant grade retrieval &amp; printable PDF slip sent to your email in 2 minutes.
        </p>
      </div>

      <!-- Center 3D iPhone Showcase -->
      <div class="center-showcase">
        <div class="iphone-story-frame">
          <div class="story-dynamic-island"></div>
          <div class="iphone-story-screen">
            <img class="story-screen-img" src="data:image/png;base64,${phoneScreenBase64}" alt="Live Portal" />
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 45%);pointer-events:none;"></div>
          </div>
          <div class="story-float-price">
            <div class="story-float-price-val">GH₵30</div>
            <div class="story-float-price-sub">Complete PDF</div>
          </div>
        </div>
      </div>

      <!-- 3 Steps -->
      <div class="steps-bar">
        <div class="step-box">
          <div class="step-num">01</div>
          <div class="step-title">Enter Index No.</div>
          <div class="step-desc">10 digits &amp; DOB</div>
        </div>
        <div class="step-box">
          <div class="step-num">02</div>
          <div class="step-title">MoMo Pay GH₵30</div>
          <div class="step-desc">MTN, Telecel, AT</div>
        </div>
        <div class="step-box">
          <div class="step-num">03</div>
          <div class="step-title">Get PDF Slip</div>
          <div class="step-desc">Emailed instantly</div>
        </div>
      </div>

      <!-- Big CTA Box -->
      <div class="action-box">
        <div class="action-tag">Check Your Result Now:</div>
        <div class="action-domain">nogadexconsults.app</div>
        <div class="action-hint">📱 Open in Safari or Chrome on your phone</div>
      </div>

      <!-- Bottom Contacts -->
      <div class="story-bottom">
        <div>🔒 100% Genuine WAEC Data</div>
        <div class="story-wa">
          <span>💬 WhatsApp:</span>
          <span>+233 534 908 166</span>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // Render Square Flyer (2160x2160 output at 2x scale)
  const pageSquare = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  });
  await pageSquare.setContent(squareHtml, { waitUntil: "networkidle" });
  await pageSquare.screenshot({
    path: "public/nogadex_promo_square.png",
    type: "png",
  });
  console.log("Rendered 4K Square Flyer: public/nogadex_promo_square.png (2160x2160)");

  // Render Story Flyer (2160x3840 output at 2x scale)
  const pageStory = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
  });
  await pageStory.setContent(storyHtml, { waitUntil: "networkidle" });
  await pageStory.screenshot({
    path: "public/nogadex_promo_story.png",
    type: "png",
  });
  console.log("Rendered 4K Story Flyer: public/nogadex_promo_story.png (2160x3840)");

  await browser.close();
}

renderFlyersWith3DIphone().catch((err) => {
  console.error("Flyer render error:", err);
});
