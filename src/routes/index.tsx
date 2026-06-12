import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import avatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Reyes — Creative Developer Portfolio" },
      { name: "description", content: "Personal portfolio of Nova Reyes — full-stack developer crafting neon, futuristic web experiences with motion and depth." },
      { property: "og:title", content: "Nova Reyes — Creative Developer Portfolio" },
      { property: "og:description", content: "Futuristic portfolio with neon gradients, glassmorphism, and animated UI." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Portfolio,
});

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Portfolio() {
  useScrollReveal();
  const time = useClock();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="noise relative min-h-screen overflow-x-hidden">
      <Particles />
      <Nav scrolled={scrolled} time={time} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ scrolled, time }: { scrolled: boolean; time: string }) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-shadow duration-500 ${
            scrolled ? "shadow-[0_8px_40px_-12px_oklch(0.55_0.28_300/0.5)]" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-block h-7 w-7 rounded-lg btn-neon" style={{ animation: "none" }} />
            <span className="text-gradient">nova.</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[var(--gradient-neon)] hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tabular-nums px-3 py-1.5 rounded-full glass">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-pink)] animate-pulse" />
              {time}
            </span>
            <a
              href="#contact"
              className="btn-neon px-4 sm:px-5 py-2 rounded-full text-sm font-semibold"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Particles() {
  const particles = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const dur = 18 + Math.random() * 20;
        const tx = (Math.random() - 0.5) * 200;
        const hue = Math.random() > 0.5 ? "var(--neon-pink)" : "var(--neon-violet)";
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: hue,
              boxShadow: `0 0 ${size * 4}px ${hue}`,
              animation: `particleFloat ${dur}s linear ${delay}s infinite`,
              ["--tx" as never]: `${tx}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-pink)]" />
            Available for projects
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            My Personal <br />
            <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-display">
            I'm Nova — a <span className="text-gradient font-semibold">creative developer</span> &amp; UI engineer.
          </p>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            I design and build immersive digital experiences blending motion, depth, and code.
            From neon-lit interfaces to performant full-stack apps, I craft work that feels alive.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-neon px-7 py-3.5 rounded-full font-semibold">
              Hire Me
            </a>
            <a
              href="#projects"
              className="glass px-7 py-3.5 rounded-full font-semibold hover:border-[var(--neon-pink)]/60 transition-all"
            >
              View Work →
            </a>
          </div>
          <div className="mt-12 flex gap-8 text-sm">
            {[
              ["6+", "Years"],
              ["80+", "Projects"],
              ["40+", "Clients"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-display font-bold text-gradient">{n}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-right flex justify-center lg:justify-end">
          <div className="relative animate-float">
            <div
              className="absolute -inset-6 rounded-full opacity-60 blur-3xl"
              style={{ background: "var(--gradient-neon)" }}
            />
            <div
              className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-full p-[3px]"
              style={{ background: "var(--gradient-neon)" }}
            >
              <div className="h-full w-full rounded-full overflow-hidden bg-background neon-glow">
                <img
                  src={avatar}
                  alt="Portrait of Nova Reyes"
                  className="h-full w-full object-cover"
                  width={800}
                  height={800}
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 text-sm font-mono">
              <div className="text-muted-foreground text-xs">currently</div>
              <div className="text-foreground">building cool things</div>
            </div>
            <div className="absolute -top-2 -right-2 glass rounded-full px-4 py-2 text-xs flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills = [
    { name: "Frontend / React", value: 95 },
    { name: "UI / Motion Design", value: 90 },
    { name: "Node & APIs", value: 85 },
    { name: "Creative Coding", value: 80 },
  ];
  return (
    <section id="about" className="relative z-10 py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="About" title={<>The person <span className="text-gradient">behind the pixels</span></>} />
        <div className="grid lg:grid-cols-2 gap-8 mt-14">
          <div className="reveal glass rounded-3xl p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-foreground/90">
              I'm a multidisciplinary developer with a soft spot for late-night coding sessions and
              well-timed easing curves. I've spent the last six years shipping interfaces for startups,
              studios, and ambitious solo founders.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My favorite projects sit at the intersection of engineering and art — products that move,
              respond, and feel inevitable. I care about details: micro-interactions, type rhythm, and
              the quiet hum of a perfectly tuned animation.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["TypeScript", "React", "Three.js", "GSAP", "Tailwind", "Node", "Figma"].map((t) => (
                <span key={t} className="glass px-3 py-1.5 rounded-full text-xs font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal glass rounded-3xl p-8 sm:p-10 space-y-6">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground font-mono">{s.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${s.value}%`,
                      background: "var(--gradient-neon)",
                      boxShadow: "0 0 12px oklch(0.72 0.3 340 / 0.6)",
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: "✦", label: "Design" },
                { icon: "◈", label: "Build" },
                { icon: "✺", label: "Ship" },
              ].map((c) => (
                <div key={c.label} className="text-center glass rounded-xl py-4">
                  <div className="text-2xl text-gradient">{c.icon}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { title: "Auralis", tag: "WebGL · 2025", desc: "Generative audio visualizer with real-time shaders.", color: "from-pink-500 to-purple-600" },
    { title: "Nimbus OS", tag: "SaaS · 2024", desc: "Dashboard for orchestrating distributed AI workflows.", color: "from-fuchsia-500 to-violet-600" },
    { title: "Lumen Studio", tag: "Brand · 2024", desc: "Identity & site for a generative design studio.", color: "from-rose-500 to-indigo-600" },
    { title: "Pulse Wallet", tag: "Fintech · 2023", desc: "Animated mobile-first crypto wallet experience.", color: "from-purple-600 to-pink-500" },
    { title: "Atlas Maps", tag: "Maps · 2023", desc: "Custom map renderer with neon thematic tiles.", color: "from-violet-600 to-fuchsia-500" },
    { title: "Echo Notes", tag: "Productivity", desc: "Voice-first note app with ambient soundscapes.", color: "from-indigo-500 to-pink-500" },
  ];
  return (
    <section id="projects" className="relative z-10 py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Projects" title={<>Selected <span className="text-gradient">work</span></>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="reveal group relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 60}ms`, background: "linear-gradient(135deg, oklch(0.97 0.01 300 / 0.15), oklch(0.97 0.01 300 / 0.04))" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: "var(--gradient-neon)" }}
              />
              <div className="relative glass-strong rounded-[calc(1.5rem-1.5px)] p-6 h-full flex flex-col">
                <div className={`h-40 rounded-2xl mb-5 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="absolute bottom-3 right-3 glass px-2.5 py-1 rounded-full text-[10px] font-mono">
                    {p.tag}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-display">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-1">{p.desc}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Case study</span>
                  <span className="text-gradient group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="relative z-10 py-28">
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.28 300 / 0.25), transparent 60%)",
        }}
      />
      <div className="container relative mx-auto px-4 sm:px-6 max-w-3xl">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's build <span className="text-gradient">something glowing</span></>}
          center
        />
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="reveal mt-14 glass-strong rounded-3xl p-8 sm:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell me about your project…"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[var(--neon-pink)] focus:shadow-[0_0_0_4px_oklch(0.72_0.3_340/0.15),0_0_30px_oklch(0.72_0.3_340/0.35)] transition-all resize-none"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex gap-3">
              {["GH", "IG", "X", "IN"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="h-10 w-10 rounded-full glass flex items-center justify-center text-xs font-mono hover:neon-glow-sm hover:border-[var(--neon-pink)]/60 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
            <button
              type="submit"
              className="btn-neon px-8 py-3 rounded-full font-semibold"
            >
              {sent ? "Sent ✓" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        required
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[var(--neon-pink)] focus:shadow-[0_0_0_4px_oklch(0.72_0.3_340/0.15),0_0_30px_oklch(0.72_0.3_340/0.35)] transition-all"
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "text-center" : ""}`}>
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— {eyebrow}</span>
      <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display max-w-2xl leading-tight">
        {title}
      </h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8">
      <div className="container mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Nova Reyes. Crafted with neon &amp; care.</span>
        <span className="font-mono text-xs">v1.0 — built in the dark</span>
      </div>
    </footer>
  );
}
