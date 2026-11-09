import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState, type KeyboardEvent } from 'react';
import { HERO_SLIDES, RoutePath } from '../data/siteContent';
import { photo } from '../data/photos';
import { ResilientImage } from './ResilientImage';

interface HeroSliderProps {
  onNavigate: (route: RoutePath, anchorId?: string) => void;
}

/**
 * Hero del Home: carrusel de 3 mensajes, cada uno con su foto.
 *
 * Escritorio (lg+): texto a la izquierda, foto a la derecha, controles bajo el texto.
 * Móvil/tablet (<lg): la foto va PRIMERO, con las flechas a los lados y la numeración abajo
 * sobre la foto; el texto queda compacto debajo (botón principal antes que el subtítulo).
 * El estado vive aquí para que el texto, la foto y los dos juegos de controles estén siempre sincronizados.
 */
export function HeroSlider({ onNavigate }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reducedMotion.matches || document.hidden) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % HERO_SLIDES.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showSlide = (index: number) => {
    const nextIndex = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    setActiveIndex(nextIndex);
    setAnnouncement(
      `Mensaje ${nextIndex + 1} de ${HERO_SLIDES.length}: ${HERO_SLIDES[nextIndex].title} ${HERO_SLIDES[nextIndex].emphasis}`
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
  };

  const activate = (route: RoutePath | '#diagnostico') => {
    if (route === '#diagnostico') onNavigate('/', 'diagnostico');
    else onNavigate(route);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Mensajes destacados de Geraldine"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
    >
      {/* Foto: primera en móvil, a la derecha en escritorio */}
      <div className="lg:order-2 lg:col-span-5">
        <HeroFigure activeIndex={activeIndex} onShow={showSlide} />
      </div>

      {/* Texto */}
      <div className="lg:order-1 lg:col-span-7 flex w-full flex-col items-start lg:min-h-[500px]">
        {/* Las 3 diapositivas de texto se apilan en la MISMA celda: el contenedor mide siempre lo que la más alta,
            así el hero no cambia de alto (ni empuja la página) al cambiar de mensaje, en móvil y en escritorio.
            Las inactivas van `invisible`: fuera del árbol de accesibilidad y sin foco. */}
        <div className="grid w-full flex-1">
          {HERO_SLIDES.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`Mensaje ${index + 1} de ${HERO_SLIDES.length}`}
                aria-hidden={isActive ? undefined : true}
                className={`col-start-1 row-start-1 flex w-full flex-col ${isActive ? '' : 'invisible'}`}
              >
                <div className="order-1 mb-3 sm:mb-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#5A5D56]">
                  <span className="text-[var(--color-accent)] font-semibold">{item.kicker}</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">Geraldine Manríquez</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">Concepción, Chile</span>
                </div>

                <h1
                  className="order-2 font-editorial text-[1.7rem] sm:text-5xl lg:text-[3.5rem] leading-[1.1] sm:leading-[1.08] tracking-tight text-[var(--color-ink)] mb-5 sm:mb-6"
                  style={{ textWrap: 'balance' }}
                >
                  {item.title}{' '}
                  <span className="italic font-normal text-[var(--color-accent)]">{item.emphasis}</span>
                </h1>

                {/* Móvil: el botón principal va antes que el subtítulo, para que entre en la primera pantalla. */}
                <div className="order-3 lg:order-4 flex w-full flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-3 sm:w-auto lg:mt-auto">
                  <a
                    href={item.primaryCta.route === '#diagnostico' ? '/#diagnostico' : item.primaryCta.route}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                      event.preventDefault();
                      activate(item.primaryCta.route);
                    }}
                    className="inline-flex min-h-12 sm:min-h-11 items-center justify-center gap-3 px-6 py-3 text-sm sm:text-base font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors whitespace-nowrap"
                  >
                    <span>{item.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                  {item.secondaryCta && (
                    <a
                      href={item.secondaryCta.route}
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        event.preventDefault();
                        activate(item.secondaryCta!.route);
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-[var(--color-ink)] bg-transparent border border-transparent underline underline-offset-4 decoration-[#9A9B94] hover:bg-[#ECE8DF] sm:border-[#9A9B94] sm:no-underline rounded-sm transition-colors whitespace-nowrap"
                    >
                      {item.secondaryCta.label}
                    </a>
                  )}
                </div>

                <p className="order-4 lg:order-3 mt-5 lg:mt-0 mb-0 lg:mb-8 max-w-[62ch] border-l-2 border-[var(--color-accent)] pl-5 text-base sm:text-lg lg:text-xl text-[#383B36] leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Escritorio: controles bajo el texto. En móvil van sobre la foto (ver HeroFigure). */}
        {HERO_SLIDES.length > 1 && (
          <div className="mt-6 hidden w-full items-center justify-between gap-2 lg:flex" aria-label="Controles del carrusel">
            <button
              type="button"
              onClick={() => showSlide(activeIndex - 1)}
              aria-label="Mensaje anterior"
              className="inline-flex w-11 h-11 items-center justify-center border border-[#9A9B94] rounded-sm hover:bg-[#ECE8DF]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" aria-label="Seleccionar mensaje">
              {HERO_SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Mostrar mensaje ${index + 1} de ${HERO_SLIDES.length}`}
                  aria-pressed={activeIndex === index}
                  className={`min-w-11 min-h-11 px-3 rounded-sm border text-xs font-tabular ${
                    activeIndex === index
                      ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                      : 'border-[#9A9B94] hover:bg-[#ECE8DF]'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => showSlide(activeIndex + 1)}
              aria-label="Mensaje siguiente"
              className="inline-flex w-11 h-11 items-center justify-center border border-[#9A9B94] rounded-sm hover:bg-[#ECE8DF]"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
    </div>
  );
}

/**
 * Foto del carrusel, sincronizada con el texto (`activeIndex`).
 * - Apila las fotos y muestra solo la activa; las inactivas quedan fuera del árbol de accesibilidad.
 * - Slide 1: carga inmediata y prioritaria (es el LCP). Slides 2 y 3 se montan tras cargar la primera
 *   (o al llegar a ellas), para no competir con ella.
 * - El fundido es `motion-safe`: con movimiento reducido el cambio es instantáneo.
 * - Móvil: foto limpia (sin cita ni pie) con flechas laterales y numeración abajo, ambas de 44 px.
 *   Alto fijo 46 svh y ancho completo: la foto ocupa casi la mitad de la pantalla visible y deja espacio al título
 *   y al botón (con `aspect-ratio` + `max-height` el ancho también se recortaría).
 */
function HeroFigure({ activeIndex, onShow }: { activeIndex: number; onShow: (index: number) => void }) {
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [seen, setSeen] = useState<number[]>([0]);
  const active = HERO_SLIDES[activeIndex];

  useEffect(() => {
    setSeen((current) => (current.includes(activeIndex) ? current : [...current, activeIndex]));
  }, [activeIndex]);

  const overlayButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[#171A17]/75 text-white ring-1 ring-white/40 hover:bg-[#171A17]/90';

  return (
    <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] h-[46svh] lg:h-auto lg:aspect-[3/4]">
        {HERO_SLIDES.map((slide, index) => {
          if (index !== 0 && !firstLoaded && !seen.includes(index)) return null;
          const p = photo(slide.image.photo);
          const isActive = index === activeIndex;
          return (
            <ResilientImage
              key={slide.id}
              src={p.src}
              srcSet={p.srcSet}
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
              width={p.width}
              height={p.height}
              alt={isActive ? p.alt : ''}
              aria-hidden={isActive ? undefined : true}
              fallbackTitle="Geraldine Manríquez"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={index === 0 ? () => setFirstLoaded(true) : undefined}
              style={p.style}
              className={`absolute inset-0 h-full w-full ${
                slide.image.fit === 'contain' ? 'object-contain' : 'object-cover'
              } motion-safe:transition-opacity motion-safe:duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            />
          );
        })}

        {/* Escritorio: capa oscura bajo el texto: ≥75 % de #171A17 donde hay letras, para sostener 4,5:1 sobre cualquier foto. */}
        <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[#171A17]/92 via-[#171A17]/80 via-60% to-transparent px-6 pb-6 pt-16 text-[var(--color-paper)] lg:block">
          <p className="font-editorial text-xl italic leading-snug">{active.image.quote}</p>
        </div>

        {/* Móvil/tablet: controles sobre la foto (flechas a los lados, numeración abajo) */}
        {HERO_SLIDES.length > 1 && (
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => onShow(activeIndex - 1)}
              aria-label="Mensaje anterior"
              className={`${overlayButton} absolute left-2 top-1/2 -translate-y-1/2`}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onShow(activeIndex + 1)}
              aria-label="Mensaje siguiente"
              className={`${overlayButton} absolute right-2 top-1/2 -translate-y-1/2`}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2" aria-label="Seleccionar mensaje">
              {HERO_SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onShow(index)}
                  aria-label={`Mostrar mensaje ${index + 1} de ${HERO_SLIDES.length}`}
                  aria-pressed={activeIndex === index}
                  className={`min-h-11 min-w-11 rounded-sm text-sm font-tabular text-white ring-1 ring-white/40 ${
                    activeIndex === index
                      ? 'bg-[var(--color-accent)] font-semibold'
                      : 'bg-[#171A17]/75 hover:bg-[#171A17]/90'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 hidden text-xs text-[#5E615B] font-tabular lg:block">{active.image.caption}</figcaption>
    </figure>
  );
}
