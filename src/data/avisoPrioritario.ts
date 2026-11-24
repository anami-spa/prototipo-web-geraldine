import type { RoutePath } from './siteContent';

/**
 * Ventana emergente para un mensaje prioritario (hoy: promoción de cursos).
 *
 * Cómo se administra:
 *  - Cambiar el mensaje: edita `titulo`, `texto` y `cta`, y CAMBIA el `id`. Con un `id` nuevo el aviso vuelve
 *    a mostrarse a todos, incluso a quienes eligieron «No volver a mostrar» el anterior.
 *  - Retirarlo: `activo: false`, o dejar que caduque con `hasta` (AAAA-MM-DD, inclusive).
 *  - Programarlo: `desde` (AAAA-MM-DD).
 * En el sitio Laravel + Filament esto pasa a un recurso editable con los mismos campos.
 */
export interface AvisoPrioritario {
  activo: boolean;
  id: string;
  titulo: string;
  texto: string;
  cta?: { label: string; route: RoutePath };
  desde?: string;
  hasta?: string;
  /** Rótulo «mensaje de ejemplo»: solo para la demostración. Quitar cuando haya un mensaje real. */
  ejemplo?: boolean;
}

export const AVISO_PRIORITARIO: AvisoPrioritario = {
  activo: true,
  id: 'ejemplo-2026-11',
  titulo: 'Escuela de Ventas',
  texto: 'Revisa los programas de la Escuela de Ventas y sus próximas fechas.',
  cta: { label: 'Más información', route: '/escuela' },
  ejemplo: true,
};
