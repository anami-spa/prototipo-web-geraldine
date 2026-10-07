import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  Play,
  Radio,
  X,
} from 'lucide-react';
import { EscuelaCatalogPage } from './components/EscuelaCatalogPage';
import { RadioPage } from './components/RadioPage';
import { ResilientImage } from './components/ResilientImage';
import { ServiceDetailTemplate } from './components/ServiceDetailTemplate';
import { SobreMiPage } from './components/SobreMiPage';
import { ContactoPage, SpeakerPage } from './components/SpeakerBlogContactoPages';
import { ESCUELA_CARDS, RoutePath, SERVICE_DETAILS, SITE_LINKS } from './data/siteContent';

const MARQUEE_ITEMS = [
  'Profesora de Emprendedores',
  'Retina Emprendedora',
  '+1.000 Emprendedores',
  'Biobío, Chile',
  '12 años de trayectoria',
];

const TESTIMONIALS = [
  {
    name: 'Valeria Arancibia',
    role: 'Terapeuta, Barras Access y Tarot',
    quote:
      'Como terapeuta, antes me costaba mucho ofrecer mis servicios. Sin embargo, desde que aplico el enfoque de la Retina, todo cambió: cuando alguien me pregunta qué hago, se lo explico desde su propio problema y usando sus mismas palabras. Ahora la conversación fluye de forma natural, orgánica y sin ninguna presión.',
    shift: 'Testimonio real, publicado en geraldinemanriquez.com',
  },
  {
    name: 'Ignacio Neira',
    role: 'Agencia de Marketing',
    quote:
      'Antes era una persona insegura, llena de miedos. Sentía que vender no era para mí. Hasta que aprendí a escuchar de verdad a mis clientes y a usar su propia información para mostrarles cómo podía ayudarlos. Empecé a generar ventas de forma natural, sin presionar, sin sentirme incómodo.',
    shift: 'Testimonio real, publicado en geraldinemanriquez.com',
  },
  {
    name: 'Javiera Flores',
    role: '@ritualestetica.cl',
    quote:
      'Antes me sentía perdida con mis ventas y desconectada de mis clientes. Con el acompañamiento de Geri y su método, aprendí a usar las palabras reales de mis clientas para vender. Eso marcó una gran diferencia: comencé a concretar más ventas y a mantenerlas en el tiempo.',
    shift: 'Testimonio real, publicado en geraldinemanriquez.com',
  },
];

const QUICK_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'q1',
    text: 'Cuando me preguntan a qué me dedico, respondo con el nombre técnico de mi servicio o certificación en vez del problema que resuelvo.',
  },
  {
    id: 'q2',
    text: 'Siento que atraigo personas interesadas, pero después de dar el precio me dicen "lo voy a pensar" y la conversación se enfría.',
  },
  {
    id: 'q3',
    text: 'Me cuesta publicar o vender porque no quiero sonar insistente ni usar fórmulas agresivas que no me representan.',
  },
];

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/sobre-mi',
  '/escuela',
  '/escuela/diagnostico',
  '/escuela/narrativa-comercial',
  '/escuela/vender-sin-vender',
  '/escuela/conexiones-que-conectan',
  '/radio',
  '/speaker',
  '/contacto',
];

function normalizePath(pathname: string): RoutePath {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(cleaned as RoutePath)) {
    return cleaned as RoutePath;
  }
  return '/';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<RoutePath>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  // Quick 1-minute diagnostic state
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
  });

  // Newsletter form state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Vestido A/B (T1.5 del plan): ?tema=a activa la paleta y tipografía
  // reales de la marca de Geraldine (dorado + Bodoni Moda + DM Sans).
  // Sin el parámetro, o con ?tema=b, queda el Vestido B (terracota +
  // Fraunces) ya construido. Decisión para la reunión de Fase 3, no nuestra.
  const [tema, setTema] = useState<'a' | 'b'>(() => {
    if (typeof window === 'undefined') return 'b';
    return new URLSearchParams(window.location.search).get('tema') === 'a' ? 'a' : 'b';
  });

  useEffect(() => {
    if (tema === 'a') {
      document.documentElement.setAttribute('data-tema', 'a');
    } else {
      document.documentElement.removeAttribute('data-tema');
    }
  }, [tema]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Drawer móvil: Escape cierra, el scroll del body queda bloqueado mientras
  // está abierto, y el foco entra al primer link y vuelve al botón al cerrar.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstLink = mobileDrawerRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && mobileDrawerRef.current) {
        const focusable = mobileDrawerRef.current.querySelectorAll<HTMLElement>('a, button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navigateTo = (route: RoutePath, anchorId?: string, programContext?: string) => {
    setMobileMenuOpen(false);
    if (programContext) {
      setSelectedProgram(programContext);
    }

    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setActiveRoute(route);

    if (anchorId) {
      window.setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleQuestion = (id: string) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedQuestions).filter(Boolean).length;

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError('Por favor, ingresa tu correo electrónico para recibir el diagnóstico.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Ingresa un correo electrónico válido (ejemplo: nombre@tudominio.cl).');
      return;
    }

    setEmailError(null);
    setSubmittedEmail(trimmed);
    setIsSubscribed(true);
    setEmail('');
    // Prototipo sin backend de newsletter: el formulario real de Geraldine
    // para este mismo diagnóstico ya existe en HubSpot — lo abrimos en vez
    // de fingir un registro. Ver T1.7 del plan de mejoras.
    window.open(SITE_LINKS.diagnosticoHubspotForm, '_blank', 'noopener,noreferrer');
  };

  const navItems: { label: string; route: RoutePath; matchPrefix?: string }[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Escuela', route: '/escuela', matchPrefix: '/escuela' },
    { label: 'Radio', route: '/radio' },
    { label: 'Speaker', route: '/speaker' },
    { label: 'Sobre Mí', route: '/sobre-mi' },
    { label: 'Contacto', route: '/contacto' },
  ];

  const isNavActive = (item: { route: RoutePath; matchPrefix?: string }) => {
    if (item.matchPrefix) {
      return activeRoute.startsWith(item.matchPrefix);
    }
    return activeRoute === item.route;
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171A17] flex flex-col">
      {/* Selector de vestido — herramienta de la reunión de Fase 3, no es
          parte del sitio final. Cambia tipografía + color de acento entre
          "Dorado Editorial" (marca real de Geraldine) y "Terracota Cálido"
          (propuesta nueva). Ver T1.5 del plan de mejoras. */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[60] flex items-center gap-1 bg-[#171A17]/95 text-[#F8F6F1] rounded-sm p-1 shadow-lg font-tabular text-[10px] sm:text-xs">
        <button
          type="button"
          onClick={() => setTema('b')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-sm transition-colors whitespace-nowrap ${
            tema === 'b' ? 'bg-[#F8F6F1] text-[#171A17] font-semibold' : 'hover:bg-white/10'
          }`}
        >
          Terracota
        </button>
        <button
          type="button"
          onClick={() => setTema('a')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-sm transition-colors whitespace-nowrap ${
            tema === 'a' ? 'bg-[#F8F6F1] text-[#171A17] font-semibold' : 'hover:bg-white/10'
          }`}
        >
          Dorado
        </button>
      </div>

      {/* 1. HEADER FIJO (Strict 3-Zone Top Bar Contract) */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title (Single text element wordmark) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            aria-label="Geraldine Manríquez — Volver al inicio"
            className="font-editorial text-2xl font-semibold tracking-tight text-[#171A17] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
          >
            GM
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-[#464944]"
          >
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.route);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap py-1 border-b transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] ${
                    active
                      ? 'text-[var(--color-accent)] border-[var(--color-accent)] font-semibold'
                      : 'text-[#464944] border-transparent hover:text-[#171A17] hover:border-[#171A17]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="/#diagnostico"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/', 'diagnostico');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171A17]"
            >
              <span>Descubre en 1 min. si tu mensaje vende</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>

            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer-nav"
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#171A17] hover:bg-[#EBE7DD] rounded-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer-nav"
            ref={mobileDrawerRef}
            className="md:hidden bg-[#F8F6F1] border-b border-[#DEDAD0] px-4 pt-3 pb-5 shadow-lg"
          >
            <nav
              aria-label="Navegación móvil"
              className="flex flex-col space-y-2 text-base font-medium"
            >
              {navItems.map((item) => {
                const active = isNavActive(item);
                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.route);
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={`py-2 border-b border-[#EAE6DC] ${
                      active ? 'text-[var(--color-accent)] font-semibold' : 'text-[#171A17]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="/#diagnostico"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/', 'diagnostico');
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm whitespace-nowrap"
              >
                <span>Descubre en 1 min. si tu mensaje vende</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16">
        {/* ROUTE SWITCHER */}
        {activeRoute === '/sobre-mi' && <SobreMiPage onNavigate={navigateTo} />}

        {activeRoute === '/escuela' && <EscuelaCatalogPage onNavigate={navigateTo} />}

        {(activeRoute === '/escuela/diagnostico' ||
          activeRoute === '/escuela/narrativa-comercial' ||
          activeRoute === '/escuela/vender-sin-vender' ||
          activeRoute === '/escuela/conexiones-que-conectan') && (
          <ServiceDetailTemplate
            service={SERVICE_DETAILS[activeRoute]}
            onNavigate={navigateTo}
          />
        )}

        {activeRoute === '/radio' && <RadioPage />}

        {activeRoute === '/speaker' && <SpeakerPage onNavigate={navigateTo} />}

        {activeRoute === '/contacto' && <ContactoPage />}

        {/* HOME PAGE (Preserved & Expanded with direct links to all new routes) */}
        {activeRoute === '/' && (
          <>
            {/* 2. HERO SECTION */}
            <section
              id="inicio"
              className="scroll-mt-16 relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#DEDAD0]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  {/* Left Column: Editorial Proposition (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col items-start">
                    {/* Unboxed metadata kicker */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#5A5D56] mb-5">
                      <span className="text-[var(--color-accent)] font-semibold">
                        Profesora de Emprendedores
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Geraldine Manríquez</span>
                      <span aria-hidden="true">·</span>
                      <span>Concepción, Chile</span>
                    </div>

                    {/* Titular principal — ver §2 del plan de mejoras para las 2 variantes
                        descartadas, que quedan como lámina de presentación, no en la UI */}
                    <h1
                      className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-[#171A17] mb-6"
                      style={{ textWrap: 'balance' }}
                    >
                      Deja de explicar tu técnica: destraba tu negocio nombrando{' '}
                      <span className="italic font-normal text-[var(--color-accent)]">
                        el problema real de tu cliente.
                      </span>
                    </h1>

                    {/* Exact Mission Statement */}
                    <p className="text-base sm:text-lg lg:text-xl text-[#383B36] leading-relaxed max-w-[62ch] mb-8 border-l-2 border-[var(--color-accent)] pl-5">
                      Ayudarte a destrabar tu negocio, estructurar tus ideas y dominar una
                      narrativa comercial que atraiga a tu cliente ideal.
                    </p>

                    {/* Two CTAs: 1 to Lead Magnet, 1 to Escuela */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                      <a
                        href="#diagnostico"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/', 'diagnostico');
                        }}
                        className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171A17]"
                      >
                        <span>Descubre en 1 min. si tu mensaje vende</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </a>

                      <a
                        href="/escuela"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/escuela');
                        }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#171A17] bg-transparent border border-[#171A17]/30 hover:border-[#171A17] hover:bg-[#ECE8DF] rounded-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                      >
                        <span>Ir a la Escuela de Ventas</span>
                      </a>
                    </div>

                  </div>

                  {/* Right Column: Editorial Portrait Frame (5 cols) */}
                  <div className="lg:col-span-5">
                    <figure className="relative mx-auto max-w-md lg:max-w-none">
                      {/* Foto real de Geraldine (Sony ILCE-6400, misma foto que
                          usa en geraldinemanriquez.com/escuela, filename
                          fullsizeoutput_97fe) — reemplaza el bloque pendiente */}
                      <div className="relative overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[3/4]">
                        <ResilientImage
                          src="/images/geraldine_manriquez_retrato.webp"
                          alt="Retrato de Geraldine Manríquez, coach de ventas y narrativa comercial en Concepción, Chile"
                          fallbackTitle="Geraldine Manríquez"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171A17]/85 via-[#171A17]/20 to-transparent p-5 sm:p-6 text-[#F8F6F1]">
                          <p className="font-editorial text-lg sm:text-xl italic leading-snug">
                            “Vender no es convencer a la fuerza; es saber traducir lo que haces al
                            dolor que tu cliente ya quiere resolver.”
                          </p>
                        </div>
                      </div>
                      <figcaption className="mt-2.5 text-xs text-[#5E615B] font-tabular">
                        Geraldine Manríquez · Concepción, Biobío
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. FRANJA / MARQUEE CON PALABRAS CLAVE EN LOOP */}
            <section
              aria-label="Trayectoria y credenciales clave"
              className="bg-[#121A16] text-[#F4F1EA] py-4 border-b border-[#26312B] overflow-hidden"
            >
              <div className="animate-marquee-loop flex items-center">
                {[0, 1, 2, 3].map((repeatIndex) => (
                  <div
                    key={repeatIndex}
                    className="flex items-center shrink-0"
                    aria-hidden={repeatIndex > 0 ? 'true' : undefined}
                  >
                    {MARQUEE_ITEMS.map((item, itemIdx) => (
                      <React.Fragment key={`${repeatIndex}-${itemIdx}`}>
                        <span className="px-5 sm:px-7 text-sm sm:text-base font-editorial tracking-wide whitespace-nowrap text-[#F4F1EA]">
                          {item}
                        </span>
                        <span className="text-[#D4A359] select-none" aria-hidden="true">
                          ·
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. SECCIÓN "LA RETINA EMPRENDEDORA" */}
            <section
              id="sobre-mi"
              className="scroll-mt-16 py-16 lg:py-24 border-b border-[#DEDAD0] bg-[#F8F6F1]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#DEDAD0]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#5A5D56]">
                    <span className="font-tabular text-[var(--color-accent)] font-semibold">MÉTODO PROPIO</span>
                    <span aria-hidden="true">·</span>
                    <span>La Retina Emprendedora</span>
                    <span aria-hidden="true">·</span>
                    <span>12 años de trayectoria en Biobío, Chile</span>
                  </div>
                  <div className="font-tabular text-xs text-[#5A5D56]">
                    Emprendedores / Terapeutas / Coaches / Profesionales Independientes
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column: Photo + Editorial Caption (5 cols) */}
                  <div className="lg:col-span-5">
                    <figure>
                      <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/3]">
                        <ResilientImage
                          src="/images/retina_emprendedora_cafe_1791226529701.webp"
                          alt="Dos mujeres conversando en un café y espacio de coworking aplicando el método La Retina Emprendedora"
                          fallbackTitle="La Retina Emprendedora"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="mt-2.5 text-xs text-[#5E615B] font-tabular">
                        Fig. 02 — Diagnóstico de narrativa comercial en terreno
                      </figcaption>
                    </figure>

                    <dl className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-[#DEDAD0]">
                      <div>
                        <dt className="text-xs text-[#5A5D56] mb-1">Profesionales formados</dt>
                        <dd className="font-tabular text-2xl sm:text-3xl font-semibold text-[#171A17]">
                          +1.000
                        </dd>
                        <span className="text-xs text-[#5A5D56]">Emprendedores y consultores</span>
                      </div>
                      <div>
                        <dt className="text-xs text-[#5A5D56] mb-1">Experiencia docente</dt>
                        <dd className="font-tabular text-2xl sm:text-3xl font-semibold text-[#171A17]">
                          12 años
                        </dd>
                        <span className="text-xs text-[#5A5D56]">
                          En ecosistemas de Biobío, Chile
                        </span>
                      </div>
                    </dl>
                  </div>

                  {/* Right Column: Anchor Quote + Brief Method Explanation + CTA (7 cols) */}
                  <div className="lg:col-span-7">
                    <p
                      aria-hidden="true"
                      className="text-xs sm:text-sm font-tabular tracking-wider text-[var(--color-accent)] mb-3"
                    >
                      EL CAMBIO DE ENFOQUE COMERCIAL
                    </p>

                    <blockquote className="mb-8">
                      <h2
                        className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] italic text-[#171A17]"
                        style={{ textWrap: 'balance' }}
                      >
                        “Enamórate del problema de tu cliente, no de la solución.”
                      </h2>
                    </blockquote>

                    <div className="space-y-4 text-base sm:text-lg text-[#323530] leading-relaxed max-w-[65ch]">
                      <p>
                        La mayoría de los emprendedores, terapeutas, coaches y profesionales
                        independientes comete el mismo tropiezo sin notarlo: cuando les preguntan
                        qué hacen, describen su herramienta, su diploma o las características
                        técnicas de su sesión.
                      </p>
                      <p>
                        <strong className="font-semibold text-[#171A17]">
                          La Retina Emprendedora
                        </strong>{' '}
                        es el método con el que entrenamos tu mirada comercial para observar y
                        escuchar exactamente cómo tu cliente nombra lo que le duele. Cuando dejas
                        de recitar tu solución y aprendes a estructurar tu mensaje desde las
                        palabras reales de tu cliente, vender deja de sentirse incómodo y se
                        transforma en una conversación natural de ayuda.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#DEDAD0] flex flex-wrap items-center gap-4">
                      <a
                        href="/sobre-mi"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/sobre-mi');
                        }}
                        className="inline-flex items-center gap-3 px-5 py-3 text-sm sm:text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors duration-150 whitespace-nowrap"
                      >
                        <span>Conoce mi historia</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setStoryExpanded((prev) => !prev)}
                        aria-expanded={storyExpanded}
                        className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#171A17] bg-[#EAE5DA] hover:bg-[#DFD9CB] border border-[#C9C3B4] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <span>Resumen rápido aquí</span>
                        {storyExpanded ? (
                          <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                        )}
                      </button>

                      {storyExpanded && (
                        <div className="w-full mt-4 p-6 bg-[#F1EDE4] border border-[#D5CFC2] rounded-sm space-y-3 text-sm sm:text-base text-[#2D302B] leading-relaxed">
                          <p>
                            Tras 12 años como profesora de Educación Física (pregrado y postgrado),
                            especializada en neurociencia y con dos magíster, fui despedida pese a
                            tener contrato indefinido. Con ese finiquito emprendí, viví el punto de
                            quiebre cuando los clientes no llegaban y descubrí{' '}
                            <strong>La Retina Emprendedora</strong>.
                          </p>
                          <button
                            type="button"
                            onClick={() => navigateTo('/sobre-mi')}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
                          >
                            <span>Leer relato completo en Sobre Mí</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. SECCIÓN OSCURA "¿CÓMO TRABAJO?" EN 3 COLUMNAS */}
            <section
              id="escuela"
              className="scroll-mt-16 py-16 lg:py-24 bg-[#121A16] text-[#F4F1EA] border-b border-[#26312B]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 mb-12 border-b border-[#27332C]">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-tabular text-[#D4A359] mb-3">
                      <span>ARQUITECTURA DE PROGRAMAS</span>
                      <span aria-hidden="true">·</span>
                      <span>ESCUELA Y SPEAKER</span>
                    </div>
                    <h2
                      className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] tracking-[0.01em]"
                      style={{ textWrap: 'balance' }}
                    >
                      ¿Cómo trabajo?
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#C4C0B6] max-w-[54ch] leading-relaxed tracking-[0.01em]">
                    Dos rutas diseñadas según el momento actual de tu negocio: desde estructurar tu
                    discurso comercial en la Escuela hasta entrenar equipos corporativos en
                    Concepción.
                  </p>
                </div>

                {/* 2 Columns Grid — la 3ª columna (Mentoría 1 a 1 de pago) se retiró:
                    su sitio real ofrece "Mentorías gratuitas" en CIDERE, Etmday,
                    Rediversas y Openbeauchef, no un servicio pagado. Pendiente de
                    confirmar con la pregunta 7 del brief de WhatsApp (ver T2.4) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* COLUMNA 01: ESCUELA DE VENTAS */}
                  <article className="flex flex-col justify-between bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8">
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#2C3A32]">
                        <span className="font-tabular text-xs text-[#D4A359]">
                          FORMACIÓN APLICADA
                        </span>
                        <span className="font-tabular text-xs text-[#9BA39D]">
                          Pago online con Flow
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-3 tracking-[0.01em]">
                        01. Escuela de Ventas
                      </h3>
                      <p className="text-sm text-[#C4C0B6] leading-relaxed mb-6 tracking-[0.01em]">
                        Programas prácticos para traducir tu servicio al lenguaje de tu cliente
                        ideal y dominar un proceso de venta claro.
                      </p>

                      {/* Program items inside Column 01 (Now clickable to their full service detail route!) */}
                      <div className="space-y-5 border-t border-[#2C3A32] pt-5">
                        {/* Item 1: Sesión Diagnóstica */}
                        <div className="pb-5 border-b border-[#26332B]">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/diagnostico')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[#D4A359] text-left transition-colors cursor-pointer"
                            >
                              Sesión Diagnóstica →
                            </button>
                            <span className="font-tabular text-base font-semibold text-[#F4F1EA]">
                              {ESCUELA_CARDS[0].regularPrice}
                            </span>
                          </div>
                          <p className="text-xs text-[#B6B2A8] mb-2 leading-relaxed">
                            Revisión estratégica de 60 min para detectar dónde se traba hoy tu
                            discurso o tu oferta.
                          </p>
                          <div className="font-tabular text-xs text-[#D4A359]">
                            Precio preferencial ecosistemas: <strong>{ESCUELA_CARDS[0].preferentialPrice}</strong>
                          </div>
                        </div>

                        {/* Item 2: Narrativa Comercial */}
                        <div className="pb-5 border-b border-[#26332B]">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/narrativa-comercial')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[#D4A359] text-left transition-colors cursor-pointer"
                            >
                              Narrativa Comercial →
                            </button>
                            <span className="font-tabular text-base font-semibold text-[#F4F1EA]">
                              {ESCUELA_CARDS[1].regularPrice}
                            </span>
                          </div>
                          <p className="text-xs text-[#B6B2A8] mb-1.5 leading-relaxed">
                            Sesión estratégica + guion listo para usar + 7 días WhatsApp SOS.
                          </p>
                          <div className="font-tabular text-xs text-[#D4A359]">
                            Precio preferencial ecosistemas: <strong>{ESCUELA_CARDS[1].preferentialPrice}</strong>
                          </div>
                        </div>

                        {/* Item 3: Vender sin Vender */}
                        <div>
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/vender-sin-vender')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[#D4A359] text-left transition-colors cursor-pointer"
                            >
                              Vender sin Vender →
                            </button>
                            <span className="font-tabular text-base font-semibold text-[#F4F1EA]">
                              {ESCUELA_CARDS[2].regularPrice}
                            </span>
                          </div>
                          <p className="text-xs text-[#B6B2A8] mb-2 leading-relaxed">
                            Curso grupal intensivo + 30 días de acompañamiento por WhatsApp.
                          </p>
                          <div className="font-tabular text-xs text-[#D4A359] space-y-1">
                            <div>
                              Precio preferencial: <strong>{ESCUELA_CARDS[2].preferentialPrice}</strong>
                            </div>
                            <div className="text-[#E6E2D8]">
                              Próxima cohorte: <strong>fecha por confirmar</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#2C3A32]">
                      <button
                        type="button"
                        onClick={() => navigateTo('/escuela')}
                        className="w-full inline-flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#121A16] bg-[#D4A359] hover:bg-[#E2B46B] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <span>Ver catálogo completo de la Escuela</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </article>

                  {/* COLUMNA 02: SPEAKER & EVENTOS */}
                  <article
                    id="speaker"
                    className="scroll-mt-20 flex flex-col justify-between bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#2C3A32]">
                        <span className="font-tabular text-xs text-[#D4A359]">
                          EMPRESAS &amp; ECOSISTEMA
                        </span>
                        <span className="font-tabular text-xs text-[#9BA39D]">
                          Concepción y Chile
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-3 tracking-[0.01em]">
                        02. Speaker &amp; Eventos
                      </h3>
                      <p className="text-sm text-[#C4C0B6] leading-relaxed mb-6 tracking-[0.01em]">
                        Instancias presenciales de formación corporativa y articulación de redes de
                        negocios en la Región del Biobío.
                      </p>

                      <div className="space-y-5 border-t border-[#2C3A32] pt-5">
                        {/* Sub-item 1: Relatorías y Conferencias */}
                        <div className="pb-5 border-b border-[#26332B]">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/speaker')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[#D4A359] text-left transition-colors cursor-pointer"
                            >
                              Relatorías y Conferencias →
                            </button>
                            <span className="font-tabular text-xs text-[#D4A359] shrink-0">
                              Precio: Consultar
                            </span>
                          </div>
                          <p className="text-xs text-[#B6B2A8] mb-2 leading-relaxed">
                            Conferencias sobre <strong>Problema Real del Cliente</strong>,{' '}
                            <strong>Experiencia del Cliente</strong> y{' '}
                            <strong>Ruta Emprendedora</strong>.
                          </p>
                        </div>

                        {/* Sub-item 2: Conexiones que Conectan */}
                        <div>
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/conexiones-que-conectan')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[#D4A359] text-left transition-colors cursor-pointer"
                            >
                              Conexiones que Conectan →
                            </button>
                            <span className="font-tabular text-xs text-[#D4A359] shrink-0">
                              $50.000 / $25.000
                            </span>
                          </div>
                          <p className="text-xs text-[#B6B2A8] mb-2 leading-relaxed">
                            10º Taller de Networking presencial en Concepción (Ticket general
                            $50.000 / Ex-participantes $25.000).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#2C3A32] flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => navigateTo('/speaker')}
                        className="w-full inline-flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#F4F1EA] bg-transparent border border-[#495A4F] hover:border-[#D4A359] hover:text-[#D4A359] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <span>Ver página de Speaker &amp; Conferencias</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* 6. TESTIMONIOS REALES (3 TARJETAS) */}
            <section
              aria-labelledby="testimonios-heading"
              className="py-16 lg:py-24 bg-[#F8F6F1] border-b border-[#DEDAD0]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-[#DEDAD0]">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-3">
                      <span>EVIDENCIA REAL EN TERRENO</span>
                      <span aria-hidden="true">·</span>
                      <span>RESULTADOS DEL MÉTODO</span>
                    </div>
                    <h2
                      id="testimonios-heading"
                      className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171A17]"
                      style={{ textWrap: 'balance' }}
                    >
                      Lo que ocurre cuando hablas con las palabras de tu cliente
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#52554E] max-w-[46ch]">
                    Testimonios reales de profesionales independientes, terapeutas y agencias que
                    aplicaron el enfoque de La Retina Emprendedora.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((item, index) => (
                    <article
                      key={item.name}
                      className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DCD7CA] rounded-sm p-6 sm:p-8"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-tabular text-[#676A63] pb-4 mb-6 border-b border-[#E6E2D6]">
                          <span>Caso 0{index + 1}</span>
                          <span>{item.shift}</span>
                        </div>

                        <blockquote className="mb-8">
                          <p className="font-editorial text-lg sm:text-xl text-[#171A17] leading-relaxed">
                            “{item.quote}”
                          </p>
                        </blockquote>
                      </div>

                      <footer className="pt-4 border-t border-[#E6E2D6]">
                        <div className="font-semibold text-base text-[#171A17]">{item.name}</div>
                        <div className="text-xs sm:text-sm text-[#5A5D56] mt-0.5">{item.role}</div>
                      </footer>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. BANDA DE RADIO: "APRENDE A EMPRENDER" */}
            <section
              id="radio"
              className="scroll-mt-16 py-16 lg:py-24 bg-[#1F1A17] text-[#F6F3EC] border-b border-[#332B26]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#362E29] text-xs sm:text-sm font-tabular text-[#D9CBB8]">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-[#D4A359]" aria-hidden="true" />
                    <span className="text-[#F6F3EC] font-semibold">EN EL AIRE</span>
                    <span aria-hidden="true">·</span>
                    <span>Radio Femenina de Concepción (44 años al aire)</span>
                  </div>
                  <div>
                    <span>Lunes - Miércoles - Viernes</span>
                    <span aria-hidden="true"> · </span>
                    <span className="text-[#D4A359] font-semibold">18:00 a 19:00 hrs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div className="lg:col-span-7">
                    <div className="text-xs font-tabular text-[#D4A359] mb-2">
                      PROGRAMA DE CONVERSACIÓN Y NEGOCIOS EN BIOBÍO
                    </div>
                    <h2
                      className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F6F3EC] mb-4 tracking-[0.01em]"
                      style={{ textWrap: 'balance' }}
                    >
                      Programa Radial “Aprende a Emprender”
                    </h2>
                    <p className="text-base sm:text-lg text-[#D6D0C6] leading-relaxed max-w-[60ch] mb-6 tracking-[0.01em]">
                      Tres veces por semana, en los micrófonos de{' '}
                      <strong className="text-[#F6F3EC]">
                        Radio Femenina de Concepción (44 años al aire)
                      </strong>
                      , conversamos sin libreto con emprendedores, profesionales y líderes locales
                      sobre los desafíos reales de sacar adelante un negocio.
                    </p>

                    <div className="p-5 bg-[#29221E] border-l-2 border-[#D4A359] mb-8">
                      <div className="font-tabular text-xs text-[#D4A359] mb-1">
                        IMPACTO Y ALTA DEMANDA EN LA REGIÓN
                      </div>
                      <p className="font-editorial text-xl sm:text-2xl text-[#F6F3EC]">
                        +150 invitados entrevistados, hoy con 2 meses de lista de espera.
                      </p>
                    </div>

                    <div className="bg-[#26201C] border border-[#3D332D] rounded-sm p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tabular text-[#C9B9A6] pb-3 mb-3 border-b border-[#382F29]">
                        <span>EN VIVO</span>
                        <span className="text-[#D4A359]">{SITE_LINKS.radioEmisora}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#BFB7AC] mb-5 leading-relaxed">
                        {SITE_LINKS.radioInvitados}. Alcance real: {SITE_LINKS.radioAlcance}.
                        Escucha las entrevistas y conoce los planes de auspicio PYME y Empresa en
                        la página oficial del programa.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={SITE_LINKS.social.Spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#171A17] bg-[#D4A359] hover:bg-[#E3B56C] rounded-sm transition-colors duration-150 whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                          <span>Escuchar en Spotify</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => navigateTo('/radio')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#D4A359] hover:underline cursor-pointer"
                        >
                          <span>Ver planes de auspicio y cómo participar →</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <figure>
                      <div className="relative overflow-hidden rounded-sm border border-[#3D332D] bg-[#29221E] aspect-[16/9] lg:aspect-[4/3]">
                        <ResilientImage
                          src="/images/radio_estudio_femenina_1791226539429.webp"
                          alt="Estudio de radio durante la transmisión del programa Aprende a Emprender en Radio Femenina de Concepción"
                          fallbackTitle="Aprende a Emprender — Radio Femenina"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 text-[#F6F3EC]">
                          <div className="font-tabular text-xs text-[#D4A359] mb-1">
                            LUN · MIÉ · VIE · 18:00 A 19:00 HRS
                          </div>
                          <div className="font-editorial text-lg">
                            Radio Femenina de Concepción · 44 años al aire
                          </div>
                        </div>
                      </div>
                      <figcaption className="mt-2.5 text-xs text-[#A89F94] font-tabular">
                        Fig. 03 — Estudio de transmisión · Concepción
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. CTA DE NEWSLETTER & DIAGNÓSTICO DE 1 MINUTO */}
            <section
              id="diagnostico"
              className="scroll-mt-16 py-16 lg:py-24 bg-[#F2EFE7] border-b border-[#DEDAD0]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  {/* Left Column: 1-Minute Interactive Self-Check (5 cols) */}
                  <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#D8D3C6] rounded-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2 text-xs font-tabular text-[#676A63] pb-3 mb-4 border-b border-[#E5E0D4]">
                      <span>TEST RÁPIDO · 1 MINUTO</span>
                      <span>AUTODIAGNÓSTICO</span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl text-[#171A17] mb-2">
                      Marca las frases que hoy te resulten familiares:
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5D56] mb-5">
                      Descubre en menos de 60 segundos si tu narrativa comercial actual está
                      frenando tus ventas.
                    </p>

                    <div className="space-y-3 mb-6">
                      {QUICK_DIAGNOSTIC_QUESTIONS.map((q) => {
                        const isChecked = !!checkedQuestions[q.id];
                        return (
                          <label
                            key={q.id}
                            className={`flex items-start gap-3 p-3.5 rounded-sm border cursor-pointer transition-colors duration-150 ${
                              isChecked
                                ? 'bg-[#F4ECE9] border-[var(--color-accent)]/50 text-[#171A17]'
                                : 'bg-[#F8F6F1] border-[#DEDAD0] text-[#3E413B] hover:border-[#B5B0A3]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleQuestion(q.id)}
                              className="mt-1 h-4 w-4 accent-[var(--color-accent)] rounded-sm shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                            />
                            <span className="text-xs sm:text-sm leading-relaxed">{q.text}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="p-4 bg-[#EFECE3] border-l-2 border-[var(--color-accent)] text-xs sm:text-sm text-[#2A2D28]">
                      <div className="font-tabular text-xs font-semibold text-[var(--color-accent)] mb-1">
                        RESULTADO PRELIMINAR ({checkedCount}/3 SEÑALES DETECTADAS)
                      </div>
                      {checkedCount === 0 ? (
                        <p>
                          Tienes una base clara. Suscríbete al costado para recibir herramientas
                          avanzadas de narrativa comercial y fechas de próximas cohortes.
                        </p>
                      ) : (
                        <p>
                          Tu servicio tiene valor, pero tu mensaje está centrado en la solución y
                          no en el problema de tu cliente. Recibe la guía de 1 minuto en tu correo.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Main Newsletter CTA "¿Tu mensaje ya vende?" (7 cols) */}
                  <div className="lg:col-span-7 lg:pl-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-3">
                      <span>DIAGNÓSTICO COMERCIAL &amp; NEWSLETTER</span>
                      <span aria-hidden="true">·</span>
                      <span>RECURSO GRATUITO</span>
                    </div>

                    <h2
                      className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] text-[#171A17] leading-[1.1] mb-4"
                      style={{ textWrap: 'balance' }}
                    >
                      ¿Tu mensaje ya vende?
                    </h2>

                    <p className="text-base sm:text-lg text-[#383B36] leading-relaxed max-w-[58ch] mb-6">
                      Recibe en tu correo la guía práctica de{' '}
                      <strong className="text-[#171A17]">La Retina Emprendedora</strong> para
                      evaluar en 1 minuto si tu presentación comercial conecta con el problema de
                      tu cliente ideal, además de novedades de la Escuela de Ventas y episodios de{' '}
                      <em>Aprende a Emprender</em>.
                    </p>

                    {selectedProgram && (
                      <div className="mb-6 p-3.5 bg-[#EBE6DA] border border-[#CCC5B5] rounded-sm flex items-center justify-between gap-3 text-xs sm:text-sm text-[#171A17]">
                        <span>
                          Interés seleccionado: <strong>{selectedProgram}</strong>. Déjanos tu
                          correo para enviarte el detalle y aranceles vigentes.
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedProgram(null)}
                          className="font-tabular text-xs text-[var(--color-accent)] hover:underline shrink-0"
                        >
                          Cambiar
                        </button>
                      </div>
                    )}

                    {!isSubscribed ? (
                      <form
                        onSubmit={handleNewsletterSubmit}
                        noValidate
                        className="bg-[#FBF9F5] border border-[#D4CFC3] rounded-sm p-6 sm:p-8"
                      >
                        <label
                          htmlFor="newsletter-email"
                          className="block text-sm font-semibold text-[#171A17] mb-2"
                        >
                          Tu correo electrónico profesional
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            id="newsletter-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError(null);
                            }}
                            placeholder="nombre@tunegocio.cl"
                            aria-invalid={emailError ? 'true' : 'false'}
                            aria-describedby={emailError ? 'newsletter-error' : 'newsletter-hint'}
                            className={`flex-1 px-4 py-3.5 text-sm sm:text-base bg-white border rounded-sm text-[#171A17] placeholder:text-[#8A8D84] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                              emailError ? 'border-[var(--color-accent)]' : 'border-[#C8C2B4]'
                            }`}
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171A17]"
                          >
                            <span>Suscribirme</span>
                            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                          </button>
                        </div>

                        {emailError ? (
                          <p
                            id="newsletter-error"
                            role="alert"
                            className="mt-3 text-xs sm:text-sm font-medium text-[var(--color-accent)]"
                          >
                            {emailError}
                          </p>
                        ) : (
                          <p id="newsletter-hint" className="mt-3 text-xs text-[#646760]">
                            Sin spam. Recibirás el autodiagnóstico de narrativa comercial y fechas
                            de próximas cohortes en Concepción y online.
                          </p>
                        )}
                      </form>
                    ) : (
                      <div
                        role="status"
                        aria-live="polite"
                        className="bg-[#121A16] text-[#F4F1EA] border border-[#2C3A32] rounded-sm p-6 sm:p-8"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-sm bg-[#D4A359] text-[#121A16] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                          </div>
                          <div className="space-y-2">
                            <div className="font-tabular text-xs text-[#D4A359]">
                              SUSCRIPCIÓN CONFIRMADA
                            </div>
                            <h3 className="font-editorial text-2xl text-[#F4F1EA]">
                              ¡Casi listo, {submittedEmail}!
                            </h3>
                            <p className="text-sm text-[#C4C0B6] leading-relaxed">
                              Se abrió el formulario oficial del diagnóstico de 1 minuto de{' '}
                              <em>La Retina Emprendedora</em> en una pestaña nueva
                              {selectedProgram ? `, cuéntale ahí tu interés en ${selectedProgram}` : ''}.
                              Si no se abrió, revisa que tu navegador no haya bloqueado la ventana.
                            </p>
                            <div className="pt-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsSubscribed(false);
                                  setSubmittedEmail('');
                                }}
                                className="text-xs font-tabular text-[#D4A359] hover:underline focus-visible:outline-2 focus-visible:outline-white"
                              >
                                Ingresar otro correo electrónico
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* 9. FOOTER COMPLETO CON NAVEGACIÓN A TODAS LAS PÁGINAS */}
      <footer className="bg-[#121A16] text-[#D8D4C9] py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#26312B] items-start">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-editorial text-2xl font-semibold text-[#F4F1EA]">GM</span>
                <span aria-hidden="true" className="text-[#56635B]">
                  ·
                </span>
                <span className="font-editorial text-lg text-[#F4F1EA]">
                  Geraldine Manríquez — Aprende a Emprender
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9DA49E] max-w-[40ch] leading-relaxed mb-4">
                Coach de ventas y narrativa comercial para emprendedores, terapeutas, coaches y
                profesionales independientes en Concepción, Biobío, Chile.
              </p>
              <a
                href="mailto:hola@geraldinemanriquez.com"
                className="font-tabular text-xs text-[#D4A359] hover:underline"
              >
                hola@geraldinemanriquez.com
              </a>
            </div>

            {/* Mapa del Sitio */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <div className="font-tabular text-xs text-[#D4A359] mb-3">PÁGINAS</div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {navItems.map((item) => (
                    <li key={item.route}>
                      <a
                        href={item.route}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(item.route);
                        }}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-tabular text-xs text-[#D4A359] mb-3">FICHAS ESCUELA</div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a
                      href="/escuela/diagnostico"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/escuela/diagnostico');
                      }}
                      className="hover:text-white transition-colors"
                    >
                      Diagnóstico Comercial
                    </a>
                  </li>
                  <li>
                    <a
                      href="/escuela/narrativa-comercial"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/escuela/narrativa-comercial');
                      }}
                      className="hover:text-white transition-colors"
                    >
                      Narrativa Comercial
                    </a>
                  </li>
                  <li>
                    <a
                      href="/escuela/vender-sin-vender"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/escuela/vender-sin-vender');
                      }}
                      className="hover:text-white transition-colors"
                    >
                      Vender sin Vender
                    </a>
                  </li>
                  <li>
                    <a
                      href="/escuela/conexiones-que-conectan"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/escuela/conexiones-que-conectan');
                      }}
                      className="hover:text-white transition-colors"
                    >
                      Conexiones que Conectan
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Channels (Exact 6 networks required) */}
            <div className="md:col-span-4">
              <div className="font-tabular text-xs text-[#D4A359] mb-3">
                REDES &amp; CANALES OFICIALES
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
                {(Object.keys(SITE_LINKS.social) as Array<keyof typeof SITE_LINKS.social>).map(
                  (network) => (
                    <a
                      key={network}
                      href={SITE_LINKS.social[network]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3 py-2 bg-[#1A251F] border border-[#2C3A32] hover:border-[#D4A359] text-[#F4F1EA] rounded-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#D4A359]"
                    >
                      <span>{network}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A359]" aria-hidden="true" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9DA49E] font-tabular">
            <div>© Geraldine Manríquez</div>
            <div>Concepción · Región del Biobío, Chile</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
