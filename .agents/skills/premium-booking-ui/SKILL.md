---
name: premium-booking-ui
description: UI/UX patterns for gig detail, booking, and application screens based on Airbnb and Upwork.
---

# Premium Booking & Gig UI Patterns

Use this skill when creating or modifying screens related to **Gig Details, Booking Details, and Applications**. These rules synthesize the best UX practices from platforms like Airbnb (for bookings/transactions) and Upwork/Fiverr (for gig/job details).

## 1. Information Architecture & Cognitive Load
- **Never use a flat list of text.** Group related information into distinct, elevated "Cards" with subtle hairlines or shadows.
- **The "Three Card" Rule:** 
  1. **Logistics Card:** Date, Time, Location, Duration.
  2. **Requirements Card:** What is expected, what is provided, dress code.
  3. **Parties Card:** Who is involved (Client / Talent profile summaries).
- **Whitespace is UI:** Separate cards with generous spacing (`SPACING.xl` or `SPACING.xxl`), not tight gaps.

## 2. Trust and Social Proof (The Upwork/Fiverr Rule)
- **Elevate the Client/Talent:** The profile of the person posting the gig or involved in the booking must be prominent. Show their avatar, name, verification badge, and rating (if applicable) immediately below the hero section or title.
- **Clarity over Cleverness:** Do not hide the budget or payment status. They should be the most legible numbers on the screen.

## 3. The Sticky Action Footer (The Airbnb Rule)
- **Persistent CTA:** The primary action (Apply, Message, Withdraw) must live in a persistent, semi-transparent or solid bottom footer (with `useSafeInsets().bottom`). 
- **Contextualize the CTA:** Always pair the CTA with the most critical decision-making data (e.g., the Total Price / Budget) directly next to or above it in the footer.
- Example: `[ Budget: 500 GHS ] [ Apply Now -> ]`

## 4. Visualizing Status & Timeline
- For bookings, use a visual timeline or progress tracker (e.g., Confirmed -> In Progress -> Completed). Do not rely solely on a text status badge.
- Use the semantic color palette (`COLORS.warning`, `COLORS.success`, `COLORS.error`) strictly for statuses to instantly convey state without reading.

## 5. Interaction Design
- **Frictionless Conversion:** Screens leading to an application or payment must remove all unnecessary navigation. 
- **Haptic Reinforcement:** Use `haptics.light()` when expanding details and `haptics.success()` when a booking or application is submitted.
