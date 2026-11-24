/**
 * Testimonios en video de la Escuela. Hoy son espacios vacíos (maqueta): Geraldine entrega los videos.
 * Para publicar uno, completar `src` (archivo o URL del video) y, si tiene, `poster`; `name` y `role` son
 * lo que se muestra debajo. Sin `src` el espacio se muestra como pendiente. No inventar testimonios.
 */
export interface VideoTestimonial {
  id: string;
  name?: string;
  role?: string;
  src?: string;
  poster?: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  { id: 'video-1' },
  { id: 'video-2' },
  { id: 'video-3' },
  { id: 'video-4' },
];
