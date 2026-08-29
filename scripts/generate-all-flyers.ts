import { chromium } from "playwright";
import fs from "fs";

async function generateAllFlyers() {
  const browser = await chromium.launch();

  // 1. Capture the REAL LIVE WEBSITE on mobile (http://localhost:3000)
  const livePage = await browser.newPage({ 
    viewport: { width: 390, height: 780 },
    deviceScaleFactor: 3
  });
  await livePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const realLiveSiteBase64 = (await livePage.screenshot({ type: "png" })).toString("base64");
  await livePage.close();

  // Read all authentic brand & background assets
  const logoBase64 = fs.readFileSync("public/logo.png").toString("base64");
  const mtnBase64 = fs.readFileSync("public/payments/mtn-circle.png").toString("base64");
  const telecelBase64 = fs.readFileSync("public/payments/telecel-circle.png").toString("base64");
  const atBase64 = fs.readFileSync("public/payments/at-circle.png").toString("base64");
  
  const studentBgBase64 = fs.existsSync("public/images/ghana-bg.jpg")
    ? fs.readFileSync("public/images/ghana-bg.jpg").toString("base64")
    : (fs.existsSync("public/images/students-bg.jpg") ? fs.readFileSync("public/images/students-bg.jpg").toString("base64") : "");

  const waecLogoBase64 = fs.existsSync("public/images/waec-logo.png")
    ? fs.readFileSync("public/images/waec-logo.png").toString("base64")
    : "";

  const whatsappIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  `;

  // ─────────────────────────────────────────────────────────────
  // SQUARE FLYER TEMPLATE (2160 x 2160)
  // ─────────────────────────────────────────────────────────────
  function getSquareHtml(isResultRelease: boolean) {
    const headline = isResultRelease
      ? `Results Are Out.<br/><span class="yellow-hl">Check Instantly.</span>`
      : `Buy WAEC Checkers<br/><span class="yellow-hl">&amp; Check Results.</span>`;
    const subtext = isResultRelease
      ? `Instant grade retrieval &amp; printable university PDF slip sent to your email. Scratch card PINs delivered via SMS.`
      : `Instant SMS &amp; WhatsApp scratch card PINs for WASSCE, BECE &amp; NOVDEC. Or get your official printable PDF result slip.`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Cabinet+Grotesk:wght@800;900&family=JetBrains+Mono:wght@800;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px;
          height: 1080px;
          background: #991b1b;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 48px 38px;
        }

        /* 1. Real Student Photography Background Layer (Subtly Blended) */
        .students-bg-photo {
          position: absolute;
          inset: 0;
          background-image: url('data:image/jpeg;base64,${studentBgBase64}');
          background-size: cover;
          background-position: center top;
          opacity: 0.12;
          mix-blend-mode: luminosity;
          z-index: 1;
        }

        /* 2. Brand Crimson Gradient Atmosphere */
        .canvas-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 20%, rgba(220, 38, 38, 0.92) 0%, rgba(153, 27, 27, 0.95) 50%, rgba(88, 13, 13, 0.98) 100%);
          z-index: 2;
        }

        /* 3. Subtle WAEC Watermark Emblem */
        .waec-watermark-symbol {
          position: absolute;
          top: 30px;
          right: 40px;
          width: 240px;
          height: 240px;
          opacity: 0.04;
          transform: rotate(-10deg);
          pointer-events: none;
          z-index: 3;
        }

        .canvas-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 4;
        }

        .content-wrap {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .top-nav {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .brand-badge {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo-img {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #ffffff;
          padding: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }

        .brand-title-text {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.6px;
          color: #ffffff;
        }

        .brand-title-text span {
          color: #fecaca;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.14fr 0.86fr;
          align-items: center;
          gap: 20px;
          margin: 6px 0;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .main-headline {
          font-size: 58px;
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: -2px;
        }

        .main-headline .yellow-hl {
          color: #fde047;
        }

        .subtext {
          font-size: 17px;
          line-height: 1.45;
          color: #fecaca;
          font-weight: 600;
        }

        .offer-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 4px;
        }

        .offer-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 154px;
          box-shadow: 0 14px 30px rgba(0,0,0,0.3);
        }

        .offer-card.primary {
          background: #fef08a;
          position: relative;
        }

        .popular-ribbon {
          position: absolute;
          top: -10px;
          right: 14px;
          background: #dc2626;
          color: #ffffff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .offer-title {
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
        }

        .offer-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.35;
          margin: 6px 0;
          font-weight: 600;
        }

        .offer-card.primary .offer-desc {
          color: #854d0e;
        }

        .offer-price {
          font-size: 26px;
          font-weight: 900;
          font-family: 'JetBrains Mono', monospace;
          color: #0f172a;
          margin-top: auto;
        }

        /* 3D Realistic Phone with Extruded Metallic Sides */
        .phone-3d-stage {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
        }

        .phone-3d-chassis {
          width: 325px;
          height: 615px;
          background: #0f172a;
          border-radius: 50px;
          padding: 9px;
          transform: rotateY(-20deg) rotateX(10deg) rotateZ(2deg);
          transform-style: preserve-3d;
          box-shadow: 
            1px 1px 0 #475569,
            2px 2px 0 #334155,
            3px 3px 0 #334155,
            4px 4px 0 #1e293b,
            5px 5px 0 #1e293b,
            6px 6px 0 #0f172a,
            7px 7px 0 #0f172a,
            8px 8px 0 #0f172a,
            9px 9px 0 #020617,
            10px 10px 0 #020617,
            -30px 40px 70px rgba(0,0,0,0.8),
            0 10px 30px rgba(0,0,0,0.5);
          position: relative;
        }

        .side-button-top {
          position: absolute;
          top: 110px;
          left: -4px;
          width: 4px;
          height: 40px;
          background: #64748b;
          border-radius: 2px 0 0 2px;
        }
        .side-button-bot {
          position: absolute;
          top: 160px;
          left: -4px;
          width: 4px;
          height: 40px;
          background: #64748b;
          border-radius: 2px 0 0 2px;
        }

        .phone-screen-inner {
          width: 100%;
          height: 100%;
          border-radius: 42px;
          overflow: hidden;
          background: #ffffff;
          position: relative;
        }

        .phone-screen-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .screen-glare-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, rgba(255,255,255,0.18) 0%, transparent 45%);
          pointer-events: none;
          z-index: 25;
        }

        .island-pill {
          position: absolute;
          top: 9px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 22px;
          background: #000000;
          border-radius: 20px;
          z-index: 30;
        }

        /* Integrated Footer */
        .integrated-footer {
          background: rgba(0, 0, 0, 0.4);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 22px;
          padding: 16px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(16px);
        }

        .footer-web {
          display: flex;
          flex-direction: column;
        }

        .web-label {
          font-size: 11px;
          font-weight: 800;
          color: #fecaca;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .web-domain {
          font-size: 30px;
          font-weight: 900;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: -0.5px;
        }

        .footer-right-cluster {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .momo-cluster {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .momo-cluster img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .wa-order-btn {
          background: #22c55e;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="students-bg-photo"></div>
      <div class="canvas-bg"></div>
      <img class="waec-watermark-symbol" src="data:image/png;base64,${waecLogoBase64}" alt="" />
      <div class="canvas-grid"></div>

      <div class="content-wrap">
        <!-- Top Brand Bar -->
        <div class="top-nav">
          <div class="brand-badge">
            <img class="brand-logo-img" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
            <div class="brand-title-text">Nogadex <span>Consults</span></div>
          </div>
        </div>

        <!-- Main Split -->
        <div class="hero-grid">
          <div class="hero-left">
            <h1 class="main-headline">
              ${headline}
            </h1>
            <p class="subtext">
              ${subtext}
            </p>

            <!-- 2 Clear Product Cards -->
            <div class="offer-cards-row">
              <div class="offer-card">
                <div>
                  <div class="offer-title">Buy Checker PIN</div>
                  <div class="offer-desc">Instant PIN code sent via SMS &amp; WhatsApp for self-checking on waecdirect.org</div>
                </div>
                <div class="offer-price">GH₵ 24.00</div>
              </div>

              <div class="offer-card primary">
                <div class="popular-ribbon">Most Popular</div>
                <div>
                  <div class="offer-title">Check Result + PDF</div>
                  <div class="offer-desc">We retrieve grades &amp; email a high-res printable PDF slip for university admission</div>
                </div>
                <div class="offer-price">GH₵ 30.00</div>
              </div>
            </div>
          </div>

          <!-- Right 3D Phone Showcase with REAL Website -->
          <div class="phone-3d-stage">
            <div class="phone-3d-chassis">
              <div class="side-button-top"></div>
              <div class="side-button-bot"></div>
              <div class="island-pill"></div>
              <div class="phone-screen-inner">
                <img src="data:image/png;base64,${realLiveSiteBase64}" alt="Nogadex Live Portal" />
                <div class="screen-glare-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Integrated Footer with Real WhatsApp Logo -->
        <div class="integrated-footer">
          <div class="footer-web">
            <div class="web-label">Visit Website:</div>
            <div class="web-domain">nogadexconsults.app</div>
          </div>

          <div class="footer-right-cluster">
            <div class="momo-cluster">
              <img src="data:image/png;base64,${mtnBase64}" alt="MTN" />
              <img src="data:image/png;base64,${telecelBase64}" alt="Telecel" />
              <img src="data:image/png;base64,${atBase64}" alt="AT" />
            </div>
            <div class="wa-order-btn">
              ${whatsappIconSvg}
              <span>053 490 8166</span>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  // ─────────────────────────────────────────────────────────────
  // STORY FLYER TEMPLATE (2160 x 3840)
  // ─────────────────────────────────────────────────────────────
  function getStoryHtml(isResultRelease: boolean) {
    const headline = isResultRelease
      ? `Results Are Out.<br/><span class="yellow-hl">Check Instantly.</span>`
      : `Buy WAEC Checkers<br/><span class="yellow-hl">&amp; Check Online.</span>`;
    const subtext = isResultRelease
      ? `Instant grade check &amp; printable PDF slip delivered to your email in 2 minutes.`
      : `Instant SMS &amp; WhatsApp scratch card PINs or printable PDF slip via Mobile Money.`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Cabinet+Grotesk:wght@800;900&family=JetBrains+Mono:wght@800;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px;
          height: 1920px;
          background: #991b1b;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 52px 48px;
        }

        /* 1. Real Student Photography Background Layer */
        .students-bg-story {
          position: absolute;
          inset: 0;
          background-image: url('data:image/jpeg;base64,${studentBgBase64}');
          background-size: cover;
          background-position: center top;
          opacity: 0.12;
          mix-blend-mode: luminosity;
          z-index: 1;
        }

        /* 2. Brand Crimson Gradient Canvas */
        .canvas-bg-story {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 15%, rgba(220, 38, 38, 0.92) 0%, rgba(153, 27, 27, 0.95) 50%, rgba(88, 13, 13, 0.98) 100%);
          z-index: 2;
        }

        /* 3. Subtle WAEC Watermark Emblem */
        .waec-watermark-story {
          position: absolute;
          top: 40px;
          right: 50px;
          width: 280px;
          height: 280px;
          opacity: 0.04;
          transform: rotate(-10deg);
          pointer-events: none;
          z-index: 3;
        }

        .canvas-grid-story {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 4;
        }

        .story-wrapper {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .story-top-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .story-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .story-brand-img {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: #ffffff;
          padding: 5px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }

        .story-brand-text {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.6px;
        }

        .story-brand-text span {
          color: #fecaca;
        }

        .story-headline-block {
          text-align: center;
          margin: 10px 0 4px;
        }

        .story-title {
          font-size: 72px;
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -2.5px;
        }

        .story-title .yellow-hl {
          color: #fde047;
        }

        .story-subtext {
          font-size: 22px;
          color: #fecaca;
          margin-top: 10px;
          font-weight: 600;
          max-width: 860px;
          margin-left: auto;
          margin-right: auto;
        }

        /* 3D Phone Center with Extruded Metallic Sides */
        .story-phone-center {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1400px;
          margin: 10px 0;
        }

        .story-phone-3d {
          width: 420px;
          height: 820px;
          background: #0f172a;
          border-radius: 60px;
          padding: 12px;
          transform: rotateY(-18deg) rotateX(8deg) rotateZ(2deg);
          transform-style: preserve-3d;
          box-shadow: 
            1px 1px 0 #475569,
            2px 2px 0 #334155,
            3px 3px 0 #334155,
            4px 4px 0 #1e293b,
            5px 5px 0 #1e293b,
            6px 6px 0 #0f172a,
            7px 7px 0 #0f172a,
            8px 8px 0 #0f172a,
            9px 9px 0 #020617,
            10px 10px 0 #020617,
            12px 12px 0 #020617,
            -40px 50px 85px rgba(0,0,0,0.8),
            0 15px 40px rgba(0,0,0,0.5);
          position: relative;
        }

        .story-screen-frame {
          width: 100%;
          height: 100%;
          border-radius: 48px;
          overflow: hidden;
          background: #ffffff;
          position: relative;
        }

        .story-screen-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .story-island-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 28px;
          background: #000000;
          border-radius: 20px;
          z-index: 30;
        }

        .story-screen-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, rgba(255,255,255,0.18) 0%, transparent 45%);
          pointer-events: none;
          z-index: 25;
        }

        /* Product Cards */
        .story-cards-deck {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin: 8px 0;
        }

        .story-card-box {
          background: #ffffff;
          border-radius: 22px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 35px rgba(0,0,0,0.25);
        }

        .story-card-box.highlight {
          background: #fef08a;
          position: relative;
        }

        .story-card-ribbon {
          position: absolute;
          top: -11px;
          right: 16px;
          background: #dc2626;
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
          padding: 4px 12px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .story-card-head {
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
        }

        .story-card-copy {
          font-size: 13px;
          color: #64748b;
          line-height: 1.35;
          margin: 8px 0;
          font-weight: 600;
        }

        .story-card-box.highlight .story-card-copy {
          color: #854d0e;
        }

        .story-card-price-tag {
          font-size: 32px;
          font-weight: 900;
          font-family: 'JetBrains Mono', monospace;
          color: #0f172a;
          margin-top: auto;
        }

        /* Integrated Story Footer with Real WhatsApp Logo */
        .story-footer-card {
          background: rgba(0, 0, 0, 0.45);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(16px);
        }

        .story-web-info {
          display: flex;
          flex-direction: column;
        }

        .story-web-label {
          font-size: 13px;
          font-weight: 800;
          color: #fecaca;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .story-web-url {
          font-size: 38px;
          font-weight: 900;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: -0.5px;
        }

        .story-footer-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .story-momo-strip {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .story-momo-strip img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .story-wa-button {
          background: #22c55e;
          color: #ffffff;
          padding: 14px 24px;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 18px rgba(34, 197, 94, 0.45);
        }
      </style>
    </head>
    <body>
      <div class="students-bg-story"></div>
      <div class="canvas-bg-story"></div>
      <img class="waec-watermark-story" src="data:image/png;base64,${waecLogoBase64}" alt="" />
      <div class="canvas-grid-story"></div>

      <div class="story-wrapper">
        <!-- Header -->
        <div class="story-top-row">
          <div class="story-brand">
            <img class="story-brand-img" src="data:image/png;base64,${logoBase64}" alt="Nogadex" />
            <div class="story-brand-text">Nogadex <span>Consults</span></div>
          </div>
        </div>

        <!-- Headline -->
        <div class="story-headline-block">
          <h1 class="story-title">
            ${headline}
          </h1>
          <p class="story-subtext">
            ${subtext}
          </p>
        </div>

        <!-- Center 3D Phone with REAL Website -->
        <div class="story-phone-center">
          <div class="story-phone-3d">
            <div class="story-island-notch"></div>
            <div class="story-screen-frame">
              <img src="data:image/png;base64,${realLiveSiteBase64}" alt="Portal UI" />
              <div class="story-screen-glare"></div>
            </div>
          </div>
        </div>

        <!-- Product Cards -->
        <div class="story-cards-deck">
          <div class="story-card-box">
            <div>
              <div class="story-card-head">Buy Checker PIN</div>
              <div class="story-card-copy">Instant PIN delivered via SMS &amp; WhatsApp for waecdirect.org</div>
            </div>
            <div class="story-card-price-tag">GH₵ 24.00</div>
          </div>

          <div class="story-card-box highlight">
            <div class="story-card-ribbon">Most Popular</div>
            <div>
              <div class="story-card-head">Check Result + PDF</div>
              <div class="story-card-copy">We check grades &amp; email a high-res printable PDF for university admission</div>
            </div>
            <div class="story-card-price-tag">GH₵ 30.00</div>
          </div>
        </div>

        <!-- Integrated Story Footer with Real WhatsApp Logo -->
        <div class="story-footer-card">
          <div class="story-web-info">
            <div class="story-web-label">Visit Website:</div>
            <div class="story-web-url">nogadexconsults.app</div>
          </div>

          <div class="story-footer-right">
            <div class="story-momo-strip">
              <img src="data:image/png;base64,${mtnBase64}" alt="MTN" />
              <img src="data:image/png;base64,${telecelBase64}" alt="Telecel" />
              <img src="data:image/png;base64,${atBase64}" alt="AT" />
            </div>
            <div class="story-wa-button">
              ${whatsappIconSvg}
              <span>053 490 8166</span>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  // 1. General Business Flyer (Square)
  const page1 = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  await page1.setContent(getSquareHtml(false), { waitUntil: "domcontentloaded" });
  await page1.evaluate(() => document.fonts.ready);
  await page1.screenshot({ path: "public/nogadex_promo_general_square.png", type: "png" });
  await page1.screenshot({ path: "public/nogadex_promo_square.png", type: "png" });
  console.log("Rendered General Square Flyer (2160x2160)");

  // 2. General Business Flyer (Story)
  const page2 = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await page2.setContent(getStoryHtml(false), { waitUntil: "domcontentloaded" });
  await page2.evaluate(() => document.fonts.ready);
  await page2.screenshot({ path: "public/nogadex_promo_general_story.png", type: "png" });
  await page2.screenshot({ path: "public/nogadex_promo_story.png", type: "png" });
  console.log("Rendered General Story Flyer (2160x3840)");

  // 3. Results Out Alert Flyer (Square)
  const page3 = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  await page3.setContent(getSquareHtml(true), { waitUntil: "domcontentloaded" });
  await page3.evaluate(() => document.fonts.ready);
  await page3.screenshot({ path: "public/nogadex_promo_results_square.png", type: "png" });
  console.log("Rendered Results Released Square Flyer (2160x2160)");

  // 4. Results Out Alert Flyer (Story)
  const page4 = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await page4.setContent(getStoryHtml(true), { waitUntil: "domcontentloaded" });
  await page4.evaluate(() => document.fonts.ready);
  await page4.screenshot({ path: "public/nogadex_promo_results_story.png", type: "png" });
  console.log("Rendered Results Released Story Flyer (2160x3840)");

  await browser.close();
}

generateAllFlyers().catch(console.error);
