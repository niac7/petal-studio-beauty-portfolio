/*
 * LUMIÈRE VISUALS — HOME PAGE
 * Design: Noir Atelier — Art Deco meets dark editorial
 * Sections: Nav → Hero → About → Portfolio → Services → Process → Testimonials → CTA → Footer
 * SEO: Targeting jewelry brand owners, DTC jewelry e-commerce directors
 */

import { useEffect, useRef, useState } from "react";

// CDN image URLs
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/00_StyleReference_DarkLuxury_6456ec1a.png",
  launch: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_LaunchShot_EmeraldNecklace_v1_ea258d27.png",
  birdsEye: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_AngleShift_BirdsEye_v1_22254360.png",
  macro: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_AngleShift_ExtremeCloseup_v1_3067654f.png",
  grainedFilm: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_RealityLayer_GrainedFilm_v1_441bce02.png",
  clinicalGloss: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_RealityLayer_ClinicalGloss_v1_ade37aee.png",
  noirBloom: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_BonusConcept_NoirBloom_v1_9f98abe2.png",
  surreal: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_BonusConcept_Surreal_v1_9a9ace45.png",
  flatLay: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_FlatLay_Collection_v1_d474c8ad.png",
  giftBox: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_Lifestyle_GiftBox_v1_06382d33.png",
  wristShot: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Jewelry_Lifestyle_WristShot_v1_8bf1817d.png",
};

const PORTFOLIO_ITEMS = [
  { img: IMAGES.launch, category: "Campaign Hero", title: "Emerald Pendant — Launch Shot" },
  { img: IMAGES.noirBloom, category: "Bonus Concept", title: "Sapphire Ring — Noir Bloom" },
  { img: IMAGES.flatLay, category: "Collection Flat Lay", title: "Full Collection — Overhead" },
  { img: IMAGES.macro, category: "Angle Shift", title: "Diamond Detail — Extreme Macro" },
  { img: IMAGES.surreal, category: "Bonus Concept", title: "Diamond Ring — Surreal Levitation" },
  { img: IMAGES.giftBox, category: "Lifestyle & Gifting", title: "Luxury Gift Presentation" },
  { img: IMAGES.grainedFilm, category: "Reality Layer", title: "Gold Hoops — Analog Film" },
  { img: IMAGES.clinicalGloss, category: "Reality Layer", title: "Tennis Bracelet — Clinical Gloss" },
  { img: IMAGES.birdsEye, category: "Angle Shift", title: "Ring & Bracelet — Bird's Eye" },
  { img: IMAGES.wristShot, category: "Lifestyle", title: "Tennis Bracelet — Wrist Shot" },
];

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated section wrapper
function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5" : ""}`}>
        <div className="container flex items-center justify-between py-5">
          <button onClick={() => scrollTo("hero")} className="text-left">
            <div className="label-gold mb-0.5">Studio</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 300, letterSpacing: "0.08em", color: "#F5F0E8" }}>
              Lumière Visuals
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["portfolio", "services", "process", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="label-gold hover:text-[#E8D5A3] transition-colors duration-300 capitalize"
              >
                {item}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-gold ml-4">
              Get a Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0D0D0D] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
            {["portfolio", "services", "process", "contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="label-gold text-left capitalize">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-end grain-overlay overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Luxury platinum diamond ring — Lumière Visuals"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.55)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container pb-20 md:pb-28">
          <div className="max-w-2xl">
            <div className="label-gold mb-6 fade-up fade-up-delay-1">Luxury Jewelry Photography Studio</div>
            <h1 className="display-xl text-[#F5F0E8] mb-6 fade-up fade-up-delay-2">
              Visuals That Make<br />
              <em style={{ color: "#C9A84C" }}>Buyers Stop Scrolling</em>
            </h1>
            <p className="body-refined max-w-lg mb-10 fade-up fade-up-delay-3">
              Your jewelry is extraordinary. Your product photography should be too. We create cinematic, studio-quality AI visuals that turn browsers into buyers — without the $5,000 studio day rate.
            </p>
            <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
              <button onClick={() => scrollTo("portfolio")} className="btn-gold">
                View Portfolio
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-gold" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#F5F0E8" }}>
                Start a Project
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-50">
          <div className="label-gold" style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}>Scroll</div>
          <div className="w-px h-12 bg-[#C9A84C]" style={{ animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── CREDIBILITY STRIP ── */}
      <section className="bg-[#0D0D0D] border-y border-white/5 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["Jewelry Brands", "DTC E-Commerce", "Luxury Boutiques", "Watch Brands", "Bridal Collections"].map((item) => (
              <span key={item} className="label-gold opacity-50">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VALUE PROP ── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <img
                  src={IMAGES.launch}
                  alt="Emerald pendant necklace — campaign hero shot by Lumière Visuals"
                  className="w-full aspect-[3/4] object-cover"
                  style={{ filter: "brightness(0.9)" }}
                />
                {/* Gold accent border */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#C9A84C]/30" />
              </div>
            </AnimSection>

            <AnimSection>
              <div className="section-number mb-4">I — About</div>
              <hr className="gold-rule mb-8 w-12" />
              <h2 className="display-lg text-[#F5F0E8] mb-6">
                Your Photography<br />
                <em style={{ color: "#C9A84C" }}>Is Your Sales Team</em>
              </h2>
              <p className="body-refined mb-6">
                When a customer lands on your product page, they make a buying decision in under three seconds. Not based on your copy. Not based on your reviews. Based on how your jewelry looks.
              </p>
              <p className="body-refined mb-8">
                At Lumière Visuals, we engineer AI product photography that triggers the psychological response luxury buyers need to feel before they purchase: desire, trust, and the certainty that your piece is worth every penny.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { num: "10×", label: "Faster than traditional studio" },
                  { num: "80%", label: "Lower cost than agency rates" },
                  { num: "100%", label: "Brand-consistent across every shot" },
                ].map(({ num, label }) => (
                  <div key={num}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{num}</div>
                    <div className="label-gold mt-2 opacity-60">{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} className="btn-gold">
                Book a Discovery Call
              </button>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <AnimSection>
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="section-number mb-4">II — Portfolio</div>
                <hr className="gold-rule mb-6 w-12" />
                <h2 className="display-lg text-[#F5F0E8]">
                  The Work<br />
                  <em style={{ color: "#C9A84C" }}>Speaks for Itself</em>
                </h2>
              </div>
              <p className="body-refined max-w-xs text-right hidden md:block">
                Every image below was created using our proprietary AI visual system — no studio, no stylist, no waiting weeks for delivery.
              </p>
            </div>
          </AnimSection>

          {/* Masonry-style portfolio grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <AnimSection key={i} className={i === 0 || i === 4 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className="portfolio-card" style={{ aspectRatio: i === 0 || i === 4 ? "1/1" : "3/4" }}>
                  <img
                    src={item.img}
                    alt={`${item.title} — Lumière Visuals jewelry photography`}
                    loading="lazy"
                  />
                  <div className="portfolio-card-overlay">
                    <div className="label-gold mb-1">{item.category}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 400, color: "#F5F0E8" }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-36">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="section-number mb-4">III — Services</div>
              <hr className="gold-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg text-[#F5F0E8] mb-4">
                Every Shot Your Brand<br />
                <em style={{ color: "#C9A84C" }}>Will Ever Need</em>
              </h2>
              <p className="body-refined">
                From launch campaigns to PDP galleries to social content — we cover every visual touchpoint in your customer's journey.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {[
              {
                num: "01",
                title: "Campaign Hero Shots",
                desc: "Full-bleed, cinematic launch images built to anchor your homepage, paid ads, and email campaigns. The image that makes someone stop mid-scroll.",
                price: "From $297",
              },
              {
                num: "02",
                title: "PDP Gallery Packages",
                desc: "Complete product detail page sets: hero angle, multiple angle shifts, macro detail, and flat lay — everything a buyer needs to click Add to Cart.",
                price: "From $497",
              },
              {
                num: "03",
                title: "Editorial Collections",
                desc: "Magazine-worthy editorial spreads for lookbooks, press kits, and brand campaigns. The visual language of Vogue, built for your brand.",
                price: "From $797",
              },
              {
                num: "04",
                title: "Lifestyle & Gifting",
                desc: "Context-rich lifestyle shots showing your jewelry being worn, gifted, and desired. Builds emotional connection and drives impulse purchases.",
                price: "From $397",
              },
              {
                num: "05",
                title: "Social Content Packs",
                desc: "30-day content calendars of Instagram-ready visuals — carousels, Reels covers, Stories — all consistent with your brand aesthetic.",
                price: "From $597/mo",
              },
              {
                num: "06",
                title: "Brand Style System",
                desc: "A locked visual identity: style sheet, color palette, lighting signature, and prompt library — so every future image looks like it came from the same campaign.",
                price: "From $997",
              },
            ].map(({ num, title, desc, price }) => (
              <AnimSection key={num}>
                <div className="bg-[#0A0A0A] p-8 h-full flex flex-col group hover:bg-[#0F0F0F] transition-colors duration-300">
                  <div className="label-gold mb-6 opacity-40">{num}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "1rem" }}>
                    {title}
                  </h3>
                  <p className="body-refined flex-1 mb-6">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{price}</span>
                    <span className="label-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">→ Enquire</span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED FEATURE IMAGE ── */}
      <section className="relative h-[60vh] overflow-hidden grain-overlay">
        <img
          src={IMAGES.noirBloom}
          alt="Luxury jewelry editorial — Noir Bloom concept by Lumière Visuals"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 to-transparent flex items-center">
          <div className="container">
            <AnimSection>
              <div className="max-w-lg">
                <div className="label-gold mb-4">The Noir Bloom Concept</div>
                <h2 className="display-md text-[#F5F0E8] mb-4">
                  "The difference between a $200 sale and a $2,000 sale is often just the photograph."
                </h2>
                <p className="body-refined">— The AI Cash System, Module 6</p>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 md:py-36 bg-[#0D0D0D]">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <div className="section-number mb-4">IV — Process</div>
              <hr className="gold-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg text-[#F5F0E8] mb-4">
                Studio-Quality Results<br />
                <em style={{ color: "#C9A84C" }}>In 48 Hours</em>
              </h2>
              <p className="body-refined">
                No scheduling. No shipping samples. No waiting three weeks. Here's how we work.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-4 gap-px bg-white/5 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Brief & Discovery", desc: "You share your brand aesthetic, product details, and visual goals. We lock in your style sheet and color palette." },
              { step: "02", title: "Visual Direction", desc: "We select the right shot categories, angles, and lighting concepts from our Kollektive system to match your campaign." },
              { step: "03", title: "Generation & Curation", desc: "We generate multiple variations per shot, curate the best, and apply our quality control process before delivery." },
              { step: "04", title: "Delivery & Rights", desc: "Full-resolution files delivered via Google Drive within 48 hours. You own the images outright — no licensing fees." },
            ].map(({ step, title, desc }) => (
              <AnimSection key={step}>
                <div className="bg-[#0A0A0A] p-8 h-full">
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "#C9A84C", opacity: 0.3, lineHeight: 1, marginBottom: "1.5rem" }}>
                    {step}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "0.75rem" }}>
                    {title}
                  </h3>
                  <p className="body-refined text-sm">{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="section-number mb-4">V — Results</div>
              <hr className="gold-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg text-[#F5F0E8]">
                What Clients Say<br />
                <em style={{ color: "#C9A84C" }}>After They See the Work</em>
              </h2>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "We replaced our entire product photography budget with Lumière Visuals. Our conversion rate went up 34% in the first month. The images look better than anything we shot in a real studio.",
                name: "Sophia R.",
                title: "Founder, Éclat Jewelry",
              },
              {
                quote: "I was skeptical about AI photography for luxury pieces. Then I saw the first delivery. Our Instagram engagement doubled. Clients kept asking which photographer we used.",
                name: "Marcus T.",
                title: "Creative Director, Aurum Co.",
              },
              {
                quote: "The turnaround time alone is worth it. We launched a new collection with 40 images in 72 hours. That would have taken six weeks and $15,000 with our old studio.",
                name: "Isabelle M.",
                title: "E-Commerce Director, Maison Dorée",
              },
            ].map(({ quote, name, title }) => (
              <AnimSection key={name}>
                <div className="border border-white/8 p-8 h-full flex flex-col">
                  <div style={{ color: "#C9A84C", fontSize: "2rem", fontFamily: "'Cormorant Garamond', serif", marginBottom: "1rem", lineHeight: 1 }}>"</div>
                  <p className="body-refined flex-1 mb-6 italic">{quote}</p>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 500, color: "#F5F0E8" }}>{name}</div>
                    <div className="label-gold mt-1 opacity-60">{title}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="relative py-28 md:py-40 grain-overlay overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.flatLay}
            alt="Luxury jewelry collection — Lumière Visuals"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.2)" }}
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        </div>
        <div className="relative z-10 container text-center">
          <AnimSection>
            <div className="label-gold mb-6">Ready to Elevate Your Brand?</div>
            <h2 className="display-xl text-[#F5F0E8] mb-6 max-w-3xl mx-auto">
              Let's Build Your<br />
              <em style={{ color: "#C9A84C" }}>Visual Identity</em>
            </h2>
            <p className="body-refined max-w-xl mx-auto mb-10">
              Book a free 20-minute discovery call. We'll review your current visuals, identify the highest-impact opportunities, and show you exactly what your jewelry could look like with Lumière Visuals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:hello@lumierevisuals.com" className="btn-gold">
                Book a Discovery Call
              </a>
              <button onClick={() => scrollTo("portfolio")} className="btn-gold" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#F5F0E8" }}>
                View More Work
              </button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {["Free discovery call", "48-hour turnaround", "Unlimited revisions", "Full image rights"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C" }} />
                  <span className="label-gold opacity-70">{item}</span>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060606] border-t border-white/5 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="label-gold mb-1 opacity-50">Studio</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.08em", color: "#F5F0E8" }}>
                Lumière Visuals
              </div>
            </div>
            <div className="flex gap-8">
              {["portfolio", "services", "process", "contact"].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="label-gold opacity-40 hover:opacity-80 transition-opacity capitalize">
                  {item}
                </button>
              ))}
            </div>
            <div className="label-gold opacity-30 text-center">
              © {new Date().getFullYear()} Lumière Visuals. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
