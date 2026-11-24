import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AVISO_PRIORITARIO } from '../data/avisoPrioritario';
import type { RoutePath } from '../data/siteContent';
import { withBase } from '../lib/base';

const RETRASO_MS = 3000;

// El almacenamiento puede estar bloqueado (modo privado, sitio sin permisos): todo va en try/catch y sin él el aviso
// se muestra una vez por carga, sin romper nada.
function leer(almacen: 'local' | 'session', clave: string): string | null {
  try {
    return (almacen === 'local' ? window.localStorage : window.sessionStorage).getItem(clave);
  } catch {
    return null;
  }
}

function guardar(almacen: 'local' | 'session', clave: string) {
  try {
    (almacen === 'local' ? window.localStorage : window.sessionStorage).setItem(clave, '1');
  } catch {
    /* sin almacenamiento: se ignora */
  }
}

function hoyISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface AvisoPrioritarioProps {
  /** false en las cartas de venta y en las páginas legales: nada compite con su contenido. */
  enabled: boolean;
  onNavigate: (route: RoutePath) => void;
}

export function AvisoPrioritario({ enabled, onNavigate }: AvisoPrioritarioProps) {
  const aviso = AVISO_PRIORITARIO;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [noVolver, setNoVolver] = useState(false);

  const claveOcultar = `aviso:${aviso.id}:ocultar`;
  const claveVisto = `aviso:${aviso.id}:visto`;

  const vigente = () => {
    const hoy = hoyISO();
    if (!aviso.activo) return false;
    if (aviso.desde && hoy < aviso.desde) return false;
    if (aviso.hasta && hoy > aviso.hasta) return false;
    return true;
  };

  // Abrir con retraso, solo si es vigente y la persona no lo descartó (para siempre o en esta sesión).
  useEffect(() => {
    if (!enabled || !vigente()) return;
    if (leer('local', claveOcultar) || leer('session', claveVisto)) return;
    const timer = window.setTimeout(() => setAbierto(true), RETRASO_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, aviso.id]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (abierto && enabled && !dialog.open) dialog.showModal();
    if ((!abierto || !enabled) && dialog.open) dialog.close();
  }, [abierto, enabled]);

  const cerrar = () => {
    guardar('session', claveVisto);
    if (noVolver) guardar('local', claveOcultar);
    setAbierto(false);
  };

  if (!vigente()) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="aviso-titulo"
      aria-describedby="aviso-texto"
      // Esc y el cierre nativo pasan por el mismo camino que el botón.
      onCancel={(event) => {
        event.preventDefault();
        cerrar();
      }}
      // Clic en el fondo (el propio <dialog>, fuera del contenido) = cerrar.
      onClick={(event) => {
        if (event.target === dialogRef.current) cerrar();
      }}
      className="w-full max-w-md rounded-sm border border-[var(--color-border)] bg-[var(--color-paper)] p-0 text-[var(--color-ink)] shadow-xl backdrop:bg-black/50 max-sm:mb-0 max-sm:mt-auto max-sm:max-w-none max-sm:rounded-b-none"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            {aviso.ejemplo && (
              <p className="mb-2 font-tabular text-xs tracking-wide text-[var(--color-muted)]">MENSAJE DE EJEMPLO</p>
            )}
            <h2 id="aviso-titulo" className="font-editorial text-2xl sm:text-3xl leading-tight">
              {aviso.titulo}
            </h2>
          </div>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar aviso"
            className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm hover:bg-[var(--color-surface-alt)]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p id="aviso-texto" className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
          {aviso.texto}
        </p>

        {aviso.cta && (
          <a
            href={withBase(aviso.cta.route)}
            onClick={(event) => {
              event.preventDefault();
              const destino = aviso.cta!.route;
              cerrar();
              onNavigate(destino);
            }}
            className="mt-6 flex min-h-11 w-full items-center justify-center rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] hover:brightness-95"
          >
            {aviso.cta.label}
          </a>
        )}

        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-sm text-[var(--color-ink-soft)]">
          <input
            type="checkbox"
            checked={noVolver}
            onChange={(event) => setNoVolver(event.target.checked)}
            className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>No volver a mostrar este mensaje</span>
        </label>
      </div>
    </dialog>
  );
}
