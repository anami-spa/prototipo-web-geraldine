import { ArrowUpRight, BookOpen } from 'lucide-react';
import { SITE_LINKS } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';
import { ScrollCarousel } from './ScrollCarousel';
import { photo, type PhotoId } from '../data/photos';

/**
 * Fotos de la presentación. Solo entran las que no muestran a terceros reconocibles (coautoras, asistentes);
 * las demás esperan consentimiento escrito. `caption` es opcional: los pies los cambia Geraldine.
 */
const PRESENTATION_GALLERY: { photo: PhotoId; caption?: string }[] = [
  { photo: 'libro-g-firma', caption: 'Firma de ejemplares' },
  { photo: 'libro-g-presentacion', caption: 'Durante la presentación del libro' },
  { photo: 'libro-g-auditorio', caption: 'El auditorio, visto desde atrás' },
  { photo: 'libro-c-inacap' },
  { photo: 'libro-c-firma-manos' },
  { photo: 'libro-c-firma-libro' },
  { photo: 'libro-c-mesa-firma' },
  { photo: 'libro-c-firma-pila' },
  { photo: 'libro-c-hablando' },
  { photo: 'libro-c-sentada-1' },
  { photo: 'libro-c-sentada-2' },
  { photo: 'libro-c-lectura' },
  { photo: 'libro-c-manos-libro' },
  { photo: 'libro-c-mesa' },
  { photo: 'libro-c-mesa-libros' },
  { photo: 'libro-c-escalinatas' },
];

export function BookPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="py-14 lg:py-20 border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-sm border border-[#2C3A32] bg-[#171A17] aspect-[4/5] max-w-md mx-auto">
                  <ResilientImage
                    {...photo('libro-portada')}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    fetchPriority="high"
                    decoding="async"
                    fallbackTitle="Revolución Emprendedora"
                    className="w-full h-full object-contain p-5"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-[var(--color-muted)]">
                  Portada y contraportada de la edición de Editorial TIN-TA-PU-JO.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-tabular text-xs text-[var(--color-accent)] font-semibold mb-4">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>LIBRO · EDITORIAL TIN-TA-PU-JO</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5" style={{ textWrap: 'balance' }}>
                Revolución Emprendedora
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-[62ch] mb-7">
                Junto a <strong>5 mujeres emprendedoras más</strong>, soy coautora del libro{' '}
                <em>“Revolución Emprendedora”</em>, una obra donde reunimos conocimientos
                prácticos y herramientas concretas para pasar de la idea a resultados reales en
                los negocios.
              </p>

              {/* Reseña escrita por Geraldine (revisión nov-2026): reemplaza la lista de coautoras. */}
              <div className="space-y-4 text-base text-[var(--color-ink-soft)] leading-relaxed max-w-[62ch] mb-8">
                <p>
                  Este libro nació del dolor de hacer todo al pie de la letra (inclusive
                  levantarse a las 5:00 a.m.) y, aun así, no lograr vender ni sacar adelante el
                  negocio. Ante ese escenario, la pregunta que surge de manera inevitable es: ¿qué
                  hice mal si cumplí con todo lo que me dijeron? La respuesta es que faltaba el
                  pilar fundamental: conocerse y conectarse con uno mismo, pues sólo desde esa
                  autenticidad es posible conectar con los demás y, en especial, con el cliente.
                </p>
                <p>
                  En un escenario donde el liderazgo femenino consolida su impacto en el ecosistema
                  emprendedor, este libro reúne la trayectoria, reflexiones y herramientas de seis
                  destacadas especialistas: Susana Sarmiento Hernández (experta en desarrollo
                  sistémico de las organizaciones), Jéssica Sepúlveda Bobadilla (coach ontológico,
                  maestra en meditación y terapeuta holística), Ale Carpio (economista y
                  comunicadora), Romina Núñez Arriaza (comunicadora y biodescodificadora), María
                  Paz Molina (especialista en liderazgo consciente) y Geraldine Manríquez Plaza
                  (speaker de venta humanizada y networking).
                </p>
              </div>

              <div className="max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
                <p className="font-tabular text-xs text-[var(--color-accent-strong)] font-semibold mb-3">COMPRA EN LÍNEA</p>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                  <h2 className="font-editorial text-2xl">Revolución Emprendedora</h2>
                  <span className="font-tabular text-2xl font-semibold">$20.000</span>
                </div>
                <p className="text-sm text-[var(--color-muted)] mb-5">Más costo de envío. Despacho a través de Buscalibre.</p>
                <a
                  href={SITE_LINKS.bookBuscalibre}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] hover:brightness-95"
                >
                  Comprar en Buscalibre
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]" aria-labelledby="libro-mira-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 id="libro-mira-title" className="font-editorial text-3xl sm:text-4xl mb-8">Mira el libro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
            <figure>
              <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] aspect-[3/4]">
                <ResilientImage
                  {...photo('libro-autora')}
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 45vw, 92vw"
                  loading="lazy"
                  decoding="async"
                  fallbackTitle="Geraldine Manríquez con el libro"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-[var(--color-muted)]">Geraldine Manríquez con un ejemplar del libro.</figcaption>
            </figure>
            <figure>
              <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] aspect-[3/4]">
                <ResilientImage
                  {...photo('libro-interior')}
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 45vw, 92vw"
                  loading="lazy"
                  decoding="async"
                  fallbackTitle="Libro Revolución Emprendedora"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-[var(--color-muted)]">Portada, contraportada y páginas interiores.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 border-b border-[var(--color-border)]" aria-labelledby="libro-presentacion-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 id="libro-presentacion-title" className="font-editorial text-3xl sm:text-4xl mb-8">La presentación del libro</h2>
          <ScrollCarousel label="Fotos de la presentación del libro">
            {PRESENTATION_GALLERY.map((item, index) => (
              <figure key={item.photo}>
                <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                  <ResilientImage
                    {...photo(item.photo)}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 86vw"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    fallbackTitle={item.caption ?? 'Foto de la presentación del libro'}
                    className="h-full w-full object-cover"
                  />
                </div>
                {item.caption && <figcaption className="mt-2 text-sm font-medium">{item.caption}</figcaption>}
              </figure>
            ))}
          </ScrollCarousel>
        </div>
      </section>
    </div>
  );
}
