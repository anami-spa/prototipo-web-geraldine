import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { SITE_LINKS } from '../data/siteContent';

const UMBRAL_PX = 600;

/**
 * Botones flotantes: «volver arriba» (aparece al bajar) y WhatsApp. No se montan en las cartas de venta.
 * Modelo: los que Geraldine tiene en su sitio actual (cuadrado dorado con flecha; WhatsApp con «¿Qué necesitas?»).
 */
export function FloatingActions() {
  const [mostrarArriba, setMostrarArriba] = useState(false);

  useEffect(() => {
    const alScroll = () => setMostrarArriba(window.scrollY > UMBRAL_PX);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  const volverArriba = () => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' });
    // El foco vuelve al inicio del contenido: quien navega con teclado no queda perdido abajo.
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  const mensaje = encodeURIComponent('Hola Geraldine, quisiera hacerte una consulta.');

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {mostrarArriba && (
        <button
          type="button"
          onClick={volverArriba}
          aria-label="Volver arriba"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[var(--color-accent-fill)] text-[var(--color-accent-on-fill)] shadow-md hover:brightness-95"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <a
        href={`${SITE_LINKS.whatsapp}?text=${mensaje}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1F7A4D] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110"
      >
        <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="max-sm:sr-only">¿Qué necesitas? Chatea conmigo</span>
        <span className="sr-only"> (WhatsApp, se abre en una pestaña nueva)</span>
      </a>
    </div>
  );
}
