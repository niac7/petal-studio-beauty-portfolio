/*
 * PETAL STUDIO — HOME PAGE
 * Design: Soft Modernist Editorial — Glossier meets Aesop
 * Palette: Warm cream, soft blush, sage, charcoal
 * Typography: Playfair Display (display) + Nunito (body)
 */

import { useEffect, useRef, useState } from "react";

const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/00_StyleReference_CleanEditorial_071d969c.png",
  textureM: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_ShotType_TextureMacro_v1_f77ecafe.png",
  floating: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_ShotType_FloatingProduct_v1_71fa4371.png",
  minimal: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Aesthetic_MinimalLuxury_v1_82e946f2.png",
  dreamy: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Aesthetic_DreamyEditorial_v1_b07c5193.png",
  softLight: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Lighting_SoftDaylight_v1_47b11e94.png",
  neonBack: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Lighting_NeonBacklit_v1_7a983586.png",
  coolAqua: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_ColorMood_CoolAquatics_v1_609a3f29.png",
  warmGold: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_ColorMood_WarmGold_v1_2e0ef6f2.png",
  shimmer: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Concept_ShimmerParticles_v1_aa524483.png",
  flatLay: "https://d2xsxph8kpxj0f.cloudfront.net/88179369/33kjabmKPFGV4pobAa7K7m/Beauty_Format_FlatLay_Routine_v1_827744aa.png",
};

const PORTFOLIO_ITEMS = [
  { img: IMAGES.hero, category: "Hero Shot", title: "Serum — Clean Editorial Hero" },
  { img: IMAGES.minimal, category: "Aesthetic Style", title: "Moisturiser — Minimal Luxury" },
  { img: IMAGES.flatLay, category: "Flat Lay Format", title: "Morning Routine — Collection" },
  { img: IMAGES.textureM, category: "Shot Type", title: "Serum Drop — Texture Macro" },
  { img: IMAGES.dreamy, category: "Aesthetic Style", title: "Serum — Dreamy Editorial" },
  { img: IMAGES.warmGold, category: "Color Mood", title: "Serum — Warm Gold Palette" },
  { img: IMAGES.softLight, category: "Lighting Style", title: "Moisturiser — Soft Daylight" },
  { img: IMAGES.shimmer, category: "Concept Add-On", title: "Serum — Shimmer Particles" },
  { img: IMAGES.coolAqua, category: "Color Mood", title: "Serum — Cool Aquatics Palette" },
  { img: IMAGES.neonBack, category: "Lighting Style", title: "Serum — Neon Backlit Edge" },
  { img: IMAGES.floating, category: "Shot Type", title: "Serum — Floating Product" },
];

function useInView(threshold = 0.12) {
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

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
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
    <div className="min-h-screen bg-[#FAF7F4] text-[#2C2C2C] overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#E8C4B8]/40" : ""}`}>
        <div className="container flex items-center justify-between py-5">
          <button onClick={() => scrollTo("hero")} className="text-left">
            <div className="label-blush mb-0.5">Studio</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.04em", color: "#2C2C2C" }}>Petal Studio</div>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["portfolio", "services", "process", "contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="label-blush hover:opacity-70 transition-opacity duration-300 capitalize">{item}</button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-blush-filled ml-4">Get a Quote</button>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-6 h-px bg-[#C9907E] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-[#C9907E] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-[#C9907E] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#FAF7F4] border-t border-[#E8C4B8]/40 px-6 py-6 flex flex-col gap-5">
            {["portfolio", "services", "process", "contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="label-blush text-left capitalize">{item}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen grid md:grid-cols-2 items-center pt-20">
        <div className="container py-16 md:py-0 order-2 md:order-1">
          <div className="max-w-lg">
            <div className="label-blush mb-6 fade-up fade-up-delay-1">Beauty & Skincare Photography Studio</div>
            <h1 className="display-xl mb-6 fade-up fade-up-delay-2">
              Visuals That Make<br />
              <em style={{ color: "#C9907E" }}>Your Formula Irresistible</em>
            </h1>
            <p className="body-soft max-w-md mb-10 fade-up fade-up-delay-3">
              Your formulation took years to perfect. Your photography should match that standard. We create editorial-quality AI product visuals for beauty and skincare brands — without the studio overhead.
            </p>
            <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
              <button onClick={() => scrollTo("portfolio")} className="btn-blush-filled">View Portfolio</button>
              <button onClick={() => scrollTo("contact")} className="btn-blush">Start a Project</button>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 h-[55vh] md:h-screen relative overflow-hidden">
          <img src={IMAGES.hero} alt="Luxury serum editorial photography — Petal Studio" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FAF7F4]/20" />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-5 py-4 shadow-sm">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 400, color: "#C9907E", lineHeight: 1 }}>48h</div>
            <div className="label-blush mt-1 opacity-70">Delivery Guarantee</div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-[#F5EDE8] border-y border-[#E8C4B8]/50 py-5">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {["Skincare Brands", "Clean Beauty", "Cosmetics DTC", "Wellness Brands", "Haircare"].map((item) => (
              <span key={item} className="label-blush opacity-60">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="label-blush mb-4">I — About</div>
              <hr className="blush-rule mb-8 w-12" />
              <h2 className="display-lg mb-6">Your Packaging Is<br /><em style={{ color: "#C9907E" }}>Your First Impression</em></h2>
              <p className="body-soft mb-6">In the beauty industry, 73% of purchase decisions are made before a customer reads a single word of copy. They're buying the feeling your visuals create — the promise of transformation, the sense of luxury, the certainty that this product was made for them.</p>
              <p className="body-soft mb-8">At Petal Studio, we engineer AI product photography that speaks directly to that emotional decision-making process. Every image is built to trigger desire, communicate quality, and convert.</p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[{ num: "10×", label: "Faster than traditional studio" }, { num: "75%", label: "Lower cost than agency rates" }, { num: "∞", label: "Variations per product" }].map(({ num, label }) => (
                  <div key={num}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 400, color: "#C9907E", lineHeight: 1 }}>{num}</div>
                    <div className="label-blush mt-2 opacity-60">{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} className="btn-blush-filled">Book a Discovery Call</button>
            </AnimSection>
            <AnimSection>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[3/4] overflow-hidden"><img src={IMAGES.minimal} alt="Clean minimal luxury skincare photography" className="w-full h-full object-cover" /></div>
                <div className="flex flex-col gap-3">
                  <div className="aspect-square overflow-hidden"><img src={IMAGES.textureM} alt="Serum texture macro photography" className="w-full h-full object-cover" /></div>
                  <div className="aspect-square overflow-hidden"><img src={IMAGES.softLight} alt="Soft daylight skincare photography" className="w-full h-full object-cover" /></div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#F5EDE8]">
        <div className="container">
          <AnimSection>
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="label-blush mb-4">II — Portfolio</div>
                <hr className="blush-rule mb-6 w-12" />
                <h2 className="display-lg">The Work<br /><em style={{ color: "#C9907E" }}>Speaks for Itself</em></h2>
              </div>
              <p className="body-soft max-w-xs text-right hidden md:block">Every image was created using our proprietary AI visual system — no studio, no stylist, no waiting weeks.</p>
            </div>
          </AnimSection>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <AnimSection key={i} className={i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className="portfolio-card" style={{ aspectRatio: i === 0 || i === 5 ? "1/1" : "3/4" }}>
                  <img src={item.img} alt={`${item.title} — Petal Studio beauty photography`} loading="lazy" />
                  <div className="portfolio-card-overlay">
                    <div className="label-blush mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>{item.category}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 400, color: "white" }}>{item.title}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-36">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="label-blush mb-4">III — Services</div>
              <hr className="blush-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg mb-4">Every Visual Your Brand<br /><em style={{ color: "#C9907E" }}>Will Ever Need</em></h2>
              <p className="body-soft">From launch campaigns to PDP galleries to social content — we cover every visual touchpoint in your customer's journey to purchase.</p>
            </div>
          </AnimSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Hero Product Shots", desc: "The anchor image for your homepage, ads, and email campaigns. Clean, editorial, and engineered to stop the scroll and trigger desire.", price: "From $247" },
              { num: "02", title: "PDP Gallery Packages", desc: "Complete product detail page sets: hero, texture macro, angle shifts, flat lay, and lifestyle — everything a buyer needs to feel confident clicking Add to Cart.", price: "From $447" },
              { num: "03", title: "Editorial Campaigns", desc: "Magazine-quality editorial spreads for press kits, brand campaigns, and lookbooks. The visual language of Vogue Beauty, built for your brand.", price: "From $747" },
              { num: "04", title: "Texture & Detail Macros", desc: "Ultra-close product shots that communicate ingredient quality and formula texture — the visual proof that your product is worth the price point.", price: "From $197" },
              { num: "05", title: "Social Content Packs", desc: "30-day content calendars of Instagram-ready visuals — carousels, Reels covers, Stories — all consistent with your brand aesthetic and color palette.", price: "From $547/mo" },
              { num: "06", title: "Brand Visual Identity", desc: "A locked visual system: style sheet, color palette, lighting signature, and prompt library — so every future image looks like it came from the same campaign shoot.", price: "From $897" },
            ].map(({ num, title, desc, price }) => (
              <AnimSection key={num}>
                <div className="bg-white border border-[#E8C4B8]/40 p-8 h-full flex flex-col group hover:border-[#C9907E]/40 hover:shadow-sm transition-all duration-300">
                  <div className="label-blush mb-6 opacity-40">{num}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "#2C2C2C", marginBottom: "1rem" }}>{title}</h3>
                  <p className="body-soft flex-1 mb-6">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ color: "#C9907E", fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>{price}</span>
                    <span className="label-blush opacity-0 group-hover:opacity-100 transition-opacity duration-300">→ Enquire</span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <section className="relative h-[55vh] overflow-hidden">
        <img src={IMAGES.dreamy} alt="Dreamy editorial beauty photography — Petal Studio" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F4]/85 to-transparent flex items-center">
          <div className="container">
            <AnimSection>
              <div className="max-w-lg">
                <div className="label-blush mb-4">The Dreamy Editorial Concept</div>
                <h2 className="display-md mb-4">"Clients don't pay for images. They pay for visuals that trigger emotions, trust, and the feeling that they <em style={{ color: "#C9907E" }}>need</em> to buy."</h2>
                <p className="body-soft text-sm">— The AI Cash System, $20k Visuals Module</p>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-36 bg-[#EFF2EF]">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <div className="label-blush mb-4">IV — Process</div>
              <hr className="blush-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg mb-4">Studio-Quality Results<br /><em style={{ color: "#C9907E" }}>In 48 Hours</em></h2>
              <p className="body-soft">No scheduling. No shipping samples. No waiting three weeks. Here's how we work.</p>
            </div>
          </AnimSection>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Brief & Discovery", desc: "You share your brand aesthetic, product details, and visual goals. We lock in your style sheet, color palette, and shot categories." },
              { step: "02", title: "Visual Direction", desc: "We select the right shot types, aesthetic styles, and lighting concepts from our Kollektive system to match your campaign objectives." },
              { step: "03", title: "Generation & Curation", desc: "We generate multiple variations per shot, curate the best, and apply our quality control process before delivery." },
              { step: "04", title: "Delivery & Rights", desc: "Full-resolution files delivered via Google Drive within 48 hours. You own the images outright — no licensing fees, ever." },
            ].map(({ step, title, desc }) => (
              <AnimSection key={step}>
                <div className="bg-white p-8 h-full border border-[#E8C4B8]/30">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 400, color: "#E8C4B8", lineHeight: 1, marginBottom: "1.5rem" }}>{step}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "#2C2C2C", marginBottom: "0.75rem" }}>{title}</h3>
                  <p className="body-soft text-sm">{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-36">
        <div className="container">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="label-blush mb-4">V — Results</div>
              <hr className="blush-rule mb-6 mx-auto w-12" />
              <h2 className="display-lg">What Clients Say<br /><em style={{ color: "#C9907E" }}>After They See the Work</em></h2>
            </div>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "We launched our new vitamin C serum with 30 images in 48 hours. The photography looked better than our previous studio shoot that cost $8,000. Our conversion rate went up 28% in the first two weeks.", name: "Amara K.", title: "Founder, Luminara Skincare" },
              { quote: "I was worried AI photography would look generic. It doesn't. Petal Studio captured the exact aesthetic we'd been trying to achieve for two years. Our Instagram engagement tripled in the first month.", name: "Claire B.", title: "Creative Director, Bloom Beauty" },
              { quote: "The texture macro shots alone were worth it. Customers can actually see the quality of our formula. Our return rate dropped by 15% because buyers know exactly what they're getting.", name: "Priya S.", title: "E-Commerce Director, Verdure Labs" },
            ].map(({ quote, name, title }) => (
              <AnimSection key={name}>
                <div className="bg-[#F5EDE8] p-8 h-full flex flex-col">
                  <div style={{ color: "#C9907E", fontSize: "2.5rem", fontFamily: "'Playfair Display', serif", marginBottom: "1rem", lineHeight: 1 }}>"</div>
                  <p className="body-soft flex-1 mb-6 italic">{quote}</p>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 400, color: "#2C2C2C" }}>{name}</div>
                    <div className="label-blush mt-1 opacity-60">{title}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.flatLay} alt="Beauty skincare routine flat lay — Petal Studio" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.85)" }} />
          <div className="absolute inset-0 bg-[#FAF7F4]/80" />
        </div>
        <div className="relative z-10 container text-center">
          <AnimSection>
            <div className="label-blush mb-6">Ready to Elevate Your Brand?</div>
            <h2 className="display-xl mb-6 max-w-3xl mx-auto">Let's Build Your<br /><em style={{ color: "#C9907E" }}>Visual Identity</em></h2>
            <p className="body-soft max-w-xl mx-auto mb-10">Book a free 20-minute discovery call. We'll review your current visuals, identify the highest-impact opportunities, and show you exactly what your products could look like with Petal Studio.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:hello@petalstudio.co" className="btn-blush-filled">Book a Discovery Call</a>
              <button onClick={() => scrollTo("portfolio")} className="btn-blush">View More Work</button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {["Free discovery call", "48-hour turnaround", "Unlimited revisions", "Full image rights"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9907E" }} />
                  <span className="label-blush opacity-70">{item}</span>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#F5EDE8] border-t border-[#E8C4B8]/50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="label-blush mb-1 opacity-50">Studio</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.04em", color: "#2C2C2C" }}>Petal Studio</div>
            </div>
            <div className="flex gap-8">
              {["portfolio", "services", "process", "contact"].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="label-blush opacity-40 hover:opacity-80 transition-opacity capitalize">{item}</button>
              ))}
            </div>
            <div className="label-blush opacity-30 text-center">© {new Date().getFullYear()} Petal Studio. All rights reserved.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
