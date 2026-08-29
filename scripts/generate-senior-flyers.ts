import { chromium } from "playwright";
import fs from "fs";

async function renderSeniorAgencyFlyers() {
  const browser = await chromium.launch();

  // 1. Capture live mobile screen of the Nogadex portal
  const mobilePage = await browser.newPage({ 
    viewport: { width: 390, height: 780 },
    deviceScaleFactor: 3
  });
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const phoneScreenBase64 = (await mobilePage.screenshot({ type: "png" })).toString("base64");
  await mobilePage.close();

  // Read all real brand assets as base64
  const logoBase64 = fs.readFileSync("public/logo.png").toString("base64");
  const waecLogoBase64 = fs.existsSync("public/images/waec-logo.png")
    ? fs.readFileSync("public/images/waec-logo.png").toString("base64")
    : "";
  const key3dBase64 = fs.readFileSync("public/images/3d/key.png").toString("base64");
  const cert3dBase64 = fs.readFileSync("public/images/3d/certificate.png").toString("base64");
  const mtnBase64 = fs.readFileSync("public/payments/mtn-circle.png").toString("base64");
  const telecelBase64 = fs.readFileSync("public/payments/telecel-circle.png").toString("base64");
  const atBase64 = fs.readFileSync("public/payments/at-circle.png").toString("base64");

  // ─────────────────────────────────────────────────────────────
  // 1. SQUARE FLYER (2160 x 2160) - Award-Winning Editorial Poster
  // ─────────────────────────────────────────────────────────────
  const squareHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@700;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1080px;
        height: 1080px;
        background: #030712;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        color: #ffffff;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 44px 52px 42px;
      }

      /* Luxury Studio Lighting & Mesh Atmosphere */
      .ambient-glow-1 {
        position: absolute;
        top: -120px;
        right: -80px;
        width: 650px;
        height: 650px;
        background: radial-gradient(circle, rgba(220, 38, 38, 0.35) 0%, rgba(220, 38, 38, 0.05) 50%, transparent 70%);
        filter: blur(40px);
        pointer-events: none;
        z-index: 1;
      }

      .ambient-glow-2 {
        position: absolute;
        bottom: -150px;
        left: -100px;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 65%);
        filter: blur(40px);
        pointer-events: none;
        z-index: 1;
      }

      .grid-lines {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, #000 60%, transparent 100%);
        z-index: 2;
      }

      .waec-watermark {
        position: absolute;
        top: 20px;
        right: 30px;
        width: 220px;
        height: 220px;
        opacity: 0.04;
        transform: rotate(-15deg);
        z-index: 2;
        pointer-events: none;
      }

      .layout {
        position: relative;
        z-index: 10;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      /* Top Brand Bar */
      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand-group {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .brand-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: #ffffff;
        padding: 3.5px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      }

      .brand-title {
        font-size: 24px;
        font-weight: 900;
        letter-spacing: -0.8px;
        color: #ffffff;
      }

      .brand-title span {
        color: #ef4444;
      }

      .season-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 7px 16px;
        border-radius: 100px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #f1f5f9;
      }

      .pulse-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #22c55e;
        box-shadow: 0 0 10px #22c55e;
      }

      /* Hero Content Grid (Left Offerings + Right 3D Phone) */
      .hero-grid {
        display: grid;
        grid-template-columns: 1.18fr 0.82fr;
        align-items: center;
        gap: 28px;
        margin: 6px 0;
      }

      .hero-text {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .exam-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 800;
        color: #fbbf24;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }

      .main-headline {
        font-size: 46px;
        font-weight: 900;
        line-height: 1.06;
        letter-spacing: -1.8px;
        color: #ffffff;
      }

      .gradient-text {
        background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .subhead {
        font-size: 15px;
        color: #94a3b8;
        line-height: 1.45;
        font-weight: 500;
      }

      /* Dual Service Product Cards (PIN vs FULL PDF) */
      .services-deck {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 6px;
      }

      .service-box {
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        padding: 16px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 140px;
        position: relative;
      }

      .service-box.featured {
        background: linear-gradient(145deg, rgba(220, 38, 38, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
        border: 1px solid rgba(239, 68, 68, 0.4);
        box-shadow: 0 10px 30px rgba(220, 38, 38, 0.15);
      }

      .featured-pill {
        position: absolute;
        top: -9px;
        right: 12px;
        background: #dc2626;
        color: #ffffff;
        font-size: 9px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        padding: 2px 8px;
        border-radius: 100px;
        border: 1px solid rgba(255,255,255,0.4);
      }

      .service-top {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .service-3d-icon {
        width: 36px;
        height: 36px;
        object-fit: contain;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
      }

      .service-name {
        font-size: 13px;
        font-weight: 800;
        color: #ffffff;
        line-height: 1.2;
      }

      .service-desc {
        font-size: 11px;
        color: #94a3b8;
        line-height: 1.35;
        margin: 6px 0;
      }

      .service-price {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }

      .price-num {
        font-size: 20px;
        font-weight: 900;
        font-family: 'JetBrains Mono', monospace;
        color: #ffffff;
      }

      .service-box.featured .price-num {
        color: #f87171;
      }

      .price-period {
        font-size: 10px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
      }

      /* 3D iPhone Presentation */
      .phone-showcase {
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1200px;
      }

      .iphone-wrapper {
        width: 305px;
        height: 590px;
        background: #0f172a;
        border-radius: 46px;
        padding: 9px;
        box-shadow: 
          -25px 35px 70px rgba(0, 0, 0, 0.8),
          0 10px 40px rgba(220, 38, 38, 0.3),
          inset 0 0 0 2px #334155,
          inset 0 0 0 4px #0f172a;
        transform: rotateY(-13deg) rotateX(7deg) rotateZ(2deg);
        position: relative;
      }

      .iphone-screen-container {
        width: 100%;
        height: 100%;
        border-radius: 38px;
        overflow: hidden;
        background: #ffffff;
        position: relative;
      }

      .screen-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }

      .dynamic-island {
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
        width: 84px;
        height: 20px;
        background: #000000;
        border-radius: 20px;
        z-index: 30;
      }

      .screen-reflection {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%);
        pointer-events: none;
        z-index: 20;
      }

      /* Floating Trust Tag on Phone */
      .phone-trust-tag {
        position: absolute;
        bottom: 25px;
        left: -30px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 10px 16px;
        border-radius: 14px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        backdrop-filter: blur(16px);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 40;
      }

      .tag-momo-logos {
        display: flex;
        align-items: center;
        margin-left: -4px;
      }

      .momo-mini {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin-left: -6px;
        border: 1.5px solid #0f172a;
      }

      .tag-text-main {
        font-size: 11px;
        font-weight: 800;
        color: #ffffff;
        line-height: 1.1;
      }

      .tag-text-sub {
        font-size: 9px;
        color: #34d399;
        font-weight: 700;
      }

      /* Bottom Action Center (High-End Studio Footer) */
      .action-footer {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(16px);
      }

      .action-left {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .action-label {
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #94a3b8;
      }

      .action-domain {
        font-size: 26px;
        font-weight: 900;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        letter-spacing: -0.5px;
      }

      .action-right {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .whatsapp-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(16, 185, 129, 0.14);
        border: 1px solid rgba(16, 185, 129, 0.35);
        color: #34d399;
        padding: 9px 16px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 800;
      }

      .momo-strip {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .momo-icon-lg {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      }
    </style>
  </head>
  <body>
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>
    <div class="grid-lines"></div>
    <img class="waec-watermark" src="data:image/png;base64,${waecLogoBase64}" alt="" />

    <div class="layout">
      <!-- Top Brand Header -->
      <div class="top-bar">
        <div class="brand-group">
          <img class="brand-icon" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
          <div class="brand-title">Nogadex<span>Consults</span></div>
        </div>
        <div class="season-badge">
          <div class="pulse-dot"></div>
          <span>Official 2025 WAEC Portal</span>
        </div>
      </div>

      <!-- Hero Presentation Grid -->
      <div class="hero-grid">
        <!-- Left Product Offerings -->
        <div class="hero-text">
          <div class="exam-tag">⚡ WASSCE • NOVDEC • BECE</div>
          <h1 class="main-headline">
            Check Results &amp;<br/>
            Buy Checkers <span class="gradient-text">Directly On Phone</span>
          </h1>
          <p class="subhead">
            Avoid cyber cafe queues. Instant Mobile Money checkout with real-time PDF result slip delivery in 2 minutes.
          </p>

          <!-- Dual Service Product Cards -->
          <div class="services-deck">
            <!-- Product 1: PIN Only -->
            <div class="service-box">
              <div>
                <div class="service-top">
                  <img class="service-3d-icon" src="data:image/png;base64,${key3dBase64}" alt="Checker PIN" />
                  <div class="service-name">Buy Checker PIN</div>
                </div>
                <div class="service-desc">Instant SMS &amp; WhatsApp code delivery for self-checking on waecdirect.</div>
              </div>
              <div class="service-price">
                <span class="price-num">GH₵24.00</span>
                <span class="price-period">/ PIN</span>
              </div>
            </div>

            <!-- Product 2: Result Check + PDF -->
            <div class="service-box featured">
              <div class="featured-pill">Top Choice</div>
              <div>
                <div class="service-top">
                  <img class="service-3d-icon" src="data:image/png;base64,${cert3dBase64}" alt="Result Slip" />
                  <div class="service-name">Check &amp; PDF Slip</div>
                </div>
                <div class="service-desc">We retrieve grades &amp; email a high-res printable PDF for University admission.</div>
              </div>
              <div class="service-price">
                <span class="price-num">GH₵30.00</span>
                <span class="price-period">/ Complete</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 3D iPhone Presentation -->
        <div class="phone-showcase">
          <div class="iphone-wrapper">
            <div class="dynamic-island"></div>
            <div class="iphone-screen-container">
              <img class="screen-image" src="data:image/png;base64,${phoneScreenBase64}" alt="Portal Live" />
              <div class="screen-reflection"></div>
            </div>
            <div class="phone-trust-tag">
              <div class="tag-momo-logos">
                <img class="momo-mini" src="data:image/png;base64,${mtnBase64}" alt="MTN" />
                <img class="momo-mini" src="data:image/png;base64,${telecelBase64}" alt="Telecel" />
                <img class="momo-mini" src="data:image/png;base64,${atBase64}" alt="AT" />
              </div>
              <div>
                <div class="tag-text-main">Instant MoMo Pay</div>
                <div class="tag-text-sub">Automated Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- High-End Action Footer -->
      <div class="action-footer">
        <div class="action-left">
          <div class="action-label">Visit Live Portal:</div>
          <div class="action-domain">nogadexconsults.app</div>
        </div>

        <div class="action-right">
          <div class="momo-strip">
            <img class="momo-icon-lg" src="data:image/png;base64,${mtnBase64}" alt="MTN MoMo" />
            <img class="momo-icon-lg" src="data:image/png;base64,${telecelBase64}" alt="Telecel Cash" />
            <img class="momo-icon-lg" src="data:image/png;base64,${atBase64}" alt="AT Money" />
          </div>
          <div class="whatsapp-pill">
            <span>WhatsApp:</span>
            <span>+233 534 908 166</span>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // ─────────────────────────────────────────────────────────────
  // 2. STORY FLYER (2160 x 3840) - Ultra-High Resolution Story
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
        background: #030712;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        color: #ffffff;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 60px 56px 50px;
      }

      /* Studio Lighting */
      .ambient-top {
        position: absolute;
        top: -150px;
        right: -100px;
        width: 750px;
        height: 750px;
        background: radial-gradient(circle, rgba(220, 38, 38, 0.38) 0%, transparent 65%);
        filter: blur(50px);
        pointer-events: none;
        z-index: 1;
      }

      .ambient-bottom {
        position: absolute;
        bottom: -150px;
        left: -100px;
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, transparent 65%);
        filter: blur(50px);
        pointer-events: none;
        z-index: 1;
      }

      .grid-lines {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 44px 44px;
        z-index: 2;
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
      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand-group {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .brand-icon {
        width: 58px;
        height: 58px;
        border-radius: 16px;
        background: #ffffff;
        padding: 4.5px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      }

      .brand-title {
        font-size: 28px;
        font-weight: 900;
        letter-spacing: -0.8px;
      }

      .brand-title span {
        color: #ef4444;
      }

      .live-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.45);
        padding: 9px 20px;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 800;
        color: #f87171;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ef4444;
        box-shadow: 0 0 12px #ef4444;
      }

      /* Hero Section */
      .hero-block {
        text-align: center;
        margin-top: 10px;
      }

      .exam-tag {
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #fbbf24;
        margin-bottom: 8px;
      }

      .main-headline {
        font-size: 58px;
        font-weight: 900;
        line-height: 1.08;
        letter-spacing: -2px;
      }

      .headline-accent {
        background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero-sub {
        font-size: 20px;
        font-weight: 500;
        color: #94a3b8;
        margin-top: 12px;
        line-height: 1.45;
        max-width: 840px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Center 3D iPhone Presentation */
      .phone-showcase {
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1400px;
        margin: 16px 0;
        position: relative;
      }

      .iphone-story-frame {
        width: 370px;
        height: 720px;
        background: #0f172a;
        border-radius: 54px;
        padding: 11px;
        box-shadow: 
          0 35px 80px rgba(0, 0, 0, 0.85),
          0 10px 45px rgba(220, 38, 38, 0.35),
          inset 0 0 0 2px #334155,
          inset 0 0 0 5px #0f172a;
        transform: rotateY(-8deg) rotateX(5deg);
        position: relative;
      }

      .iphone-story-screen {
        width: 100%;
        height: 100%;
        border-radius: 44px;
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

      .dynamic-island {
        position: absolute;
        top: 11px;
        left: 50%;
        transform: translateX(-50%);
        width: 96px;
        height: 24px;
        background: #000000;
        border-radius: 20px;
        z-index: 30;
      }

      .screen-shine {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%);
        pointer-events: none;
        z-index: 20;
      }

      /* Dual Product Cards */
      .products-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .product-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 22px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        backdrop-filter: blur(16px);
      }

      .product-card.featured {
        background: linear-gradient(145deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%);
        border: 1px solid rgba(239, 68, 68, 0.45);
        box-shadow: 0 12px 35px rgba(220, 38, 38, 0.2);
      }

      .top-choice-tag {
        position: absolute;
        top: -11px;
        right: 16px;
        background: #dc2626;
        color: #ffffff;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 3px 10px;
        border-radius: 100px;
        border: 1px solid rgba(255,255,255,0.4);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .card-3d-img {
        width: 44px;
        height: 44px;
        object-fit: contain;
        filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5));
      }

      .card-title {
        font-size: 17px;
        font-weight: 800;
        color: #ffffff;
        line-height: 1.2;
      }

      .card-desc {
        font-size: 13px;
        color: #94a3b8;
        line-height: 1.4;
        margin: 10px 0;
      }

      .card-price-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
        padding-top: 6px;
        border-top: 1px solid rgba(255,255,255,0.06);
      }

      .card-price-val {
        font-size: 26px;
        font-weight: 900;
        font-family: 'JetBrains Mono', monospace;
        color: #ffffff;
      }

      .product-card.featured .card-price-val {
        color: #f87171;
      }

      .card-price-sub {
        font-size: 12px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
      }

      /* Main Action Box */
      .action-billboard {
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        border-radius: 28px;
        padding: 28px 32px;
        text-align: center;
        box-shadow: 0 25px 50px rgba(220, 38, 38, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.25);
      }

      .action-billboard-tag {
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.85);
      }

      .action-billboard-url {
        font-size: 44px;
        font-weight: 900;
        letter-spacing: -0.5px;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        margin: 6px 0 8px;
      }

      .action-billboard-sub {
        font-size: 15px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
      }

      /* Story Footer */
      .story-bottom-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        font-size: 15px;
        color: #64748b;
        font-weight: 600;
      }

      .momo-group-story {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .momo-badge-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .story-wa-contact {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #34d399;
        font-weight: 800;
        font-size: 17px;
      }
    </style>
  </head>
  <body>
    <div class="ambient-top"></div>
    <div class="ambient-bottom"></div>
    <div class="grid-lines"></div>

    <div class="content">
      <!-- Top Brand -->
      <div class="top-bar">
        <div class="brand-group">
          <img class="brand-icon" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
          <div class="brand-title">Nogadex<span>Consults</span></div>
        </div>
        <div class="live-badge">
          <div class="pulse-dot"></div>
          <span>Results Dropping</span>
        </div>
      </div>

      <!-- Headline -->
      <div class="hero-block">
        <div class="exam-tag">⚡ 2025 WAEC CANDIDATE PORTAL</div>
        <h1 class="main-headline">
          Check Results &amp; Buy Checkers<br/>
          <span class="headline-accent">Directly On Phone</span>
        </h1>
        <p class="hero-sub">
          Instant MoMo payment with printable PDF result slip delivery in 2 minutes.
        </p>
      </div>

      <!-- Center 3D iPhone Presentation -->
      <div class="phone-showcase">
        <div class="iphone-story-frame">
          <div class="dynamic-island"></div>
          <div class="iphone-story-screen">
            <img class="screen-img" src="data:image/png;base64,${phoneScreenBase64}" alt="Live Portal" />
            <div class="screen-shine"></div>
          </div>
        </div>
      </div>

      <!-- Dual Product Cards (PIN vs PDF) -->
      <div class="products-grid">
        <!-- Card 1: PIN Only -->
        <div class="product-card">
          <div>
            <div class="card-header">
              <img class="card-3d-img" src="data:image/png;base64,${key3dBase64}" alt="Checker PIN" />
              <div class="card-title">Buy Checker PIN</div>
            </div>
            <div class="card-desc">Instant SMS &amp; WhatsApp code delivery for self-checking on waecdirect.org.</div>
          </div>
          <div class="card-price-row">
            <span class="card-price-val">GH₵24.00</span>
            <span class="card-price-sub">/ PIN</span>
          </div>
        </div>

        <!-- Card 2: Full PDF Slip -->
        <div class="product-card featured">
          <div class="top-choice-tag">Most Popular</div>
          <div>
            <div class="card-header">
              <img class="card-3d-img" src="data:image/png;base64,${cert3dBase64}" alt="Result Slip" />
              <div class="card-title">Check Result &amp; PDF</div>
            </div>
            <div class="card-desc">We retrieve grades &amp; email a high-res printable PDF for University admission.</div>
          </div>
          <div class="card-price-row">
            <span class="card-price-val">GH₵30.00</span>
            <span class="card-price-sub">/ Complete</span>
          </div>
        </div>
      </div>

      <!-- Main Action Billboard -->
      <div class="action-billboard">
        <div class="action-billboard-tag">Check Your Result Now:</div>
        <div class="action-billboard-url">nogadexconsults.app</div>
        <div class="action-billboard-sub">Open in Chrome or Safari on your phone</div>
      </div>

      <!-- Story Footer -->
      <div class="story-bottom-bar">
        <div class="momo-group-story">
          <img class="momo-badge-img" src="data:image/png;base64,${mtnBase64}" alt="MTN" />
          <img class="momo-badge-img" src="data:image/png;base64,${telecelBase64}" alt="Telecel" />
          <img class="momo-badge-img" src="data:image/png;base64,${atBase64}" alt="AT" />
          <span style="font-size: 13px; color: #94a3b8; margin-left: 4px;">Instant MoMo</span>
        </div>
        <div class="story-wa-contact">
          <span>WhatsApp:</span>
          <span>+233 534 908 166</span>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // Render Square Flyer (2160x2160 at 2x)
  const pageSquare = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  });
  await pageSquare.setContent(squareHtml, { waitUntil: "networkidle" });
  await pageSquare.screenshot({
    path: "public/nogadex_promo_square.png",
    type: "png",
  });
  console.log("Rendered Senior Square Flyer (2160x2160): public/nogadex_promo_square.png");

  // Render Story Flyer (2160x3840 at 2x)
  const pageStory = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
  });
  await pageStory.setContent(storyHtml, { waitUntil: "networkidle" });
  await pageStory.screenshot({
    path: "public/nogadex_promo_story.png",
    type: "png",
  });
  console.log("Rendered Senior Story Flyer (2160x3840): public/nogadex_promo_story.png");

  await browser.close();
}

renderSeniorAgencyFlyers().catch((err) => {
  console.error("Flyer error:", err);
});
