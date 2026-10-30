/* NCPL site widgets: floating social dock, ReMeDi assistant chatbot, WhatsApp button, copyright year.
   CONFIG: set WHATSAPP_NUMBER to the company's WhatsApp Business number (country code, digits only, e.g. "9198XXXXXXXX").
   Leave empty to hide all WhatsApp options. */
(function () {
  var CONFIG = {
    WHATSAPP_NUMBER: "918871613869", /* temporary – replace with company WhatsApp Business number */
    AUTO_OPEN_SECONDS: 6,
    WHATSAPP_TEXT: "Hello NCPL, I would like to know more about ReMeDi IoT.",
    EMAIL: "info@neurosynaptic.com",
    PHONE: "+91-80-4131-3168",
    PHONE_TEL: "+918041313168",
    SOCIAL: [
      { n: "LinkedIn", i: "bi-linkedin", u: "https://www.linkedin.com/company/neurosynaptic-communications/", g: "linear-gradient(135deg,#0A66C2,#004182)", sh: "rgba(10,102,194,.55)" },
      { n: "YouTube", i: "bi-youtube", u: "https://www.youtube.com/user/NeurosynapticCommn", g: "linear-gradient(135deg,#FF3D3D,#C4302B)", sh: "rgba(255,0,0,.45)" },
      { n: "Facebook", i: "bi-facebook", u: "https://www.facebook.com/NSCPL", g: "linear-gradient(135deg,#3B8BFF,#1877F2)", sh: "rgba(24,119,242,.5)" },
      { n: "X", i: "bi-twitter-x", u: "https://x.com/neurosynaptic", g: "linear-gradient(135deg,#333,#000)", sh: "rgba(0,0,0,.45)" }
    ]
  };
  var ON_IOT = /remedi-iot/i.test(location.pathname);
  var ON_HOME = /neurosynaptic_site_clone|index\.html$|\/$/i.test(location.pathname);
  var IOT = ON_IOT ? "#" : "remedi-iot.html";

  var css = `
  .sw-dock{position:fixed;left:22px;top:50%;transform:translateY(-50%);z-index:2500;display:flex;flex-direction:column;align-items:center;gap:12px;padding:16px 10px 14px;border-radius:999px;background:linear-gradient(160deg,rgba(2,6,59,.82),rgba(37,78,147,.78));backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);box-shadow:0 18px 40px rgba(2,6,59,.35),inset 0 1px 0 rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.14);animation:swIn .8s cubic-bezier(.2,.8,.2,1) both}
  .sw-dock .lbl{writing-mode:vertical-rl;transform:rotate(180deg);color:rgba(255,255,255,.75);font:800 10.5px 'Nunito Sans',sans-serif;letter-spacing:3px;text-transform:uppercase;margin-bottom:2px}
  .sw-dock .sep{width:18px;height:1px;background:rgba(255,255,255,.25)}
  .sw-dock a{position:relative;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:#fff;font-size:19px;background:rgba(255,255,255,.08);text-decoration:none;transition:transform .3s cubic-bezier(.2,.8,.2,1),background .3s,box-shadow .3s,border-radius .3s;overflow:visible}
  .sw-dock a:before{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--g);opacity:0;transition:opacity .3s}
  .sw-dock a i{position:relative;z-index:1}
  .sw-dock a:hover,.sw-dock a:focus-visible{transform:translateX(6px) scale(1.1);border-radius:50%;box-shadow:0 10px 24px var(--sh);outline:none}
  .sw-dock a:hover:before,.sw-dock a:focus-visible:before{opacity:1}
  .sw-dock a span{position:absolute;left:58px;white-space:nowrap;background:#fff;color:#02063B;font:700 13px/1 'Nunito Sans',sans-serif;padding:8px 12px;border-radius:10px;opacity:0;pointer-events:none;transform:translateX(-8px);transition:.25s;box-shadow:0 8px 20px rgba(2,6,59,.2)}
  .sw-dock a span:before{content:"";position:absolute;left:-5px;top:50%;width:10px;height:10px;background:#fff;transform:translateY(-50%) rotate(45deg)}
  .sw-dock a:hover span,.sw-dock a:focus-visible span{opacity:1;transform:none}
  @keyframes swIn{from{opacity:0;transform:translate(-30px,-50%)}to{opacity:1;transform:translateY(-50%)}}
  .sw-fabs{position:fixed;right:22px;bottom:22px;z-index:2600;display:flex;flex-direction:column;gap:12px;align-items:flex-end}
  .sw-fab{width:60px;height:60px;border-radius:50%;border:0;display:grid;place-items:center;font-size:26px;color:#fff;cursor:pointer;box-shadow:0 10px 26px rgba(2,6,59,.3);transition:transform .25s;text-decoration:none}
  .sw-fab:hover{transform:scale(1.08)}
  .sw-wa{width:auto;height:58px;padding:0 8px 0 8px;border-radius:999px;background:linear-gradient(135deg,#25D366,#128C7E);display:flex;align-items:center;gap:0;position:relative;overflow:visible;transition:gap .35s,padding .35s,transform .25s}
  .sw-wa .ic{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center;font-size:23px;position:relative}
  .sw-wa .ic:after{content:"";position:absolute;top:2px;right:2px;width:10px;height:10px;border-radius:50%;background:#b8ff5c;border:2px solid #1fb75a}
  .sw-wa .tx{max-width:0;overflow:hidden;white-space:nowrap;font:800 14.5px/1.1 'Nunito Sans',sans-serif;color:#fff;transition:max-width .4s,margin .4s}
  .sw-wa .tx small{display:block;font-weight:600;font-size:11.5px;opacity:.85}
  .sw-wa:hover,.sw-wa.peek{gap:10px;padding-right:20px}
  .sw-wa:hover .tx,.sw-wa.peek .tx{max-width:180px}
  .sw-wa:before{content:"";position:absolute;inset:-4px;border-radius:inherit;border:2px solid rgba(37,211,102,.55);animation:swPulse 2.6s infinite}
  .sw-chat-btn{background:linear-gradient(135deg,#254E93,#02063B);position:relative}
  .sw-chat-btn:after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #254E93;animation:swPulse 2.2s infinite}
  @keyframes swPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
  .sw-hint{background:#fff;color:#02063B;font:600 14px 'Nunito Sans',sans-serif;padding:10px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 8px 22px rgba(2,6,59,.18);max-width:220px;animation:swUp .5s both}
  .sw-panel{position:fixed;right:22px;bottom:96px;z-index:2601;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 120px);background:#fff;border-radius:20px;box-shadow:0 24px 60px rgba(2,6,59,.3);display:flex;flex-direction:column;overflow:hidden;font-family:'Nunito Sans',sans-serif;animation:swUp .35s cubic-bezier(.2,.8,.2,1) both}
  .sw-panel[hidden]{display:none}
  @keyframes swUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  .sw-head{background:linear-gradient(135deg,#254E93,#02063B);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px}
  .sw-av{width:42px;height:42px;border-radius:50%;background:#fff;color:#254E93;display:grid;place-items:center;font-size:20px}
  .sw-head b{display:block;font-size:16px}.sw-head small{opacity:.85;font-size:12.5px}
  .sw-head small:before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:#3ddc84;margin-right:6px}
  .sw-x{margin-left:auto;background:rgba(255,255,255,.15);border:0;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer}
  .sw-body{flex:1;overflow-y:auto;padding:16px;background:#F3F7FD;display:flex;flex-direction:column;gap:10px}
  .sw-m{max-width:85%;padding:10px 13px;border-radius:16px;font-size:14.5px;line-height:1.45;animation:swUp .25s both}
  .sw-m a{color:inherit;font-weight:700}
  .sw-bot{background:#fff;color:#333;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(2,6,59,.06)}
  .sw-me{background:#254E93;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
  .sw-qr{display:flex;flex-wrap:wrap;gap:7px}
  .sw-qr button{border:1.5px solid #254E93;background:#fff;color:#254E93;border-radius:20px;padding:6px 12px;font:600 13px 'Nunito Sans',sans-serif;cursor:pointer;transition:.2s}
  .sw-qr button:hover{background:#254E93;color:#fff}
  .sw-typing{display:flex;gap:4px;padding:12px 14px}.sw-typing i{width:7px;height:7px;border-radius:50%;background:#9bb0d4;animation:swDot 1s infinite}
  .sw-typing i:nth-child(2){animation-delay:.15s}.sw-typing i:nth-child(3){animation-delay:.3s}
  @keyframes swDot{0%,60%,100%{transform:none;opacity:.5}30%{transform:translateY(-5px);opacity:1}}
  .sw-in{display:flex;gap:8px;padding:12px;border-top:1px solid #e6ecf5;background:#fff}
  .sw-in input{flex:1;border:1.5px solid #d7e1f0;border-radius:24px;padding:10px 15px;font:15px 'Nunito Sans',sans-serif;outline:none}
  .sw-in input:focus{border-color:#254E93}
  .sw-in button{width:44px;height:44px;border-radius:50%;border:0;background:#254E93;color:#fff;font-size:17px;cursor:pointer}
  .sw-foot{font-size:11px;color:#8a97ad;text-align:center;padding:0 0 8px;background:#fff}
  a.sw-contact{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;margin:4px 0;border-radius:30px;background:#fff;color:#254E93;text-decoration:none;font-weight:600;box-shadow:0 4px 14px rgba(37,78,147,.12);transition:.2s}
  a.sw-contact:hover{background:#254E93;color:#fff;transform:translateY(-2px)}
  @media(max-width:768px){.sw-dock{left:50%;top:auto;bottom:14px;transform:translateX(-50%);flex-direction:row;padding:7px 12px;animation:none}.sw-dock .lbl,.sw-dock .sep{display:none}
   .sw-dock a{width:38px;height:38px;font-size:17px}.sw-dock a span{display:none}.sw-dock a:hover{transform:translateY(-3px)}
   .sw-fabs{bottom:72px;right:14px}.sw-fab{width:54px;height:54px}.sw-panel{right:16px;bottom:140px;height:calc(100vh - 170px)}}
  @media(prefers-reduced-motion:reduce){.sw-dock,.sw-panel,.sw-m,.sw-hint{animation:none}.sw-chat-btn:after{display:none}}
  `;
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  document.querySelectorAll(".js-year").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  // Social dock
  if (ON_HOME) {
    var hs = document.createElement("style");
    hs.textContent = '.sw-hsoc{display:flex;align-items:center;gap:8px;margin-left:18px;padding-left:18px;border-left:1px solid rgba(255,255,255,.35)}' +
      '.sw-hsoc a{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:15px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.28);text-decoration:none;position:relative;overflow:hidden;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}' +
      '.sw-hsoc a:before{content:"";position:absolute;inset:0;background:var(--g);opacity:0;transition:opacity .3s}.sw-hsoc a i{position:relative}' +
      '.sw-hsoc a:hover,.sw-hsoc a:focus-visible{transform:translateY(-3px) scale(1.08);box-shadow:0 8px 20px var(--sh);outline:none}.sw-hsoc a:hover:before,.sw-hsoc a:focus-visible:before{opacity:1}' +
      '@media(max-width:1199px){.sw-hsoc{display:none}}';
    document.head.appendChild(hs);
    var nc = document.querySelector("header .nav-container");
    if (nc) {
      var soc = document.createElement("div"); soc.className = "sw-hsoc"; soc.setAttribute("aria-label", "Follow us");
      CONFIG.SOCIAL.forEach(function (s) { soc.insertAdjacentHTML("beforeend", '<a href="' + s.u + '" target="_blank" rel="noopener" title="' + s.n + '" aria-label="' + s.n + '" style="--g:' + s.g + ';--sh:' + s.sh + '"><i class="bi ' + s.i + '"></i></a>'); });
      nc.appendChild(soc);
    }
  }

  // FABs
  var wa = CONFIG.WHATSAPP_NUMBER ? "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(CONFIG.WHATSAPP_TEXT) : "";
  var fabs = document.createElement("div"); fabs.className = "sw-fabs";
  fabs.innerHTML = (wa ? '<a class="sw-fab sw-wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><span class="ic"><i class="bi bi-whatsapp"></i></span><span class="tx">Chat on WhatsApp<small>Typically replies in minutes</small></span></a>' : "") +
    '<button class="sw-fab sw-chat-btn" type="button" aria-label="Open chat assistant"><i class="bi bi-chat-dots-fill"></i></button>';
  document.body.appendChild(fabs);
  var waEl = fabs.querySelector(".sw-wa"); if (waEl) { setTimeout(function () { waEl.classList.add("peek"); }, 2500); setTimeout(function () { waEl.classList.remove("peek"); }, 7500); }

  // Chat panel
  var p = document.createElement("div"); p.className = "sw-panel"; p.hidden = true; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "ReMeDi Assistant");
  p.innerHTML = '<div class="sw-head"><div class="sw-av"><i class="bi bi-heart-pulse-fill"></i></div><div><b>ReMeDi Assistant</b><small>Online · replies instantly</small></div><button class="sw-x" aria-label="Close chat"><i class="bi bi-x-lg"></i></button></div>' +
    '<div class="sw-body" aria-live="polite"></div><form class="sw-in"><input placeholder="Type your question…" aria-label="Your message" autocomplete="off"><button aria-label="Send"><i class="bi bi-send-fill"></i></button></form><div class="sw-foot">Automated assistant · for detailed queries our team will respond</div>';
  document.body.appendChild(p);
  var body = p.querySelector(".sw-body"), inp = p.querySelector("input");

  var MAIN = ON_IOT
    ? ["How does it work?", "Which tests?", "e-Sanjeevani", "How to integrate?", "Get an integration quote", "Site map", "Talk to a person"]
    : ["About NCPL", "Our products", "ReMeDi Platform", "ReMeDi Kit", "Awards", "Site map", "Talk to a person"];
  var GREET = ON_IOT
    ? "Hi there! 👋 Exploring ReMeDi IoT? I can explain how it connects point-of-care tests to your health platform, the 27 tests it supports, or prepare an integration quote for you."
    : "Hi there! 👋 Welcome to Neurosynaptic. Need some help? I can tell you about NCPL, the ReMeDi Platform and Kit, our healthcare models and products — or connect you with our team.";
  var KB = [
    { k: ["site map", "sitemap", "navigate", "pages", "menu", "where can i find"], a: 'Here is everything on our site:<br>• <a href="neurosynaptic_site_clone.html">Home</a><br>• About: <a href="about-us.html">About Us</a>, <a href="leadership-team-head.html">Leadership</a>, <a href="board-of-directors.html">Board</a>, <a href="partnerships.html">Partnerships</a>, <a href="testimonial.html">Testimonials</a>, <a href="commitment-to-quality-2.html">Quality</a>, <a href="awards-and-recognitions-2.html">Awards</a><br>• Solutions: <a href="our-services-and-solutions.html">Services & Solutions</a>, <a href="remedi-solutions-suite.html">ReMeDi Solutions Suite</a>, <a href="remedi-kit-standard-configuration.html">ReMeDi Kit configuration</a><br>• Products: <a href="remedi-iot.html">ReMeDi IoT</a><br>• Media: <a href="downloads.html">Downloads</a>, <a href="photo-gallery.html">Photos</a>, <a href="video-gallery.html">Videos</a>, <a href="blog.html">Blog</a><br>• <a href="contact-us-2.html">Contact Us</a>', q: ["Leadership", "Awards", "Downloads", "Talk to a person"] },
    { k: ["leader", "founder", "ceo", "sameer", "rajeev", "management"], a: 'NCPL was founded in 2002 by Sameer Sawarkar (Founder & CEO, Ashoka Fellow, 29 years of technical and management experience) and Rajeev Kumar. Meet the full team on the <a href="leadership-team-head.html">Leadership page</a>.', q: ["Board of directors", "About NCPL"] },
    { k: ["board", "director", "investor"], a: 'Our Board includes Nagaraja Prakasam (angel investor, co-founder IANImpact), Charles-Antoine Janssen (co-founder, Kois impact investing) and Shrikant Shingane, among others. Investors include IAN, HealthQuad and KOIS. <a href="board-of-directors.html">See the Board</a>.', q: ["Leadership", "Partners"] },
    { k: ["award", "recognition", "honour", "honor", "prize"], a: 'Highlights: IHW Digital Solution for Rural Healthcare (2023), Frost & Sullivan Scalable Tech Award (2022), Red Herring Award (2022), Inspire Innovation Award (2017), Frost & Sullivan Emerging Digital Healthcare Service Provider (2017), Millennium Alliance Award (2016) and NASSCOM Social Innovation – Jury\'s Special Choice (2014). <a href="awards-and-recognitions-2.html">All awards</a>.', q: ["Quality & certifications", "Leadership"] },
    { k: ["download", "brochure", "case study", "report", "who report"], a: 'Downloads include the ReMeDi brochure, the WHO report listing ReMeDi, an IIM-Bangalore case study and ISB/Access Health research. <a href="downloads.html">Go to Downloads</a>.', q: ["ReMeDi Kit", "Talk to a person"] },
    { k: ["photo", "gallery", "image", "picture"], a: 'See camps, deployments and events in our <a href="photo-gallery.html">Photo Gallery</a>.', q: ["Videos", "Site map"] },
    { k: ["video", "youtube", "watch"], a: 'Watch our story, the NASSCOM Social Innovation feature and CNBC Young Turks in the <a href="video-gallery.html">Video Gallery</a>' + (ON_IOT ? ' — or the ReMeDi IoT explainer on this page.' : '.'), q: ["Photos", "Site map"] },
    { k: ["blog", "article", "news"], a: 'Read our perspectives on telemedicine and CSR-funded health on the <a href="blog.html">Blog</a>.', q: ["Site map"] },
    { k: ["service", "solution", "turnkey", "bespoke", "customis"], a: 'NCPL is a solution-first “Healthcare Solutionist”: turnkey telemedicine services for PHCs and beyond, augmenting government & partner programmes, and bespoke healthcare solutioning (incl. AI-enabled diagnostics). <a href="our-services-and-solutions.html">Services & Solutions</a>.', q: ["ReMeDi models", "Our products"] },
    { k: ["configuration", "kit contents", "standard config"], a: 'See what comes in the box on the <a href="remedi-kit-standard-configuration.html">ReMeDi Kit – Standard Configuration</a> page.', q: ["ReMeDi Kit", "Which tests?"] },
    { k: ["waste", "e-waste", "recycl"], a: 'NCPL follows responsible e-waste management with an authorised recycling partner. <a href="e-waste-management-policy.html">e-Waste policy</a>.', q: ["Quality & certifications"] },
    { k: ["address", "office", "location", "visit", "where are you", "bangalore"], a: 'NCPL, No. 48/2, Sulappa Tower, Doddanagamangala, Electronic City Post, Bangalore – 560 100, Karnataka. <a href="https://maps.google.com/?q=Sulappa+Tower+Doddanagamangala+Electronic+City+Bangalore" target="_blank" rel="noopener">Open in Maps</a>.', q: ["Talk to a person"] },
    { k: ["partner", "partnership", "collaborat", "csr"], a: 'We work with governments, CSR donors, NGOs and technology partners — including IPE Global (USAID SAMRIDH), HCL Foundation, NSE Foundation, Bayer Foundation, Grand Challenges Canada, Millennium Alliance and Global Health Labs. Want to partner? Use the Partnership tab on <a href="contact-us-2.html">Contact Us</a>.', q: ["Talk to a person", "Testimonials"] },
    { k: ["testimonial", "review", "feedback"], a: 'Partners such as HCL Foundation, IPE Global, Jubilant Bhartia Foundation, World Health Partners and Apollo Telemedicine Networking Foundation share their experience on our <a href="testimonial.html">Testimonials page</a>.', q: ["Partners", "Site map"] },
    { k: ["our products", "products", "offerings"], a: 'Our offerings: the <b>ReMeDi Platform</b> (cloud telemedicine software), the <b>ReMeDi Kit</b> (portable 40+ test diagnostics) and <b>ReMeDi IoT</b> — connected point-of-care diagnostics for any health platform. <a href="remedi-iot.html">Explore ReMeDi IoT →</a>', q: ["ReMeDi Platform", "ReMeDi Kit", "Talk to a person"] },
    { k: ["quote", "pricing quote", "proposal", "estimate", "get an integration"], quote: true },
    { k: ["platform", "telemedicine app", "software", "remedi platform"], a: "The ReMeDi Platform is a cloud-based telemedicine application connecting doctors, nurses and administrators. Key features: point-of-care diagnostics, complete workflow automation, Windows PC & Android support, Management Information System (MIS), multi-party video consultation and offline mode for low-connectivity areas. It is e-Sanjeevani ready and has powered 2,500+ rural health centres.", q: ["ReMeDi Kit", "ReMeDi models", "Get an integration quote"] },
    { k: ["kit", "briefcase", "portable", "hardware kit"], a: "The ReMeDi Kit is a portable 3.5 kg briefcase with 40+ point-of-care diagnostic tests. It is indigenously developed (Make in India), wireless and energy efficient, uses patent-pending Safe-Devices technology, has a simple single-button interface and is field-proven in 2,500+ rural centres across India and other countries.", q: ["Which tests?", "ReMeDi Platform", "Get an integration quote"] },
    { k: ["model", "phc", "hwc", "clinic", "managed service", "solutions suite"], a: "ReMeDi delivery models: 1) End-to-end managed telemedicine services at Govt. PHCs/HWCs (10,000+ beneficiaries per centre per year), 2) Augmenting Govt. programmes (ReMeDi Kit with 40+ POC tests on e-Sanjeevani, staff training), 3) Self-sustainable private ReMeDi digital clinics that create rural micro-entrepreneurs.", q: ["ReMeDi Platform", "Talk to a person"] },
    { k: ["ncpl", "company", "neurosynaptic", "who are", "founded", "experience"], a: "Neurosynaptic Communications Pvt. Ltd. (NCPL), founded in 2002 and headquartered in Bangalore, is a pioneer in digital healthcare and telemedicine. Solutions are deployed in 12+ countries across Asia, Africa and the US, impacting 6 million+ lives. Partners include HCL Foundation, NSE Foundation, Bayer Foundation and the Bill & Melinda Gates Foundation.", q: ["ReMeDi Platform", "Quality & certifications"] },
    { k: ["iso", "certif", "quality", "make in india", "clinical validation"], a: 'NCPL has an ISO 13485:2016 certified quality management system for medical devices; products are tested to IEC 60601, clinically validated with reputed institutes, and indigenously developed (Make in India). <a href="commitment-to-quality-2.html">Commitment to Quality</a>.', q: ["Talk to a person", "ReMeDi Kit"] },
    { k: ["offline", "connectivity", "network", "internet"], a: "The ReMeDi Platform supports offline mode for low-connectivity areas. ReMeDi IoT needs 4G, 5G or Wi-Fi at the point of care to send requests and results.", q: ["ReMeDi Platform", "What is ReMeDi IoT?"] },
    { k: ["partner", "client", "customer", "reference", "testimonial"], a: "ReMeDi has been deployed with partners such as HCL Foundation (13 telemedicine centres), IPE Global under USAID SAMRIDH (150 kits, 10 centres), Jubilant Bhartia Foundation and World Health Partners (thousands of villages in UP & Bihar).", q: ["Get an integration quote", "Talk to a person"] },
    { k: ["what is", "remedi iot", "about iot", "iot"], a: 'ReMeDi IoT is a connected point-of-care diagnostics solution. It lets any health platform — State HMIS, hospital HIS/EMR or telemedicine — order tests for a patient and receive results automatically. <a href="' + IOT + '">See product page</a>', q: ["How does it work?", "Which tests?"] },
    { k: ["how", "work", "flow", "step", "process"], a: "In 6 steps: 1) your platform authenticates securely, 2) sends a test request, 3) it appears on the health worker's ReMeDi app, 4) tests are done with ReMeDi devices, 5) readings & reports upload to ReMeDi Cloud, 6) results are pushed back to your system automatically.", q: ["Which tests?", "How to integrate?"] },
    { k: ["test", "parameter", "device", "ecg", "spiro", "diagnos", "kit"], a: "27 parameters, including ECG, spirometer, digital stethoscope (heart & lungs), BP, SpO₂, temperature, otoscope, dermatoscope, fetal Doppler, blood glucose, haemoglobin, lipid profile and rapid tests (HIV, malaria, dengue, HCV, Hep B, syphilis, troponin, pregnancy) plus urine analysis.", q: ["Result formats?", "How to integrate?"] },
    { k: ["sanjeevani", "c-dac", "cdac", "government", "govt"], a: "ReMeDi IoT uses the same app as ReMeDi e-Sanjeevani, which is live with the national e-Sanjeevani platform (C-DAC confirmed integration in Feb 2025). Only the routing in ReMeDi Cloud differs.", q: ["How to integrate?", "Talk to a person"] },
    { k: ["integrat", "api", "connect", "onboard", "start", "postman"], a: "Onboarding is simple: we issue your client credentials, share the integration guide and Postman collection, you set up your result-receiver endpoint, and test with our self-test harness before going live.", q: ["Security?", "Talk to a person"] },
    { k: ["format", "result", "report", "pdf", "audio"], a: "Results arrive as structured readings plus PDF reports (ECG, spirometry, dermatoscope, otoscope), images and WAV stethoscope audio.", q: ["Security?", "How to integrate?"] },
    { k: ["secur", "privacy", "safe", "token", "data"], a: "Separate credentials in each direction, time-bound tokens, per-integrator configuration, and result pushes carry only your visit ID — no patient name.", q: ["How to integrate?", "Talk to a person"] },
    { k: ["server", "infra", "hardware", "tablet", "android", "require"], a: "No server at the facility. You need an Android tablet/phone (Android 12+), the ReMeDi Kit and internet (4G/5G/Wi-Fi).", q: ["Which tests?", "Talk to a person"] },
    { k: ["price", "cost", "quote", "demo", "buy", "purchase", "tender"], a: "For pricing, a demo or tender documents, please contact our team — we'll get back to you quickly.", q: ["Talk to a person"], human: true },
    { k: ["career", "job", "hiring", "resume"], a: 'We\'re hiring! See openings on our <a href="https://neurosynaptic.com/contact-us-2/" target="_blank" rel="noopener">Contact page</a> or email resumes@neurosynaptic.com.', q: MAIN.slice(0, 3) },
    { k: ["contact", "person", "human", "call", "email", "talk", "sales", "team", "whatsapp"], a: "Happy to connect you with our team:", human: true, q: MAIN.slice(0, 3) },
    { k: ["hi", "hello", "hey", "namaste"], a: "Hello! 👋 How can I help you today?", q: MAIN }
  ];
  function human() {
    return 'Email: <a href="mailto:' + CONFIG.EMAIL + '">' + CONFIG.EMAIL + '</a><br>Phone: <a href="tel:' + CONFIG.PHONE_TEL + '">' + CONFIG.PHONE + '</a>' +
      (wa ? '<br><a href="' + wa + '" target="_blank" rel="noopener">💬 Chat on WhatsApp</a>' : "");
  }
  function add(html, who) { var d = document.createElement("div"); d.className = "sw-m " + (who === "me" ? "sw-me" : "sw-bot"); if (who === "me") d.textContent = html; else d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; }
  function chips(list) { var w = document.createElement("div"); w.className = "sw-qr"; list.forEach(function (t) { var b = document.createElement("button"); b.type = "button"; b.textContent = t; b.onclick = function () { w.remove(); ask(t); }; w.appendChild(b); }); body.appendChild(w); body.scrollTop = body.scrollHeight; }
  function reply(t) {
    var s = t.toLowerCase(), best = null, sc = 0;
    KB.forEach(function (e) { var n = e.k.filter(function (k) { return s.indexOf(k) > -1; }).length; if (n > sc) { sc = n; best = e; } });
    var ty = document.createElement("div"); ty.className = "sw-m sw-bot sw-typing"; ty.innerHTML = "<i></i><i></i><i></i>"; body.appendChild(ty); body.scrollTop = body.scrollHeight;
    setTimeout(function () {
      ty.remove();
      if (!best) { add("I'm not sure about that one. Our team can help:<br>" + human()); chips(MAIN); return; }
      if (best.quote) { add("Great! Fill in a few details and we'll send you a tailored integration quote."); openQuote(); chips(["Talk to a person", "What is ReMeDi IoT?"]); return; }
      add(best.a + (best.human ? "<br>" + human() : "")); chips(best.q || MAIN);
    }, 650);
  }
  function ask(t) { add(t, "me"); reply(t); }
  var started = false;
  function open() {
    p.hidden = false;
    if (!started) { started = true; add(GREET); chips(MAIN); }
    setTimeout(function () { inp.focus(); }, 100);
  }
  fabs.querySelector(".sw-chat-btn").onclick = function () { p.hidden ? open() : (p.hidden = true); };
  p.querySelector(".sw-x").onclick = function () { p.hidden = true; };
  p.querySelector("form").onsubmit = function (e) { e.preventDefault(); var v = inp.value.trim(); if (!v) return; inp.value = ""; body.querySelectorAll(".sw-qr").forEach(function (q) { q.remove(); }); ask(v); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { if (!q.hidden) q.hidden = true; else if (!p.hidden) p.hidden = true; } });

  /* ---------- Integration quote (lead form) ---------- */
  var qcss = `
  .sw-q{position:fixed;inset:0;z-index:2700;background:rgba(2,6,59,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;font-family:'Nunito Sans',sans-serif}
  .sw-q[hidden]{display:none}
  .sw-qb{background:#fff;border-radius:20px;width:560px;max-width:100%;max-height:92vh;overflow:auto;box-shadow:0 30px 70px rgba(2,6,59,.4);animation:swUp .35s both}
  .sw-qh{background:linear-gradient(135deg,#254E93,#02063B);color:#fff;padding:22px 26px;position:relative}
  .sw-qh h3{margin:0 0 4px;font-size:22px;color:#fff}.sw-qh p{margin:0;opacity:.85;font-size:14px}
  .sw-qh .sw-x{position:absolute;top:16px;right:16px}
  .sw-qf{padding:22px 26px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .sw-qf label{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:700;color:#02063B}
  .sw-qf .full{grid-column:1/-1}
  .sw-qf input,.sw-qf select,.sw-qf textarea{border:1.5px solid #d7e1f0;border-radius:10px;padding:10px 12px;font:15px 'Nunito Sans',sans-serif;outline:none;background:#fff}
  .sw-qf input:focus,.sw-qf select:focus,.sw-qf textarea:focus{border-color:#254E93;box-shadow:0 0 0 3px rgba(37,78,147,.12)}
  .sw-qf .err{border-color:#d93025}
  .sw-tests{display:flex;flex-wrap:wrap;gap:6px}.sw-tests label{flex-direction:row;align-items:center;gap:5px;font-weight:600;border:1.5px solid #d7e1f0;border-radius:20px;padding:5px 11px;cursor:pointer}
  .sw-tests input{margin:0}
  .sw-qa{grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap}
  .sw-qa button{flex:1;min-width:180px;border:0;border-radius:30px;padding:13px 18px;font:700 15px 'Nunito Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px}
  .sw-qa .wa{background:#25D366;color:#fff}.sw-qa .em{background:#254E93;color:#fff}
  .sw-qn{grid-column:1/-1;font-size:12px;color:#6b7a93;margin:0}
  .sw-ok{padding:40px 26px;text-align:center}.sw-ok i{font-size:54px;color:#25a35a}
  .sw-quote-tab{position:fixed;right:0;top:50%;transform:translateY(-50%) rotate(180deg);writing-mode:vertical-rl;z-index:2400;background:linear-gradient(180deg,#F59E0B,#ea7a00);color:#fff;border:0;padding:16px 10px;border-radius:0 12px 12px 0;font:800 14px 'Nunito Sans',sans-serif;letter-spacing:.5px;cursor:pointer;box-shadow:-4px 6px 18px rgba(0,0,0,.2)}
  .sw-quote-tab:hover{padding-right:14px}
  @media(max-width:600px){.sw-qf{grid-template-columns:1fr}.sw-quote-tab{display:none}}
  `;
  var s2 = document.createElement("style"); s2.textContent = qcss; document.head.appendChild(s2);
  var TESTS = ["ECG", "Spirometer", "Stethoscope", "BP / SpO₂ / Temp", "Otoscope", "Dermatoscope", "Fetal Doppler", "Blood chemistry", "Rapid tests", "Urine"];
  var q = document.createElement("div"); q.className = "sw-q"; q.hidden = true; q.setAttribute("role", "dialog"); q.setAttribute("aria-label", "Request integration quote");
  q.innerHTML = '<div class="sw-qb"><div class="sw-qh"><h3>Get your ReMeDi IoT integration quote</h3><p>Tell us about your platform — our team responds within 1 business day.</p><button class="sw-x" aria-label="Close"><i class="bi bi-x-lg"></i></button></div>' +
    '<form class="sw-qf" novalidate>' +
    '<label>Full name*<input name="Name" required></label>' +
    '<label>Organisation*<input name="Organisation" required></label>' +
    '<label>Work email*<input name="Email" type="email" required></label>' +
    '<label>Phone / WhatsApp*<input name="Phone" type="tel" required></label>' +
    '<label>Organisation type<select name="Type"><option>State / Govt. health department</option><option>Hospital / HIS / EMR</option><option>Telemedicine platform</option><option>NGO / CSR foundation</option><option>Other</option></select></label>' +
    '<label>Facilities / centres<select name="Facilities"><option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option></select></label>' +
    '<label class="full">Tests you need<div class="sw-tests">' + TESTS.map(function (t) { return '<label><input type="checkbox" value="' + t + '">' + t + '</label>'; }).join("") + '</div></label>' +
    '<label>Expected timeline<select name="Timeline"><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Exploring / tender</option></select></label>' +
    '<label>Need devices (ReMeDi Kits)?<select name="Kits"><option>Yes – kits + integration</option><option>Integration only</option><option>Not sure</option></select></label>' +
    '<label class="full">Anything else?<textarea name="Notes" rows="3" placeholder="Your platform, existing systems, tender reference…"></textarea></label>' +
    '<div class="sw-qa"><button type="submit" class="wa" data-via="wa"><i class="bi bi-whatsapp"></i> Send via WhatsApp</button><button type="submit" class="em" data-via="em"><i class="bi bi-envelope-fill"></i> Send via Email</button></div>' +
    '<p class="sw-qn">Your details are used only to respond to this enquiry.</p></form></div>';
  document.body.appendChild(q);
  var qf = q.querySelector("form"), via = "wa";
  qf.querySelectorAll("button[data-via]").forEach(function (b) { b.onclick = function () { via = b.dataset.via; }; });
  function openQuote() { q.hidden = false; setTimeout(function () { qf.querySelector("input").focus(); }, 50); }
  window.openQuote = openQuote;
  q.querySelector(".sw-x").onclick = function () { q.hidden = true; };
  q.onclick = function (e) { if (e.target === q) q.hidden = true; };
  qf.onsubmit = function (e) {
    e.preventDefault(); var ok = true;
    qf.querySelectorAll("[required]").forEach(function (i) { var bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle("err", bad); if (bad) ok = false; });
    if (!ok) return;
    var lines = ["ReMeDi IoT – Integration quote request", ""];
    ["Name", "Organisation", "Email", "Phone", "Type", "Facilities", "Timeline", "Kits"].forEach(function (n) { lines.push(n + ": " + qf.elements[n].value); });
    var tests = [].map.call(qf.querySelectorAll(".sw-tests input:checked"), function (c) { return c.value; });
    lines.push("Tests: " + (tests.join(", ") || "Not specified"));
    if (qf.elements.Notes.value.trim()) lines.push("Notes: " + qf.elements.Notes.value.trim());
    lines.push("", "Page: " + location.href);
    var msg = lines.join("\n");
    if (via === "wa" && wa) window.open("https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
    else location.href = "mailto:" + CONFIG.EMAIL + "?subject=" + encodeURIComponent("ReMeDi IoT integration quote – " + qf.elements.Organisation.value) + "&body=" + encodeURIComponent(msg);
    q.querySelector(".sw-qb").innerHTML = '<div class="sw-ok"><i class="bi bi-check-circle-fill"></i><h3>Thank you, ' + qf.elements.Name.value.split(" ")[0].replace(/[<>&"]/g, "") + '!</h3><p>Your request is ready to send. Our team will get back to you within 1 business day.</p></div>';
    setTimeout(function () { q.hidden = true; }, 4500);
  };
  // Floating "Get a Quote" tab
  var tab = document.createElement("button"); tab.className = "sw-quote-tab"; tab.type = "button"; tab.textContent = "GET A QUOTE"; tab.onclick = openQuote;
  if (ON_IOT) document.body.appendChild(tab);
  // Any element with data-quote or links to #quote open the form
  document.addEventListener("click", function (e) { var t = e.target.closest("[data-quote],a[href='#quote']"); if (t) { e.preventDefault(); openQuote(); } });

  /* ---------- Greeting teaser after 4s (chat opens only on click) ---------- */
  var tcss = document.createElement("style");
  tcss.textContent = '.sw-teaser{position:fixed;right:96px;bottom:30px;z-index:2602;max-width:270px;background:#fff;color:#02063B;font:600 14.5px/1.4 "Nunito Sans",sans-serif;padding:13px 34px 13px 15px;border-radius:16px 16px 4px 16px;box-shadow:0 12px 30px rgba(2,6,59,.22);cursor:pointer;animation:swUp .45s cubic-bezier(.2,.8,.2,1) both}' +
    '.sw-teaser b{display:block;color:#254E93;font-size:15px;margin-bottom:2px}.sw-teaser .tx{position:absolute;top:6px;right:8px;border:0;background:none;color:#8a97ad;font-size:16px;cursor:pointer;line-height:1}' +
    '@media(max-width:768px){.sw-teaser{right:80px;bottom:80px}}';
  document.head.appendChild(tcss);
  setTimeout(function () {
    if (!p.hidden || !q.hidden) return;
    var t = document.createElement("div"); t.className = "sw-teaser"; t.setAttribute("role", "status");
    t.innerHTML = '<button class="tx" aria-label="Dismiss">×</button><b>Hi there! 👋</b>' + (ON_IOT ? "Have questions about ReMeDi IoT? Is there anything I can help you with?" : "Is there anything I can help you with today?");
    t.onclick = function (e) { t.remove(); if (!e.target.classList.contains("tx")) open(); };
    document.body.appendChild(t);
    fabs.querySelector(".sw-chat-btn").addEventListener("click", function () { t.remove(); });
  }, 4000);
})();
(function(){var p=document.querySelector('.sw-panel'),f=document.querySelector('.sw-fabs');if(!p||!f)return;
var st=document.createElement('style');st.textContent='.sw-fabs.chat-on .sw-wa{opacity:0;pointer-events:none;transform:scale(.8)}';document.head.appendChild(st);
function u(){f.classList.toggle('chat-on',!p.hidden)}new MutationObserver(u).observe(p,{attributes:true,attributeFilter:['hidden']});u();})();
/* ---------- Page enhancements: Contact page & home map ---------- */
(function () {
  var path = location.pathname;
  var css = document.createElement("style");
  css.textContent = `
  .cx-wrap{max-width:1200px;margin:0 auto;padding:60px 20px 10px;font-family:'Nunito Sans',sans-serif}
  .cx-intro{text-align:center;margin-bottom:34px}.cx-intro h2{color:#254E93;font-size:clamp(28px,3vw,40px);margin:0 0 8px}.cx-intro p{color:#555;font-size:17px;margin:0}
  .cx-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .cx-card{background:#fff;border-radius:18px;padding:26px 22px;box-shadow:0 10px 30px rgba(2,6,59,.08);border:1px solid #e6edf8;text-decoration:none;color:#333;transition:transform .3s,box-shadow .3s;display:flex;flex-direction:column;gap:8px}
  .cx-card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(2,6,59,.15)}
  .cx-ic{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;font-size:24px;color:#fff;background:linear-gradient(135deg,#254E93,#02063B)}
  .cx-card.wa .cx-ic{background:linear-gradient(135deg,#25D366,#128C7E)}.cx-card.q .cx-ic{background:linear-gradient(135deg,#F59E0B,#ea7a00)}
  .cx-card b{font-size:18px;color:#02063B}.cx-card span{font-size:15px;color:#555}.cx-card em{font-style:normal;color:#254E93;font-weight:700;font-size:14px;margin-top:auto}
  .cx-map{margin-top:28px;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(2,6,59,.1);height:340px;border:1px solid #e6edf8}
  .cx-map iframe{width:100%;height:100%;border:0;display:block}
  .contact-section .contact-info{align-self:flex-start}
  .contact-section .contact-info .wp-block-group__inner-container{background:linear-gradient(160deg,#02063B,#254E93);color:#dbe7ff;border-radius:20px;padding:34px 30px;box-shadow:0 14px 34px rgba(2,6,59,.2)}
  .contact-section .contact-info h4{color:#fff!important}
  .contact-section .contact-info li{color:#fff}
  .contact-section .item-form .wp-block-group__inner-container{background:#fff;border-radius:20px;padding:30px;box-shadow:0 10px 30px rgba(2,6,59,.08)}
  .contact-section .item-form input,.contact-section .item-form textarea,.contact-section .item-form select{border-radius:10px!important}
  @media(max-width:991px){.cx-cards{grid-template-columns:1fr 1fr}}@media(max-width:560px){.cx-cards{grid-template-columns:1fr}.cx-map{height:260px}}
  .mx-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1100px;margin:10px auto 30px;padding:0 20px;font-family:'Nunito Sans',sans-serif}
  .mx-stat{background:#fff;border-radius:18px;padding:22px 16px;text-align:center;box-shadow:0 10px 30px rgba(2,6,59,.08);border:1px solid #e6edf8}
  .mx-stat b{display:block;font-size:clamp(28px,3vw,40px);color:#254E93;font-weight:900;line-height:1.1}.mx-stat span{color:#555;font-size:15px}
  .map-area .wp-block-image{position:relative;max-width:1100px;margin:0 auto!important;border-radius:24px;overflow:hidden;background:radial-gradient(ellipse at center,#eaf3ff 0%,#f7fbff 70%);padding:24px;box-shadow:inset 0 0 0 1px #e6edf8}
  .map-area .wp-block-image img{filter:saturate(.75) brightness(1.08) hue-rotate(-6deg);opacity:.9;transition:transform 6s ease}
  .map-area .wp-block-image:hover img{transform:scale(1.03)}
  .mx-chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:18px auto 0;font-family:'Nunito Sans',sans-serif}
  .mx-chips span{background:#254E93;color:#fff;border-radius:30px;padding:8px 16px;font-weight:700;font-size:14px;display:inline-flex;align-items:center;gap:8px}
  .mx-chips span:before{content:"";width:9px;height:9px;border-radius:50%;background:#7fe0ff;box-shadow:0 0 0 0 rgba(127,224,255,.7);animation:mxp 2s infinite}
  @keyframes mxp{0%{box-shadow:0 0 0 0 rgba(127,224,255,.7)}70%{box-shadow:0 0 0 10px rgba(127,224,255,0)}100%{box-shadow:0 0 0 0 rgba(127,224,255,0)}}
  @media(max-width:768px){.mx-stats{grid-template-columns:1fr 1fr}}
  `;
  document.head.appendChild(css);

  if (/contact-us-2\.html$/i.test(path)) {
    var sec = document.querySelector(".contact-section");
    if (sec) {
      var w = document.createElement("section"); w.className = "cx-wrap";
      w.innerHTML = '<div class="cx-intro"><h2>Let’s talk healthcare</h2><p>Reach the NCPL team the way that suits you — we usually respond within one business day.</p></div>' +
        '<div class="cx-cards">' +
        '<a class="cx-card" href="tel:+918041313168"><div class="cx-ic"><i class="bi bi-telephone-fill"></i></div><b>Call us</b><span>+91-80-4131-3168<br>Mon–Fri, office hours</span><em>Call now →</em></a>' +
        '<a class="cx-card" href="mailto:info@neurosynaptic.com"><div class="cx-ic"><i class="bi bi-envelope-fill"></i></div><b>Email us</b><span>info@neurosynaptic.com<br>Careers: resumes@neurosynaptic.com</span><em>Write to us →</em></a>' +
        '<a class="cx-card wa" href="https://wa.me/918871613869?text=' + encodeURIComponent("Hello NCPL, I'd like to get in touch.") + '" target="_blank" rel="noopener"><div class="cx-ic"><i class="bi bi-whatsapp"></i></div><b>WhatsApp</b><span>Quick questions, demos and follow-ups</span><em>Start chat →</em></a>' +
        '<a class="cx-card q" href="remedi-iot.html"><div class="cx-ic"><i class="bi bi-file-earmark-text-fill"></i></div><b>Integration quote</b><span>Bring ReMeDi diagnostics into your platform</span><em>Explore ReMeDi IoT →</em></a>' +
        '</div><div class="cx-map"><iframe title="NCPL office location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Sulappa%20Tower%2C%20Doddanagamangala%2C%20Electronic%20City%2C%20Bangalore%20560100&z=15&output=embed"></iframe></div>';
      sec.parentNode.insertBefore(w, sec);
      document.querySelectorAll(".contact-section .contact-list li").forEach(function (li) {
        if (/neurosynaptic\[dot\]com/.test(li.textContent)) li.innerHTML = '<i class="bi bi-envelope-fill"></i> <a href="mailto:info@neurosynaptic.com" style="color:inherit">info@neurosynaptic.com</a>';
        else if (/4131-3168/.test(li.textContent)) li.innerHTML = '<i class="bi bi-telephone-fill"></i> <a href="tel:+918041313168" style="color:inherit">+91-80-4131-3168</a>';
      });
    }
  }

  var map = document.querySelector(".map-area .wp-block-image");
  if (map) {
    var desc = document.querySelector(".map-area .desc");
    var st = document.createElement("div"); st.className = "mx-stats";
    st.innerHTML = [["12+", "Countries"], ["6M+", "Lives impacted"], ["2,500+", "Rural health centres"], ["Since 2002", "Pioneering telemedicine"]]
      .map(function (x) { return '<div class="mx-stat"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join("");
    (desc || map).parentNode.insertBefore(st, (desc ? desc.nextSibling : map));
    var ch = document.createElement("div"); ch.className = "mx-chips";
    ch.innerHTML = "<span>India</span><span>Asia</span><span>Africa</span><span>United States</span>";
    map.parentNode.insertBefore(ch, map.nextSibling);
  }
})();
