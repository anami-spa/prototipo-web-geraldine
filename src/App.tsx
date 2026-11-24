import { SocialLinks } from './components/SocialLinks';
import { GeraldineLogo } from './components/BrandLogo';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  ChevronDown,
  ChevronUp,
  Menu,
  Play,
  Radio,
  X,
} from 'lucide-react';
import { EscuelaCatalogPage } from './components/EscuelaCatalogPage';
import { photo } from './data/photos';
import { RadioPage } from './components/RadioPage';
import { RadioSponsorLandingPage } from './components/RadioSponsorLandingPage';
import { ResilientImage } from './components/ResilientImage';
import { ServiceDetailTemplate } from './components/ServiceDetailTemplate';
import { SobreMiPage } from './components/SobreMiPage';
import { BlogPage, ContactoPage, SpeakerPage } from './components/SpeakerBlogContactoPages';
import { HeroSlider } from './components/HeroCarousel';
import { FloatingActions } from './components/FloatingActions';
import { AvisoPrioritario } from './components/AvisoPrioritario';
import { BookPage } from './components/BookPage';
import { LegalPage } from './components/LegalPage';
import { ESCUELA_CARDS, RoutePath, SERVICE_DETAILS, SITE_CONFIG, SITE_LINKS } from './data/siteContent';
import { latestPosts } from './data/blogPosts';
import { withBase, stripBase } from './lib/base';

const MARQUEE_ITEMS = [
  'Venta humanizada y networking',
  'Retina Emprendedora',
  '+1.000 Emprendedores',
  'Chile y Latam',
  '12 años de trayectoria',
];

/**
 * Lo que le dicen a Geraldine (texto de su sitio actual, pantallazo que entregó en la revisión de nov-2026).
 * Correcciones mínimas pendientes de su aprobación: «pasó, compró» (decía «pasó compro») y «Quiero» (decía «Quiere»).
 * Falta el 4.º punto («Me da pudor salir a vender y…»): quedó cortado en la captura; no se completa por ella.
 */
const MISION_DICHOS = [
  'Me interesa recuperar al cliente que pasó, compró y volvió más.',
  'Quiero mejorar el rango de mis ventas.',
  'Quiero tener más clientes.',
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
  '/radio/auspicio-pyme',
  '/radio/auspicio-empresa',
  '/speaker',
  '/blog',
  '/libro',
  '/privacidad',
  '/terminos',
  '/contacto',
];

/**
 * Cartas de venta (landing pages): sin menú, sin footer y sin elementos flotantes, solo la llamada a la acción.
 * Los precios viven únicamente aquí (pedido de Geraldine, reunión del 29-oct-2026).
 */
const LANDING_ROUTES: RoutePath[] = [
  '/escuela/diagnostico',
  '/escuela/narrativa-comercial',
  '/escuela/vender-sin-vender',
  '/escuela/conexiones-que-conectan',
  '/radio/auspicio-pyme',
  '/radio/auspicio-empresa',
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
    typeof window !== 'undefined' ? normalizePath(stripBase(window.location.pathname)) : '/'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bandaPausada, setBandaPausada] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const previousRouteRef = useRef(activeRoute);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  // One presentation direction, including links with the old ?tema=b parameter.
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', 'a');
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(normalizePath(stripBase(window.location.pathname)));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const titles: Record<RoutePath, string> = {
      '/': 'Inicio',
      '/sobre-mi': 'Sobre Geraldine',
      '/escuela': 'Escuela de Ventas',
      '/escuela/diagnostico': 'Sesión Diagnóstica',
      '/escuela/narrativa-comercial': 'Narrativa Comercial',
      '/escuela/vender-sin-vender': 'Vender sin Vender',
      '/escuela/conexiones-que-conectan': 'Conexiones que Conectan',
      '/radio': 'Radio',
      '/radio/auspicio-pyme': 'Auspicio radial PyME',
      '/radio/auspicio-empresa': 'Auspicio radial Empresa',
      '/speaker': 'Speaker',
      '/blog': 'Blog',
      '/libro': 'Libro',
      '/privacidad': 'Política de privacidad',
      '/terminos': 'Términos y condiciones',
      '/contacto': 'Contacto',
    };
    document.title = `${titles[activeRoute]} | Geraldine Manríquez — Aprende a Emprender`;

    if (previousRouteRef.current !== activeRoute) {
      window.requestAnimationFrame(() => {
        const heading = mainRef.current?.querySelector<HTMLElement>('h1');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus();
        } else {
          mainRef.current?.focus();
        }
      });
    }
    previousRouteRef.current = activeRoute;
  }, [activeRoute]);

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
    // Las cartas de venta se abren en una pestaña aparte para no perder la página de origen (configurable en SITE_CONFIG).
    // Desde otra carta (p. ej. el botón de la ventana emergente no aplica) se navega normal.
    if (SITE_CONFIG.abrirCartasEnPestanaNueva && LANDING_ROUTES.includes(route) && !LANDING_ROUTES.includes(activeRoute)) {
      window.open(withBase(route), '_blank', 'noopener');
      return;
    }
    if (programContext) {
      setSelectedProgram(programContext);
    }

    if (typeof window !== 'undefined' && stripBase(window.location.pathname) !== route) {
      window.history.pushState({}, '', withBase(route));
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

  const isLanding = LANDING_ROUTES.includes(activeRoute);

  const navItems: { label: string; route: RoutePath; matchPrefix?: string }[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Escuela', route: '/escuela', matchPrefix: '/escuela' },
    { label: 'Radio', route: '/radio' },
    { label: 'Speaker', route: '/speaker' },
    { label: 'Blog', route: '/blog' },
    { label: 'Sobre Mí', route: '/sobre-mi' },
    { label: 'Libro', route: '/libro' },
    { label: 'Contacto', route: '/contacto' },
  ];

  const isNavActive = (item: { route: RoutePath; matchPrefix?: string }) => {
    if (item.matchPrefix) {
      return activeRoute.startsWith(item.matchPrefix);
    }
    return activeRoute === item.route;
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[#171A17] flex flex-col">
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      {/* 1. HEADER FIJO (Strict 3-Zone Top Bar Contract) */}
      <header className={`${isLanding ? 'hidden' : 'fixed'} top-0 inset-x-0 z-50 h-16 bg-[var(--color-paper)]/95 backdrop-blur-md border-b border-[#DEDAD0]`}>
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title (Single text element wordmark) */}
          <a
            href={withBase("/")}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            aria-label="Geraldine Manríquez — Volver al inicio"
            className="inline-flex min-h-11 shrink-0 items-center font-editorial text-2xl font-semibold tracking-tight text-[#171A17] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
          >
            <GeraldineLogo />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden xl:flex items-center gap-4 text-sm font-medium text-[#464944]"
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
              href={withBase("/escuela")}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/escuela');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171A17]"
            >
              <span>Encuentra tu programa</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>

            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 text-[#171A17] hover:bg-[#EBE7DD] rounded-sm transition-colors duration-150"
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
            className="xl:hidden bg-[var(--color-paper)] border-b border-[#DEDAD0] px-4 pt-3 pb-5 shadow-lg"
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
                  className={`min-h-11 flex items-center py-2 border-b border-[#EAE6DC] ${
                      active ? 'text-[var(--color-accent)] font-semibold' : 'text-[#171A17]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href={withBase("/escuela")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/escuela');
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm whitespace-nowrap"
              >
                <span>Encuentra tu programa</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1} className={`flex-1 focus:outline-none ${isLanding ? '' : 'pt-16'}`}>
        {/* ROUTE SWITCHER */}
        {activeRoute === '/sobre-mi' && <SobreMiPage onNavigate={navigateTo} />}

        {activeRoute === '/escuela' && <EscuelaCatalogPage onNavigate={navigateTo} />}

        {(activeRoute === '/escuela/diagnostico' ||
          activeRoute === '/escuela/narrativa-comercial' ||
          activeRoute === '/escuela/vender-sin-vender' ||
          activeRoute === '/escuela/conexiones-que-conectan') && (
          <ServiceDetailTemplate service={SERVICE_DETAILS[activeRoute]} />
        )}

        {activeRoute === '/radio' && <RadioPage onNavigate={navigateTo} />}
        {activeRoute === '/radio/auspicio-pyme' && <RadioSponsorLandingPage audience="pyme" />}
        {activeRoute === '/radio/auspicio-empresa' && <RadioSponsorLandingPage audience="empresa" />}

        {activeRoute === '/speaker' && <SpeakerPage onNavigate={navigateTo} />}

        {activeRoute === '/blog' && <BlogPage />}

        {activeRoute === '/libro' && <BookPage />}

        {activeRoute === '/privacidad' && <LegalPage kind="privacidad" />}

        {activeRoute === '/terminos' && <LegalPage kind="terminos" />}

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
                <HeroSlider onNavigate={navigateTo} />
              </div>
            </section>

            {/* 3. FRANJA / MARQUEE CON PALABRAS CLAVE EN LOOP: bajo el hero (Cristian, 24-nov: arriba no se ve bien) */}
            <section
              aria-label="Trayectoria y credenciales clave"
              className="relative bg-[var(--color-accent-fill)] text-[#171A17] py-4 border-b border-[#CDB56A] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setBandaPausada((p) => !p)}
                aria-pressed={bandaPausada}
                aria-label="Pausar el movimiento de la banda"
                className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent-fill)] shadow-md hover:brightness-95 motion-reduce:hidden"
              >
                {bandaPausada ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                className="animate-marquee-loop flex items-center motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2"
                style={{ animationPlayState: bandaPausada ? 'paused' : 'running' }}
              >
                {[0, 1, 2, 3].map((repeatIndex) => (
                  <div
                    key={repeatIndex}
                    className={`flex items-center shrink-0 ${repeatIndex > 0 ? 'motion-reduce:hidden' : 'motion-reduce:flex-wrap motion-reduce:justify-center'}`}
                    aria-hidden={repeatIndex > 0 ? 'true' : undefined}
                  >
                    {MARQUEE_ITEMS.map((item, itemIdx) => (
                      <React.Fragment key={`${repeatIndex}-${itemIdx}`}>
                        <span className="px-5 sm:px-7 text-sm sm:text-base font-editorial tracking-wide whitespace-nowrap text-[#171A17]">
                          {item}
                        </span>
                        <span className="text-[#171A17]/60 select-none" aria-hidden="true">
                          ·
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* MISIÓN: va debajo del carrusel (pedido de Geraldine, nov-2026). Texto suyo; el diseño es de ANAMI. */}
            <section
              aria-labelledby="mision-title"
              className="py-16 lg:py-24 border-b border-[#26312B] bg-[var(--color-night)] text-[#F4F1EA]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <h2
                  id="mision-title"
                  className="lg:col-span-7 font-editorial text-3xl sm:text-4xl lg:text-5xl leading-[1.15] italic before:mb-6 before:block before:h-1 before:w-16 before:bg-[var(--color-accent-fill)] before:content-['']"
                  style={{ textWrap: 'balance' }}
                >
                  Mi misión es ayudarte a destrabar tu negocio, estructurar tus ideas y dominar una
                  narrativa comercial que atraiga a tu cliente ideal de forma natural.
                </h2>
                <div className="lg:col-span-5 rounded-sm border border-[#2C3A32] bg-[var(--color-night-raised)] p-6 sm:p-8">
                  <p className="text-base sm:text-lg leading-relaxed text-[#C4C0B6]">
                    De hecho, la mayoría de los profesionales, coaches, terapeutas y emprendedores
                    que me contactan me dicen:
                  </p>
                  <ul className="mt-6 space-y-4">
                    {MISION_DICHOS.map((dicho) => (
                      <li key={dicho} className="flex items-start gap-3 text-lg font-semibold leading-snug">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-fill)] text-[#171A17]">
                          <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                        </span>
                        <span>{dicho}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. SECCIÓN "LA RETINA EMPRENDEDORA" */}
            <section
              id="sobre-mi"
              className="scroll-mt-16 py-16 lg:py-24 border-b border-[#DEDAD0] bg-[var(--color-paper)]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#DEDAD0]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#5A5D56]">
                    <span className="font-tabular text-[var(--color-accent)] font-semibold">MÉTODO PROPIO</span>
                    <span aria-hidden="true">·</span>
                    <span>La Retina Emprendedora</span>
                    <span aria-hidden="true">·</span>
                    <span>12 años de trayectoria</span>
                  </div>
                  <div className="font-tabular text-xs text-[#5A5D56]">
                    Personas emprendedoras / Terapeutas / Coaches / Profesionales Independientes / Instituciones
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column: Photo + Editorial Caption (5 cols) */}
                  <div className="lg:col-span-5">
                    <figure>
                      <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/3]">
                        <ResilientImage
                          {...photo('home-retina-sesion')}
                          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
                          loading="lazy"
                          decoding="async"
                          fallbackTitle="Geraldine Manríquez"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </figure>

                    <dl className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-[#DEDAD0]">
                      <div>
                        <dt className="text-[13px] text-[#5A5D56] mb-1">Profesionales formados</dt>
                        <dd className="font-tabular text-2xl sm:text-3xl font-semibold text-[#171A17]">
                          +1.000
                        </dd>
                        <span className="text-sm text-[#5A5D56]">Emprendedores y consultores</span>
                      </div>
                      <div>
                        <dt className="text-[13px] text-[#5A5D56] mb-1">Experiencia docente</dt>
                        <dd className="font-tabular text-2xl sm:text-3xl font-semibold text-[#171A17]">
                          12 años
                        </dd>
                        <span className="text-sm text-[#5A5D56]">
                          En Chile y Latam
                        </span>
                      </div>
                    </dl>
                  </div>

                  {/* Right Column: Anchor Quote + Brief Method Explanation + CTA (7 cols) */}
                  <div className="lg:col-span-7">
                    <blockquote className="mb-8">
                      <h2
                        className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] italic text-[#171A17]"
                        style={{ textWrap: 'balance' }}
                      >
                        “No le hables solo cuando le quieras vender.”
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
                        href={withBase("/sobre-mi")}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/sobre-mi');
                        }}
                        className="inline-flex items-center gap-3 px-5 py-3 text-sm sm:text-base font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors duration-150 whitespace-nowrap"
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
                    <h2
                      className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] tracking-[0.01em]"
                      style={{ textWrap: 'balance' }}
                    >
                      ¿Cómo trabajo?
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#C4C0B6] max-w-[54ch] leading-relaxed tracking-[0.01em]">
                    Dos rutas diseñadas según el momento actual de tu negocio: desde estructurar tu
                    discurso comercial en la Escuela hasta entrenar equipos corporativos.
                  </p>
                </div>

                {/* 2 Columns Grid — la 3ª columna (Mentoría 1 a 1 de pago) se retiró:
                    su sitio real ofrece "Mentorías gratuitas" en CIDERE, Etmday,
                    Rediversas y Openbeauchef, no un servicio pagado. Pendiente de
                    confirmar con la pregunta 7 del brief de WhatsApp (ver T2.4) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* COLUMNA 01: ESCUELA DE VENTAS */}
                  <article className="flex flex-col justify-between overflow-hidden bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8">
                    <div>
                      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 aspect-[16/9] overflow-hidden border-b border-[#2C3A32] bg-[#121A16]">
                        <ResilientImage
                          {...photo('home-card-escuela')}
                          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 92vw"
                          loading="lazy"
                          decoding="async"
                          fallbackTitle="Escuela de Ventas"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#2C3A32]">
                        <span className="font-tabular text-xs text-[var(--color-accent-fill)]">
                          FORMACIÓN APLICADA
                        </span>
                        <span className="font-tabular text-xs text-[#9BA39D]">
                          Pago online con Flow
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-3 tracking-[0.01em]">
                        Escuela de Ventas
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
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[var(--color-accent-fill)] text-left transition-colors cursor-pointer"
                            >
                              Sesión Diagnóstica →
                            </button>
                          </div>
                          <p className="text-sm text-[#B6B2A8] mb-2 leading-relaxed">
                            Revisión estratégica de 60 min para detectar dónde se traba hoy tu
                            discurso o tu oferta.
                          </p>
                        </div>

                        {/* Item 2: Narrativa Comercial */}
                        <div className="pb-5 border-b border-[#26332B]">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/narrativa-comercial')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[var(--color-accent-fill)] text-left transition-colors cursor-pointer"
                            >
                              Narrativa Comercial →
                            </button>
                          </div>
                          <p className="text-sm text-[#B6B2A8] mb-1.5 leading-relaxed">
                            Sesión estratégica + guion listo para usar + 7 días WhatsApp SOS.
                          </p>
                        </div>

                        {/* Item 3: Vender sin Vender */}
                        <div>
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/escuela/vender-sin-vender')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[var(--color-accent-fill)] text-left transition-colors cursor-pointer"
                            >
                              Vender sin Vender →
                            </button>
                          </div>
                          <p className="text-sm text-[#B6B2A8] mb-2 leading-relaxed">
                            Curso grupal intensivo + 30 días de acompañamiento por WhatsApp.
                          </p>
                          <p className="font-tabular text-xs text-[#E6E2D8]">Próxima cohorte: fecha por confirmar</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#2C3A32]">
                      <button
                        type="button"
                        onClick={() => navigateTo('/escuela')}
                        className="w-full inline-flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#121A16] bg-[var(--color-accent-fill)] hover:bg-[#E2B46B] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <span>Ver catálogo completo de la Escuela</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </article>

                  {/* COLUMNA 02: SPEAKER & EVENTOS */}
                  <article
                    id="speaker"
                    className="scroll-mt-20 flex flex-col justify-between overflow-hidden bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8"
                  >
                    <div>
                      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 aspect-[16/9] overflow-hidden border-b border-[#2C3A32] bg-[#121A16]">
                        <ResilientImage
                          {...photo('home-card-speaker')}
                          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 92vw"
                          loading="lazy"
                          decoding="async"
                          fallbackTitle="Speaker y Eventos"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#2C3A32]">
                        <span className="font-tabular text-xs text-[var(--color-accent-fill)]">
                          EMPRESAS &amp; ECOSISTEMA
                        </span>
                        <span className="font-tabular text-xs text-[#9BA39D]">
                          Chile y Latam
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-3 tracking-[0.01em]">
                        Speaker &amp; Eventos
                      </h3>
                      <p className="text-sm text-[#C4C0B6] leading-relaxed mb-6 tracking-[0.01em]">
                        Instancias presenciales de formación corporativa y articulación de redes de
                        negocios.
                      </p>

                      <div className="space-y-5 border-t border-[#2C3A32] pt-5">
                        {/* Sub-item 1: Relatorías y Conferencias */}
                        <div className="pb-5 border-b border-[#26332B]">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <button
                              type="button"
                              onClick={() => navigateTo('/speaker')}
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[var(--color-accent-fill)] text-left transition-colors cursor-pointer"
                            >
                              Relatorías y Conferencias →
                            </button>
                          </div>
                          <p className="text-sm text-[#B6B2A8] mb-2 leading-relaxed">
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
                              className="font-semibold text-base text-[#F4F1EA] hover:text-[var(--color-accent-fill)] text-left transition-colors cursor-pointer"
                            >
                              Conexiones que Conectan →
                            </button>
                          </div>
                          <p className="text-sm text-[#B6B2A8] mb-2 leading-relaxed">
                            Taller de Networking presencial en Concepción. Revisa los detalles en su ficha.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#2C3A32] flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => navigateTo('/speaker')}
                        className="w-full inline-flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#F4F1EA] bg-transparent border border-[#495A4F] hover:border-[var(--color-accent-fill)] hover:text-[var(--color-accent-fill)] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
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
              className="py-16 lg:py-24 bg-[var(--color-paper)] border-b border-[#DEDAD0]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-[#DEDAD0]">
                  <div>
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
                      className="flex flex-col justify-between bg-[var(--color-surface)] border border-[#DCD7CA] rounded-sm p-6 sm:p-8"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-tabular text-[#676A63] pb-4 mb-6 border-b border-[#E6E2D6]">
                          <span className="whitespace-nowrap">Caso 0{index + 1}</span>
                          <span>{item.shift}</span>
                        </div>

                        <blockquote className="mb-8">
                          {/* Cita larga en la fuente de texto: en versalitas (fuente de títulos) un párrafo de 8 a 10 líneas no se lee. */}
                          <p className="text-base sm:text-[1.0625rem] text-[#232620] leading-[1.7]">
                            “{item.quote}”
                          </p>
                        </blockquote>
                      </div>

                      <footer className="pt-4 border-t border-[#E6E2D6]">
                        <div className="font-semibold text-base text-[#171A17]">{item.name}</div>
                        <div className="text-sm text-[#5A5D56] mt-0.5">{item.role}</div>
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
                    <Radio className="w-4 h-4 text-[var(--color-accent-fill)]" aria-hidden="true" />
                    <span className="text-[#F6F3EC] font-semibold">EN EL AIRE</span>
                    <span aria-hidden="true">·</span>
                    <span>Radio Femenina de Concepción (44 años al aire)</span>
                  </div>
                  <div>
                    <span>Lunes - Miércoles - Viernes</span>
                    <span aria-hidden="true"> · </span>
                    <span className="text-[var(--color-accent-fill)] font-semibold">18:00 a 19:00 hrs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div className="lg:col-span-7">
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

                    <div className="p-5 bg-[#29221E] border-l-2 border-[var(--color-accent-fill)] mb-8">
                      <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-1">
                        IMPACTO Y ALTA DEMANDA EN LA REGIÓN
                      </div>
                      <p className="font-editorial text-xl sm:text-2xl text-[#F6F3EC]">
                        +150 invitados entrevistados, hoy con 2 meses de lista de espera.
                      </p>
                    </div>

                    <div className="bg-[#26201C] border border-[#3D332D] rounded-sm p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tabular text-[#C9B9A6] pb-3 mb-3 border-b border-[#382F29]">
                        <span>EN VIVO</span>
                        <span className="text-[var(--color-accent-fill)]">{SITE_LINKS.radioEmisora}</span>
                      </div>

                      <p className="max-w-[56ch] text-sm text-[#BFB7AC] mb-5 leading-relaxed">
                        {SITE_LINKS.radioInvitados}. Alcance real: {SITE_LINKS.radioAlcance}.
                        Escucha las entrevistas y conoce los planes de auspicio PYME y Empresa en
                        la página oficial del programa.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={SITE_LINKS.radioYouTubePlaylist}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#171A17] bg-[var(--color-accent-fill)] hover:bg-[#E3B56C] rounded-sm transition-colors duration-150 whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                          <span>Ver capítulos en YouTube</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => navigateTo('/radio')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--color-accent-fill)] hover:underline cursor-pointer"
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
                          {...photo('home-radio')}
                          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
                          loading="lazy"
                          decoding="async"
                          fallbackTitle="Radio Femenina de Concepción"
                          className="w-full h-full object-cover"
                        />
                        {/* Capa ≥75 % de #171A17 detrás del texto: sostiene 4,5:1 (también el dorado) sobre cualquier foto. */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171A17]/92 via-[#171A17]/80 via-60% to-transparent px-5 pb-5 pt-16 text-[#F6F3EC]">
                          <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-1">
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

            {/* 8. BLOG + AUTODIAGNÓSTICO */}
            <section aria-labelledby="blog-home-title" className="py-16 lg:py-20 bg-[var(--color-paper)] border-b border-[var(--color-border)]">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
                  <div>
                    <h2 id="blog-home-title" className="font-editorial text-3xl sm:text-4xl text-[var(--color-ink)]">Del blog</h2></div>
                  <button type="button" onClick={() => navigateTo('/blog')} className="min-h-11 text-sm font-semibold text-[var(--color-accent-strong)] hover:underline">Ver todos los artículos →</button>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {latestPosts(3).map((post) => <article key={post.slug} className="p-5 sm:p-6 border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <p className="font-tabular text-xs text-[var(--color-muted)] mb-3">{new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium' }).format(new Date(post.date))}</p>
                    <h3 className="font-editorial text-xl text-[var(--color-ink)] leading-snug mb-3">{post.title}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-5">{post.excerpt}</p>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-accent-strong)] hover:underline">Leer artículo <ArrowUpRight className="ml-1 w-4 h-4" aria-hidden="true" /></a>
                  </article>)}
                </div>
              </div>
            </section>

            {/* Antes: test rápido con puntaje. Se retiró (sin aporte, y el resultado era un texto inventado); las tres frases quedan como texto fijo. */}
            <section
              id="diagnostico"
              aria-labelledby="escuchar-title"
              className="scroll-mt-16 py-16 lg:py-24 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-6">
                  <h2
                    id="escuchar-title"
                    className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-[1.08] mb-6"
                  >
                    Vender empieza por escuchar.
                  </h2>
                  <p className="text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-[52ch] mb-8">
                    Explora los programas de la Escuela o conversemos sobre el desafío que estás viviendo.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => navigateTo('/escuela')}
                      className="inline-flex min-h-11 items-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] rounded-sm hover:brightness-95 cursor-pointer">
                      Conocer la Escuela <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => navigateTo('/contacto')}
                      className="inline-flex min-h-11 items-center px-5 py-3 text-sm font-semibold text-[var(--color-ink)] border border-[var(--color-border)] rounded-sm hover:bg-[var(--color-surface)] cursor-pointer">
                      Contactar a Geraldine
                    </button>
                  </div>
                </div>

                {/* Las tres frases de Geraldine, sin casillas ni puntaje. */}
                <div className="lg:col-span-6">
                  <p className="text-sm font-semibold text-[var(--color-accent-strong)] mb-4">¿Te suena alguna de estas frases?</p>
                  <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                    {QUICK_DIAGNOSTIC_QUESTIONS.map((q) => (
                      <li key={q.id} className="py-5 font-editorial text-lg sm:text-xl italic leading-snug text-[var(--color-ink)]">
                        “{q.text}”
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* 9. FOOTER COMPLETO CON NAVEGACIÓN A TODAS LAS PÁGINAS */}
      <footer className={`${isLanding ? 'hidden' : ''} bg-[#121A16] text-[#D8D4C9] py-12 lg:py-16`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#26312B] items-start">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <a href={withBase("/")} onClick={(event) => { event.preventDefault(); navigateTo('/'); }} aria-label="Geraldine Manríquez — Volver al inicio" className="inline-flex min-h-11 bg-[var(--color-paper)] p-3 mb-4 rounded-sm">
                <GeraldineLogo />
              </a>
              <p className="text-xs sm:text-sm text-[#9DA49E] max-w-[40ch] leading-relaxed mb-4">
                Coach de ventas y narrativa comercial para emprendedores, terapeutas, coaches y
                profesionales independientes.
              </p>
              <a
                href="mailto:hola@geraldinemanriquez.com"
                className="font-tabular text-xs text-[var(--color-accent-fill)] hover:underline"
              >
                hola@geraldinemanriquez.com
              </a>
            </div>

            {/* Mapa del Sitio */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-3">PÁGINAS</div>
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
                <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-3">FICHAS ESCUELA</div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a
                      href={withBase("/escuela/diagnostico")}
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
                      href={withBase("/escuela/narrativa-comercial")}
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
                      href={withBase("/escuela/vender-sin-vender")}
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
                      href={withBase("/escuela/conexiones-que-conectan")}
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
              <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-3">
                REDES &amp; CANALES OFICIALES
              </div>
              <SocialLinks variant="footer" />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9DA49E] font-tabular">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>© Geraldine Manríquez</span>
              <a href={withBase("/privacidad")} onClick={(e) => { e.preventDefault(); navigateTo('/privacidad'); }} className="hover:text-white">Privacidad</a>
              <a href={withBase("/terminos")} onClick={(e) => { e.preventDefault(); navigateTo('/terminos'); }} className="hover:text-white">Términos</a>
            </div>
            <div className="flex items-center gap-4"><span>Chile y Latam</span><a href="https://anami.cl" target="_blank" rel="noopener noreferrer" className="hover:text-white">Sitio por ANAMI</a></div>
          </div>
        </div>
      </footer>

      {/* Flotantes y ventana emergente: no se montan en las cartas de venta ni en las páginas legales. */}
      {!isLanding && <FloatingActions />}
      <AvisoPrioritario
        enabled={!isLanding && !mobileMenuOpen && activeRoute !== '/privacidad' && activeRoute !== '/terminos'}
        onNavigate={navigateTo}
      />
    </div>
  );
}
