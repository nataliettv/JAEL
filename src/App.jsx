import { useState, useEffect, useRef } from "react";

const T = {
  es: {
    nav: ["Inicio", "Sobre Mí", "Experiencia", "Portafolio", "Contacto"],
    heroEyebrow: "Fotógrafo Profesional",
    heroSub: "Capturo momentos que conectan emocionalmente y cumplen objetivos comerciales.",
    heroCta1: "Ver Portafolio",
    heroCta2: "Contáctame",
    aboutEye: "Sobre Mí",
    aboutTitle: "Técnica + Creatividad",
    aboutTitleAccent: "= Imágenes que hablan",
    aboutP1: "Fotógrafo profesional con experiencia en eventos sociales, fotografía de producto y proyectos comerciales. Me caracterizo por adaptarme a distintos entornos, estilos y necesidades de cada cliente, logrando resultados de alta calidad tanto en situaciones controladas como en escenarios dinámicos.",
    expEye: "Trayectoria",
    expTitle: "Experiencia",
    expTitleAccent: "Laboral",
    portEye: "Trabajo",
    portTitle: "Portafolio",
    portTitleAccent: "Fotográfico",
    contactEye: "Trabajemos Juntos",
    contactTitle: "Contáctame",
    footer1: "Fotógrafo Profesional",
    categories: ["Todos", "Retratos", "Wildlife", "Eventos", "Comercial"],
    photoTitles: ["", "", "", "", "", "", "", "", ""],
  },
  en: {
    nav: ["Home", "About", "Experience", "Portfolio", "Contact"],
    heroEyebrow: "Professional Photographer",
    heroSub: "I capture moments that connect emotionally and meet commercial objectives.",
    heroCta1: "View Portfolio",
    heroCta2: "Contact Me",
    aboutEye: "About Me",
    aboutTitle: "Technique + Creativity",
    aboutTitleAccent: "= Images That Speak",
    aboutP1: "Professional photographer with experience in social events, product photography, and commercial projects. I adapt to different environments, styles, and client needs, delivering high-quality results in both controlled situations and dynamic scenarios.",
    expEye: "Career",
    expTitle: "Work",
    expTitleAccent: "Experience",
    portEye: "Work",
    portTitle: "Photography",
    portTitleAccent: "Portfolio",
    contactEye: "Let's Work Together",
    contactTitle: "Contact Me",
    footer1: "Professional Photographer",
    categories: ["All", "Portraits", "Wildlife", "Events", "Commercial"],
    photoTitles: ["", "", "", "", "", "", "", "", ""],
  },
};

const SKILLS = [
  "DSLR & Mirrorless", "Iluminación de Estudio", "Dirección de Talento",
  "Adobe Lightroom", "Adobe Photoshop", "Fotografía de Producto",
  "Eventos Sociales", "Fotografía Comercial",
];

const EXPERIENCE = {
  es: [
    { role: "Fotógrafo Freelance", company: "Independiente", period: "Dic 2023 – Actualidad", img: "/exp1.jpg", desc: "Cobertura de bodas, XV años, eventos sociales y sesiones de retrato con enfoque creativo y técnico." },
    { role: "Fotógrafo", company: "Zacua — Autos Eléctricos", period: "Abr 2025 – Actualidad", img: "/exp2.jpg", desc: "Fotografía automotriz y de producto para campañas digitales de marketing de vehículos eléctricos." },
    { role: "Fotógrafo", company: "1R Marketing Studio", period: "Jun 2025 – Actualidad", img: "/exp3.jpg", desc: "Producción de contenido fotográfico comercial y corporativo para distintas marcas y agencias." },
    
  ],
  en: [
    { role: "Freelance Photographer", company: "Independent", period: "Dec 2023 – Present", img: "/exp1.jpg", desc: "Wedding, quinceañera, social event and portrait photography with creative and technical focus." },
    { role: "Photographer", company: "Zacua — Electric Cars", period: "Apr 2025 – Present", img: "/exp2.jpg", desc: "Automotive and product photography for digital marketing campaigns of electric vehicles." },
    { role: "Photographer", company: "1R Marketing Studio", period: "Jun 2025 – Present", img: "/exp3.jpg", desc: "Commercial and corporate photo content production for various brands and agencies." },
    
  ],
};

const RETRATO_IMGS = ["/r1.jpg","/r2.jpg","/r4.jpg","/r6.jpg","/r7.jpg","/r8.jpg","/r9.jpg","/r11.jpg","/r12.jpg","/r13.jpg"];
const WILDLIFE_IMGS = ["/w1.jpg","/w2.jpg", "/w3.jpg","/w4.jpg","/w5.jpg"];
const EVENTOS_IMGS = ["/e1.jpg","/e2.jpg","/e3.jpg","/e4.jpg","/e5.jpg", "/e6.jpg"]; 
const COMERCIAL_IMGS = ["/c1.jpg","/c2.jpg","/c3.jpg"];





const ALL_PHOTOS = {
  es: [
    { id:1, cat:"Retratos", imgs: RETRATO_IMGS },
    { id:2, cat:"Wildlife", imgs: WILDLIFE_IMGS },
    { id:3, cat:"Eventos", imgs: EVENTOS_IMGS },
    { id:4, cat:"Comercial", imgs: COMERCIAL_IMGS },
  ],
  en: [
    { id:1, cat:"Portraits", imgs: RETRATO_IMGS },
    { id:2, cat:"Wildlife", imgs: WILDLIFE_IMGS },
    { id:3, cat:"Events", imgs: EVENTOS_IMGS },
    { id:4, cat:"Commercial", imgs: COMERCIAL_IMGS },
  ],
};

const DARK = {
  bg:"#0a0a08", bgDark:"#060604", surface:"#111110",
  border:"#1e1e1c", gold:"#b49241", white:"#f5f4f0", muted:"#666660",
  navBg:"rgba(10,10,8,0.96)",
};
const LIGHT = {
  bg:"#f5f3ee", bgDark:"#e8e4dc", surface:"#ede9e0",
  border:"#d4cfc4", gold:"#795d26", white:"#1a1a16", muted:"#7a7060",
  navBg:"rgba(245,243,238,0.97)",
};

export default function JaelPortfolio() {
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRefs = useRef({});

  const t = T[lang];
  const D = darkMode ? DARK : LIGHT;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((prev) => new Set([...prev, e.target.id])); }),
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const isVisible = (id) => visibleSections.has(id);
  const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  setMenuOpen(false);
};

  const navIds = ["inicio","sobre-mi","experiencia","portafolio","contacto"];
  const cats = t.categories;
  const allPhotos = ALL_PHOTOS[lang];
  const currentCatImgs = activeCategory === 0
    ? allPhotos.flatMap(g => g.imgs)
    : (allPhotos[activeCategory - 1]?.imgs || []);

  const S = getStyles(D);

  return (
    <div style={S.root}>
      <style>{getCss(D)}</style>

      {/*NAVEGATION TOOL BAR*/}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
        <div style={S.navInner}>
          <span style={S.logo} onClick={() => scrollTo("inicio")}>JH<span style={{color:D.gold}}>.</span></span>
          <div style={{...S.navLinks, display: isMobile ? "none" : "flex"}}>
            {t.nav.map((link, i) => (
              <button key={link} style={S.navLink} className="nav-btn" onClick={() => scrollTo(navIds[i])}>{link}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
            {!isMobile && <>
              <button onClick={() => { setLang(lang==="es"?"en":"es"); setActiveCategory(0); }} style={S.controlBtn} className="control-btn">
                <><img src={lang==="es" ? "/usa.png" : "/mexico.jpg"} style={{width:22,height:15,objectFit:"cover",marginRight:"0.4rem"}}/>{lang==="es" ? "EN" : "ES"}</>
              </button>
              <button onClick={() => setDarkMode(!darkMode)} style={S.controlBtn} className="control-btn">
                {darkMode?"☀︎ Light":"☾ Dark"}
              </button>
            </>}
            {isMobile && <button style={{...S.hamburger, display:"flex"}} onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{...S.bar,...(menuOpen?S.bar1Open:{})}}/>
              <span style={{...S.bar,opacity:menuOpen?0:1}}/>
              <span style={{...S.bar,...(menuOpen?S.bar3Open:{})}}/>
            </button>}
          </div>
        </div>
        {menuOpen && (
          <div style={S.mobileMenu}>
            {t.nav.map((link, i) => (
              <button key={link} style={S.mobileLink} onClick={() => { scrollTo(navIds[i]); setMenuOpen(false); }}>{link}</button>
            ))}
            <div style={{display:"flex",gap:"0.5rem",padding:"1rem 2rem",borderTop:`1px solid ${D.border}`}}>
              <button onClick={() => { setLang(lang==="es"?"en":"es"); setActiveCategory(0); }} style={{...S.controlBtn,width:"auto",padding:"0.4rem 1rem"}}>
                <><img src={lang==="es" ? "/usa.png" : "/mexico.jpg"} style={{width:20,height:14,objectFit:"cover",marginRight:"0.4rem"}}/>{lang==="es" ? "EN" : "ES"}</>
              </button>
              <button onClick={() => setDarkMode(!darkMode)} style={{...S.controlBtn,width:"auto",padding:"0.4rem 1rem"}}>
                {darkMode?"☀︎ Light":"☾ Dark"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/*INICIO*/}
      <section id="inicio" style={{...S.hero, padding: isMobile ? "0 1.5rem" : "0 6rem"}} ref={setRef("inicio")}>
        <HeroSlideshow />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.15) 100%)",zIndex:0}}/>
        <div style={S.heroContent} className="hero-content">
          <p style={S.heroEyebrow} className="fade-up-1">{t.heroEyebrow}</p>
          <h1 style={S.heroTitle} className="fade-up-2">Jael<br/><span style={S.heroTitleAccent}>Herrera</span></h1>
          <p style={S.heroSub} className="fade-up-3">{t.heroSub}</p>
          <div style={S.heroCtas} className="fade-up-4">
            {/*<button style={S.ctaPrimary} className="cta-btn" onClick={() => scrollTo("portafolio")}>{t.heroCta1}</button>*/}
            <button style={S.ctaSecondary} className="cta-btn" onClick={() => scrollTo("contacto")}>{t.heroCta2}</button>
          </div>
        </div>
        <button onClick={() => scrollTo("sobre-mi")} style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",zIndex:2,background:"transparent",border:"1.5px solid rgba(255,255,255,0.5)",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s"}} className="scroll-down-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </section>

      {/*ABOUT ME*/}
      <section id="sobre-mi" style={S.section} ref={setRef("sobre-mi")}>
        <div style={{...S.container,...S.aboutGrid, gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? "2rem" : "5rem"}}>
          <div style={{...S.aboutLeft,...(isVisible("sobre-mi")?{opacity:1,transform:"translateX(0)",transition:"all 0.8s ease"}:{})}}>
            <div style={S.photoFrame}>
              <div style={S.photoPlaceholder}>
                <img src="jaelherrera.jpg" alt="Jael Herrera" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
              </div>
              <div style={S.photoAccent}/>
            </div>
          </div>
          <div style={{...S.aboutRight,...(isVisible("sobre-mi")?{opacity:1,transform:"translateX(0)",transition:"all 0.8s ease 0.2s"}:{})}}>
            <p style={S.sectionEyebrow}>{t.aboutEye}</p>
            <h2 style={{...S.sectionTitle,marginBottom:"1.5rem"}}>
              {t.aboutTitle}<br/><span style={{color:D.gold}}>{t.aboutTitleAccent}</span>
            </h2>
            <p style={S.bodyText}>{t.aboutP1}</p>
            <p style={S.bodyText}>{t.aboutP2}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",marginTop:"2rem"}}>
              {SKILLS.map(s => <span key={s} style={S.skillTag} className="skill-tag">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/*EXPERIENCE*/}
      <section id="experiencia" style={{...S.section,background:D.surface}} ref={setRef("experiencia")}>
        <div style={S.container}>
          <div style={S.sectionHeader}>
            <p style={S.sectionEyebrow}>{t.expEye}</p>
            <h2 style={S.sectionTitle}>{t.expTitle}<br/><span style={{color:D.gold}}>{t.expTitleAccent}</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem"}}>
            {EXPERIENCE[lang].map((exp, i) => (
              <div key={i} className="exp-card" style={{
                background:D.bg, border:`1px solid ${D.border}`,
                borderRadius:"12px", overflow:"hidden",
                display:"flex", flexDirection:"column",
                opacity:isVisible("experiencia")?1:0,
                transform:isVisible("experiencia")?"translateY(0)":"translateY(30px)",
                transition:`all 0.6s ease ${i*0.15}s`,
                boxShadow:"0 4px 24px rgba(0,0,0,0.18)",
              }}>
                <div style={{height:180,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,${D.surface},${D.bgDark})`}}>
                  <img src={exp.img} alt={exp.role}
                    style={{width:"100%",height:"100%",objectFit:"cover"}}
                    onError={e=>e.target.style.display="none"}
                  />
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0.5rem 1rem",background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)"}}>
                    <span style={{fontSize:"0.5rem",color:D.gray,letterSpacing:"0.1em",textTransform:"uppercase"}}>{exp.period}</span>
                  </div>
                </div>
                <div style={{padding:"1.2rem 1.4rem",display:"flex",flexDirection:"column",flex:1}}>
                  <h3 style={{fontSize:"1rem",fontWeight:700,color:D.white,margin:"0 0 0.3rem"}}>{exp.role}</h3>
                  <p style={{fontSize:"0.78rem",color:D.gold,marginBottom:"0.8rem",fontStyle:"italic"}}>{exp.company}</p>
                  <p style={{fontSize:"0.85rem",color:D.muted,lineHeight:1.7,flex:1}}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*PORTFOLIO*/}
      <section id="portafolio" style={S.section} ref={setRef("portafolio")}>
        <div style={S.container}>
          <div style={S.sectionHeader}>
            <p style={S.sectionEyebrow}>{t.portEye}</p>
            <h2 style={S.sectionTitle}>{t.portTitle}<br/><span style={{color:D.gold}}>{t.portTitleAccent}</span></h2>
          </div>
          <div style={S.filterBar}>
            {cats.map((cat, i) => (
              <button key={cat} style={{...S.filterBtn,...(activeCategory===i?S.filterBtnActive:{})}} onClick={() => setActiveCategory(i)} className="filter-btn">{cat}</button>
            ))}
          </div>
          {currentCatImgs.length === 0 ? (
            <div style={{textAlign:"center",padding:"3rem",color:D.muted,fontSize:"0.9rem"}}>
              Próximamente — agrega tus fotos a public/
            </div>
          ) : (
            <div style={{columns:"3 280px",gap:"1rem"}}>
              {currentCatImgs.map((src, i) => (
                <div key={i} className="masonry-item" style={{
                  breakInside:"avoid",
                  marginBottom:"1rem",
                  overflow:"hidden",
                  opacity:isVisible("portafolio")?1:0,
                  transform:isVisible("portafolio")?"translateY(0)":"translateY(20px)",
                  transition:`all 0.6s ease ${i*0.05}s`,
                }}>
                  <img src={src} alt={`foto ${i+1}`} style={{
                    width:"100%",
                    display:"block",
                    objectFit:"cover",
                    transition:"transform 0.4s ease",
                  }} className="masonry-img"/>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/*CONTACT*/}
      <section id="contacto" style={{...S.section,background:D.surface}} ref={setRef("contacto")}>
        <div style={S.container}>
          <div style={S.sectionHeader}>
            <p style={S.sectionEyebrow}>{t.contactEye}</p>
            <h2 style={S.sectionTitle}>{t.contactTitle}<span style={{color:D.gold}}>.</span></h2>
          </div>
          <div style={{display:"flex",gap:"3rem",justifyContent:"center",flexWrap:"wrap",marginTop:"1rem",...(isVisible("contacto")?{opacity:1,transform:"translateY(0)",transition:"all 0.8s ease"}:{opacity:0,transform:"translateY(30px)"})}}>
            {[
              {href:"https://wa.me/527295526300",icon:<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.18 1.535 5.943L.057 23.457a.5.5 0 0 0 .612.612l5.515-1.479A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.204-1.431l-.374-.22-3.853 1.031 1.031-3.853-.22-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>},
              {href:"mailto:jhfotografo10@gmail.com",icon:<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>},
              {href:"https://instagram.com/jael_herrera17",icon:<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>},
              {href:"/cv-jael-herrera.pdf",download:"CV-Jael-Herrera.pdf",icon:<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v1.5H8zm0-3h8v1.5H8zm0-3h5v1.5H8z"/></svg>},
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" download={item.download} className="contact-icon-btn"
                style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.8rem",textDecoration:"none",color:D.muted,transition:"transform 0.25s ease"}}>
                <div style={{width:72,height:72,borderRadius:"50%",border:`1.5px solid ${D.white}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"border-color 0.25s, background 0.25s",background:D.white,color:D.bg}}>
                  {item.icon}
                </div>
                <span style={{fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase"}}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/*FOOTER*/}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <span style={{fontSize:"1.5rem",fontWeight:700}}>JH<span style={{color:D.gold}}>.</span></span>
          <p style={{color:D.muted,fontSize:"0.8rem",margin:0}}>  Jael Herrera (2026) · {t.footer1}</p>
          <p style={{color:D.muted,fontSize:"0.8rem",margin:0}}>Tecamac, México</p>
        </div>
      </footer>
    </div>
  );
}

function HeroSlideshow() {
  const imgs = ["/f1.jpg", "/f2.jpg", "/f3.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{position:"absolute",inset:0,zIndex:0}}>
      {imgs.map((src, i) => (
        <div key={src} style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${src})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          opacity: i === current ? 1 : 0,
          transition:"opacity 1.5s ease-in-out",
        }}/>
      ))}
    </div>
  );
}

function getStyles(D) {
  return {
 
    // ── ROOT ───
    root: {
      fontFamily: "'Georgia','Times New Roman',serif",
      background: D.bg,
      color: D.white,
      minHeight: "100vh",
      overflowX: "hidden",
      transition: "background 0.3s,color 0.3s",
    },
 
    // ── NAV ───
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.4rem 2rem", transition: "all 0.3s",
      display: "flex", flexDirection: "column",
      background: D.navBg, backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${D.border}`,
    },
    navScrolled: { padding: "0.9rem 2rem" },
    navInner: {
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      maxWidth: 1200, margin: "0 auto", width: "100%",
    },
    logo: {
      fontSize: "1.8rem", fontWeight: 700,
      color: D.white, cursor: "pointer", letterSpacing: "-0.02em",
    },
    navLinks: { display: "flex", gap: "2rem" },
    navLink: {
      background: "none", border: "none", color: D.muted,
      cursor: "pointer", fontSize: "0.85rem",
      letterSpacing: "0.1em", textTransform: "uppercase",
      transition: "color 0.2s", padding: "0.25rem 0",
    },
    controlBtn: {
      background: "transparent", border: `1px solid ${D.border}`,
      color: D.white, cursor: "pointer", fontSize: "0.72rem",
      letterSpacing: "0.09em", padding: "0.3rem 0.75rem",
      fontFamily: "'Georgia','Times New Roman',serif",
      transition: "all 0.2s", fontWeight: 50,
      width: "100px", height: "46px",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    hamburger: {
      display: "none", background: "none", border: "none",
      cursor: "pointer", padding: "0.5rem",
      flexDirection: "column", gap: "5px",
    },
    bar: { display: "block", width: 24, height: 2, background: D.white, transition: "all 0.3s" },
    bar1Open: { transform: "translateY(7px) rotate(45deg)" },
    bar3Open: { transform: "translateY(-7px) rotate(-45deg)" },
    mobileMenu: {
      display: "flex", flexDirection: "column",
      background: D.surface, borderTop: `1px solid ${D.border}`, marginTop: "0.8rem",
    },
    mobileLink: {
      background: "none", border: "none",
      borderBottom: `1px solid ${D.border}`,
      color: D.white, padding: "1rem 2rem",
      textAlign: "left", cursor: "pointer",
      fontSize: "1rem", fontFamily: "inherit",
    },
 
    // ── HERO ───
    hero: {
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "flex-start",
      position: "relative", overflow: "hidden", padding: "0 6rem",
    },
    heroGrid: { display: "none" },
    heroContent: { position: "relative", zIndex: 1, textAlign: "left", maxWidth: 580 },
    heroEyebrow: {
      fontSize: "0.72rem", letterSpacing: "0.35em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)", marginBottom: "1.2rem",
    },
    heroTitle: {
      fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700,
      lineHeight: 1.0, letterSpacing: "-0.03em",
      margin: "0 0 1.2rem", color: "#ffffff",
      textShadow: "0 2px 20px rgba(0,0,0,0.5)",
    },
    heroTitleAccent: { color: "transparent", WebkitTextStroke: "1.5px #e8b84b" },
    heroSub: {
      fontSize: "clamp(0.85rem,1.4vw,0.95rem)",
      color: "rgba(255,255,255,0.75)", lineHeight: 1.8,
      marginBottom: "2rem", textShadow: "0 2px 10px rgba(0,0,0,0.9)", maxWidth: 420,
    },
    heroCtas: { display: "flex", gap: "1rem", justifyContent: "flex-start", flexWrap: "wrap" },
    ctaPrimary: {
      background: D.gold, color: D.bgDark, border: "none",
      padding: "0.6rem 1.5rem", fontSize: "0.65rem",
      letterSpacing: "0.1em", textTransform: "uppercase",
      cursor: "pointer", fontWeight: 700,
      transition: "all 0.2s", fontFamily: "inherit",
    },
    ctaSecondary: {
      background: D.gold, color: D.bgDark, border: "none",
      padding: "0.6rem 1.5rem", fontSize: "0.65rem",
      letterSpacing: "0.1em", textTransform: "uppercase",
      cursor: "pointer", fontWeight: 700,
      transition: "all 0.2s", fontFamily: "inherit",
    },
 
    // ── SECCIONES GENERALES ───
    section: {
      padding: "4rem 1rem", maxWidth: "1126px",
      margin: "0 auto", width: "100%", boxSizing: "border-box",
    },
    container: { maxWidth: 1200, margin: "0 auto" },
    sectionHeader: { textAlign: "center", marginBottom: "4rem" },
    sectionEyebrow: {
      fontSize: "0.75rem", letterSpacing: "0.3em",
      textTransform: "uppercase", color: D.gold, marginBottom: "1rem",
    },
    sectionTitle: {
      fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700,
      lineHeight: 1.1, letterSpacing: "-0.03em", color: D.white, margin: 0,
    },
 
    // ── SOBRE MI ───
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "center" },
    aboutLeft: { opacity: 0, transform: "translateX(-30px)" },
    aboutRight: { opacity: 0, transform: "translateX(30px)" },
    photoFrame: { position: "relative", paddingBottom: "120%" },
    photoPlaceholder: {
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg,${D.surface},${D.bgDark})`,
      border: `1px solid ${D.border}`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "1rem",
    },
    photoAccent: {
      position: "absolute", bottom: -16, right: -16,
      width: "70%", height: "70%",
      border: `1px solid ${D.gold}`, zIndex: -1,
    },
    bodyText: { color: D.muted, lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" },
    skillTag: {
      background: "transparent", border: `1px solid ${D.border}`,
      color: D.muted, padding: "0.4rem 0.9rem",
      fontSize: "0.75rem", letterSpacing: "0.05em",
      transition: "all 0.2s", cursor: "default",
    },
 
    // ── EXPERIENCIA ───
    timeline: { display: "flex", flexDirection: "column", position: "relative" },
    timelineItem: {
      display: "flex", gap: "2rem", paddingBottom: "3rem",
      opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease",
    },
    timelineDot: {
      width: 10, height: 10, borderRadius: "50%",
      background: D.gold, border: `2px solid ${D.gold}`,
      flexShrink: 0, marginTop: "0.4rem",
    },
    timelineContent: {
      flex: 1, background: D.bg,
      border: `1px solid ${D.border}`,
      padding: "1.5rem 2rem", transition: "border-color 0.2s",
    },
    timelineHeader: {
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", flexWrap: "wrap",
      gap: "0.5rem", marginBottom: "0.5rem",
    },
    timelineRole: { fontSize: "1.1rem", fontWeight: 700, color: D.white, margin: 0 },
    timelineCompany: { color: D.muted, fontSize: "0.85rem", marginBottom: "1rem", fontStyle: "italic" },
    timelineList: {
      listStyle: "none", padding: 0, margin: 0,
      display: "flex", flexDirection: "column", gap: "0.4rem",
    },
    timelineListItem: {
      color: D.muted, fontSize: "0.9rem",
      display: "flex", gap: "0.5rem", alignItems: "flex-start",
    },
 
    // ── PORTAFOLIO ───
    filterBar: {
      display: "flex", gap: "0.5rem",
      justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem",
    },
    filterBtn: {
      background: "transparent", border: `1px solid ${D.border}`,
      color: D.muted, padding: "0.5rem 1.2rem",
      fontSize: "0.8rem", letterSpacing: "0.08em",
      textTransform: "uppercase", cursor: "pointer",
      transition: "all 0.2s", fontFamily: "inherit",
    },
    filterBtnActive: {
      background: D.gold, color: D.bgDark,
      border: `1px solid ${D.gold}`, fontWeight: 700,
    },
    photoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" },
    photoCard: {
      aspectRatio: "4/3", position: "relative", overflow: "hidden",
      cursor: "pointer", opacity: 0, transform: "translateY(20px)",
      transition: "transform 0.4s ease,opacity 0.6s ease",
    },
    photoOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "1.5rem",
      opacity: 0, transition: "opacity 0.3s",
    },
    photoIcon: {
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)", fontSize: "3rem", opacity: 0.4,
    },
    galleryNote: {
      textAlign: "center", color: D.muted,
      fontSize: "0.75rem", marginTop: "2rem", fontStyle: "italic",
    },
 
    // ── FOOTER ──
    footer: {
      borderTop: `1px solid ${D.border}`,
      padding: "2rem", background: D.bgDark, transition: "background 0.3s",
    },
    footerInner: {
      maxWidth: 1200, margin: "0 auto",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
    },
 
  };
}

function getCss(D) {
  return `
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:${D.bg};transition:background 0.3s}
    @keyframes fadeUp{from{opacity:0;transform:translateY(35px)}to{opacity:1;transform:translateY(0)}}
    .fade-up-1{animation:fadeUp .8s ease .2s both}
    .fade-up-2{animation:fadeUp .8s ease .4s both}
    .fade-up-3{animation:fadeUp .8s ease .6s both}
    .fade-up-4{animation:fadeUp .8s ease .8s both}
    .nav-btn:hover{color:${D.gold} !important}
    .control-btn:hover{border-color:${D.gold} !important;color:${D.gold} !important}
    .cta-btn:hover{opacity:.85;transform:translateY(-2px)}
    .skill-tag:hover{border-color:${D.gold} !important;color:${D.gold} !important}
    .timeline-card:hover .t-content{border-color:${D.gold} !important}
    .exp-card:hover{transform:translateY(-6px) !important;border-color:${D.gold} !important;box-shadow:0 12px 40px rgba(0,0,0,0.3) !important}
    .masonry-item:hover .masonry-img{transform:scale(1.03)}
    .masonry-item{cursor:pointer}
    .photo-card:hover{transform:scale(1.03) !important}
    .photo-card:hover>div:first-child{opacity:1 !important}
    .filter-btn:hover{border-color:${D.gold} !important;color:${D.gold} !important}
    .contact-icon-btn:hover{transform:translateY(-6px) scale(1.08);transition:transform 0.25s ease}
    .contact-icon-btn{transition:transform 0.25s ease}
    .scroll-down-btn:hover{background:rgba(255,255,255,0.15) !important;border-color:white !important}
    @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
    .scroll-down-btn{animation:bounce 2s infinite}
    @media(max-width:768px){
      .nav-links-hide{display:none !important}
      .hamburger-show{display:flex !important}
      .about-grid{grid-template-columns:1fr !important;gap:2rem !important}
    }
    @media(max-width:600px){
      #inicio{padding:0 1.5rem !important}
      #sobre-mi,#experiencia,#portafolio,#contacto{padding:3rem 1.2rem !important}
      #inicio .hero-content{max-width:100% !important}
    }
    @media(max-width:480px){
      #inicio{padding:0 1.2rem !important}
    }
  `;
}
