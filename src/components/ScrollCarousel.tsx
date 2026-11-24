import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollCarouselProps {
  /** Nombre accesible del carrusel (se lee junto a «carrusel»). */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Carrusel horizontal con scroll-snap. Sin dependencias ni autoplay: se mueve con los botones,
 * con el dedo/rueda o con las flechas del teclado (la región es enfocable). Respeta movimiento reducido.
 */
export function ScrollCarousel({ label, children, className = '' }: ScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const items = Children.toArray(children);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      observer.disconnect();
    };
  }, [updateEdges, items.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };

  const buttonClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className={className}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${items.length}`}
            className="shrink-0 basis-[86%] snap-start sm:basis-[46%] lg:basis-[31.5%]"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button type="button" onClick={() => scrollByPage(-1)} disabled={!canPrev} className={buttonClass} aria-label={`${label}: anterior`}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollByPage(1)} disabled={!canNext} className={buttonClass} aria-label={`${label}: siguiente`}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
