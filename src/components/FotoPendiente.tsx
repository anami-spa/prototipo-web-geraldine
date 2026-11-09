interface FotoPendienteProps {
  titulo: string;
  detalle: string;
}

/**
 * Recuadro neutro para una foto que Geraldine aún no entrega. NO muestra imagen de muestra:
 * si falta una foto real, se ve que falta. No se usa hoy en ninguna ruta; queda disponible
 * para nuevas secciones antes de contar con la foto.
 */
export function FotoPendiente({ titulo, detalle }: FotoPendienteProps) {
  return (
    <div
      role="img"
      aria-label={`Foto pendiente: ${titulo}`}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--color-surface-alt)] p-6 text-center text-[#3B403B]"
    >
      <span className="font-tabular text-xs font-semibold text-[var(--color-accent)]">FOTO PENDIENTE</span>
      <span className="font-editorial text-xl italic">{titulo}</span>
      <span className="max-w-[40ch] text-sm text-[#5A5D56]">{detalle}</span>
    </div>
  );
}
