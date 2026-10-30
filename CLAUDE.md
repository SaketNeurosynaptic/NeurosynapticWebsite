# ReMeDi – shared project context (read this first)

This file is the shared memory for everyone working on this folder with Claude.
Keep it short and current. Update it when a decision changes.

## Team
- Saket Barmate – Engineering Manager; owns content, tender documents, website product pages
- Shubham – developer; owns website code and the ReMeDi React Native app
- Sameer Sawarkar – Founder & CEO, final approver for anything external (tenders, official documents)

## Company
Neurosynaptic Communications Pvt. Ltd. (NCPL), founded 2002, Bangalore.
Address: No. 48/2, Sulappa Tower, Doddanagamangala, Electronic City Post, Bangalore – 560 100.
info@neurosynaptic.com · +91-80-4131-3168

## Products (facts we may use)
- ReMeDi Platform – cloud telemedicine app (doctors, nurses, admins), workflow automation, MIS, Windows + Android, offline mode, multi-party video.
- ReMeDi Kit – portable 3.5 kg briefcase, 40+ point-of-care tests, Make in India, IEC 60601 tested; company has ISO 13485:2016 QMS.
- ReMeDi e-Sanjeevani – Android app integrated with national e-Sanjeevani (MoHFW / C-DAC). C-DAC confirmed integration completion Feb 2025. App v4.1.3 (build 13), Android 12/13/14. 27 diagnostic parameters. Test report 07-Mar-2025 (86 test cases).
- ReMeDi IoT – connected point-of-care diagnostics for ANY health platform (State HMIS, HIS/EMR, third-party telemedicine).
  - ReMeDi IoT and ReMeDi e-Sanjeevani are DIFFERENT products with the SAME app UI. Only call handling/routing in ReMeDi Cloud differs.
  - Flow: token auth → test request (patient, tests, health-worker phone, integrator visit ID) → pending list on app → health worker takes tests with devices → readings/PDF/WAV uploaded → ReMeDi Cloud pushes results to integrator server, retrying until acknowledged.
  - Security: separate credentials each direction, time-bound tokens, per-integrator config, result push carries only visit ID (no patient name).

## Rules / decisions
- Do NOT claim ABDM or HL7/FHIR compliance for ReMeDi IoT (removed at review).
- Do NOT show API endpoint names in customer/tender material – high level only.
- Never invent numbers, certifications, customers or prices. If unknown, leave a clearly marked blank for Sameer.
- Pronunciation for voiceovers: ReMeDi = "Remedy", IoT = "I O T", e-Sanjeevani = "ee-sun-JEE-vuh-nee".
- WhatsApp number on website (8871613869) is TEMPORARY – replace with company WhatsApp Business number (one line in website/site-widgets.js).

## Folder map
- website/ – local clone of neurosynaptic.com (18 pages) + ReMeDi IoT product page. Open neurosynaptic_site_clone.html.
  - site-widgets.js – chatbot, WhatsApp button, quote form, header social icons, Contact page + map enhancements. All widget changes go here.
  - Styling/images still load from neurosynaptic.com (needs internet).
- docs/tender/ – Annexure II (ReMeDi IoT) + solution architecture diagram.
- docs/specs/ – ReMeDi e-Sanjeevani technical specification.
- media/ – (explainer video lives in website/ so the product page can play it)

## Open items
- Annexure II rows 9, 10, 21, 23, 26 need Sameer (approvals, risk class, price/GST/HSN, GeM, patent).
- Brochure + tech spec to be rebranded to ReMeDi IoT (Sai).
- Quote form has no backend – connect to Google Sheet / CRM before going live.
- COEP test report: COEP signature block blank; test-case count 86 vs breakdown 118 – fix source.
- Terms & Privacy page still links to live site.

## How we work
- One Jira ticket per piece of work; assignee owns the files for that ticket.
- Work on a Git branch, open a pull request, the other person reviews.
- Don't edit the same file at the same time.
