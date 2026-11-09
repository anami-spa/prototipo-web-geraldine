import type { CSSProperties } from 'react';
import { PHOTO_FILES } from './photos.generated';
import { withBase } from '../lib/base';

/**
 * Fotos reales de Geraldine. Es la ÚNICA fuente de rutas de imagen de las fotos:
 * los archivos los genera `scripts/optimizar-fotos.sh` (manifiesto en photos.generated.ts)
 * y aquí solo se declara el texto alternativo y el estado de permiso de cada una.
 *
 * `permiso`:
 *  - 'propia'      → aparece ella sola, o el público de espaldas/en silueta/desenfocado.
 *  - 'condicional' → depende de confirmar un recorte, un logo visible o terceros (ver plan de fotos).
 *
 * Los alt describen literalmente lo que se ve. No nombran eventos ni lugares que no estén confirmados.
 * `decorative: true` = la foto no aporta información (alt vacío).
 */
interface PhotoMeta {
  alt: string;
  permiso: 'propia' | 'condicional';
  decorative?: boolean;
}

export const PHOTOS = {
  'home-hero-retina': {
    alt: 'Geraldine Manríquez de pie frente a un escritorio con un notebook, con blazer negro, mirando a cámara.',
    permiso: 'propia',
  },
  'home-hero-vender': {
    alt: 'Geraldine Manríquez escribe «Vender sin Vender» en una pizarra, en una fotografía en blanco y negro.',
    permiso: 'propia',
  },
  'home-hero-libro': {
    alt: 'Geraldine Manríquez sonríe junto a una mesa con ejemplares del libro Revolución Emprendedora.',
    permiso: 'propia',
  },
  'home-retina-sesion': {
    alt: 'Geraldine Manríquez sentada frente a un notebook, hablando a cámara en una sala de trabajo.',
    permiso: 'propia',
  },
  'home-card-escuela': {
    alt: '',
    decorative: true,
    permiso: 'propia',
  },
  'home-card-speaker': {
    alt: '',
    decorative: true,
    permiso: 'propia',
  },
  'home-radio': {
    alt: 'Geraldine Manríquez al micrófono con audífonos, en el estudio de Radio Femenina 96.7 Concepción.',
    permiso: 'propia',
  },
  // --- Fase B ---
  'speaker-hero': {
    alt: 'Geraldine Manríquez habla con micrófono en un escenario, frente a una pantalla con el texto «Retina Emprendedora».',
    permiso: 'propia',
  },
  'spk-g-escenario': {
    alt: 'Geraldine Manríquez habla con micrófono en el escenario; el público se ve en silueta en primer plano.',
    permiso: 'propia',
  },
  'spk-g-retrato': {
    alt: 'Geraldine Manríquez de pie en un auditorio, con abrigo camel, sonriendo a cámara.',
    permiso: 'propia',
  },
  'spk-g-auditorio': {
    alt: 'Geraldine Manríquez gesticula durante una charla, junto a un mural y una bandera de Chile.',
    permiso: 'propia',
  },
  'spk-g-ecosistema': {
    alt: 'Geraldine Manríquez de pie junto a un atril durante una charla en un auditorio.',
    permiso: 'condicional', // pantalla con marca de un tercero (Ecosistema Biobío): confirmar si se puede mostrar
  },
  'spk-g-atril': {
    alt: 'Geraldine Manríquez gesticula durante una charla, con un control de presentación en la mano.',
    permiso: 'condicional', // atril con logos de terceros
  },
  'spk-g-perfil': {
    alt: 'Geraldine Manríquez de perfil ante un atril, con una pantalla que proyecta la imagen de un ojo.',
    permiso: 'condicional', // logos de terceros visibles
  },
  'sobre-hero': {
    alt: 'Geraldine Manríquez junto a un espejo, con chaleco blanco, mirando hacia un lado.',
    permiso: 'propia',
  },
  'sobre-retrato': {
    alt: 'Retrato de Geraldine Manríquez de pie, con blazer negro y blusa estampada, mirando a cámara.',
    permiso: 'propia',
  },
  'sobre-sesion': {
    alt: 'Geraldine Manríquez sentada frente a un notebook, hablando a cámara en una sala de trabajo.',
    permiso: 'propia',
  },
  'radio-hero': {
    alt: 'Geraldine Manríquez en el estudio de Radio Femenina 96.7 Concepción, frente a un micrófono.',
    permiso: 'condicional', // marca Femenina FM visible
  },
  'libro-portada': {
    alt: 'Portada y contraportada del libro Revolución Emprendedora.',
    permiso: 'propia',
  },
  'libro-autora': {
    alt: 'Geraldine Manríquez sentada en unas escalinatas, con un ejemplar de Revolución Emprendedora en la mano.',
    permiso: 'propia',
  },
  'libro-interior': {
    alt: 'Libro Revolución Emprendedora: portada, contraportada y páginas interiores.',
    permiso: 'propia',
  },
  'libro-g-firma': {
    alt: 'Geraldine Manríquez firmando un ejemplar del libro.',
    permiso: 'propia',
  },
  'libro-g-presentacion': {
    alt: 'Geraldine Manríquez habla con micrófono durante la presentación del libro.',
    permiso: 'propia',
  },
  'libro-g-auditorio': {
    alt: 'Auditorio lleno en la presentación del libro Revolución Emprendedora, visto desde atrás.',
    permiso: 'condicional', // logo de INACAP visible; panelistas a lo lejos
  },
  // --- Fase C ---
  'escuela-hero': {
    alt: 'Geraldine Manríquez sentada en un escritorio, con blazer naranjo, sonriendo mientras mira hacia abajo.',
    permiso: 'propia',
  },
  'esc-diagnostica': { alt: '', decorative: true, permiso: 'propia' },
  'esc-narrativa': { alt: '', decorative: true, permiso: 'propia' },
  'esc-vender': { alt: '', decorative: true, permiso: 'propia' },
  'esc-conexiones': { alt: '', decorative: true, permiso: 'condicional' }, // provisional: falta una foto propia de networking
  'aus-pyme-hero': {
    alt: 'Geraldine Manríquez en el estudio de Radio Femenina 96.7 Concepción, junto a un micrófono.',
    permiso: 'condicional', // marca Femenina FM visible
  },
  'aus-empresa-hero': {
    alt: 'Geraldine Manríquez conversa frente a un micrófono en el estudio de radio, con un celular grabando.',
    permiso: 'condicional', // marca Femenina FM visible
  },
  'aus-redes': {
    alt: 'Geraldine Manríquez sentada a un escritorio, gesticulando frente a un celular montado en un trípode que la graba.',
    permiso: 'propia',
  },
  'contacto-hero': {
    alt: 'Geraldine Manríquez junto a una baranda frente a un río, con blazer negro, mirando hacia un lado.',
    permiso: 'propia',
  },
} satisfies Record<string, PhotoMeta>;

export type PhotoId = keyof typeof PHOTOS;

export interface PhotoProps {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  style: CSSProperties;
}

const BASE = withBase('/images/fotos');

/** Props listas para `<ResilientImage {...photo('id')} />` (solo atributos de <img>). Falla fuerte si el id no se generó. */
export function photo(id: PhotoId): PhotoProps {
  const meta: PhotoMeta = PHOTOS[id];
  const file = PHOTO_FILES[id];
  if (!file) {
    throw new Error(`[photos] "${id}" no está en photos.generated.ts. Ejecuta scripts/optimizar-fotos.sh.`);
  }
  const widths = [...file.widths].sort((a, b) => a - b);
  const largest = widths[widths.length - 1];
  const [fx, fy] = file.focal;
  return {
    src: `${BASE}/${id}-${largest}.webp`,
    srcSet: widths.map((w) => `${BASE}/${id}-${w}.webp ${w}w`).join(', '),
    width: largest,
    height: file.maxHeight,
    alt: meta.decorative ? '' : meta.alt,
    // El encuadre va en línea: Tailwind 4 no genera clases object-[x%_y%] armadas en tiempo de ejecución.
    style: { objectPosition: `${Math.round(fx * 100)}% ${Math.round(fy * 100)}%` },
  };
}

/** Ids cuyo permiso de uso está condicionado (logos de terceros, recortes por confirmar). Para la lista de Geraldine. */
export function photosCondicionales(): PhotoId[] {
  return (Object.keys(PHOTOS) as PhotoId[]).filter((id) => (PHOTOS[id] as PhotoMeta).permiso === 'condicional');
}
