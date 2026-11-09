import { useState } from 'react';
import { ArrowUpRight, BookOpen, Check, MessageCircle } from 'lucide-react';
import { SITE_LINKS } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';
import { photo, type PhotoId } from '../data/photos';

const PRESENTATION_GALLERY: { photo: PhotoId; caption: string }[] = [
  { photo: 'libro-g-firma', caption: 'Firma de ejemplares' },
  { photo: 'libro-g-presentacion', caption: 'Durante la presentación del libro' },
  { photo: 'libro-g-auditorio', caption: 'El auditorio, visto desde atrás' },
];

const COAUTHORS = [
  'Jessica Sepúlveda Bobadilla',
  'Ale Carpio de Zúñiga',
  'Romina Núñez Arriaza',
  'Geraldine Manríquez Plaza',
  'María Paz Molina',
  'Susana Sarmiento Hernández',
];

export function BookPage() {
  const [delivery, setDelivery] = useState<'retiro' | 'envio'>('retiro');
  const [previewConfirmed, setPreviewConfirmed] = useState(false);
  const demoPrice = 19990;
  const demoDelivery = delivery === 'envio' ? 3990 : 0;
  const formatPrice = (price: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  const whatsappText = encodeURIComponent('Hola, quiero consultar por el libro Revolución Emprendedora.');

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

              <h2 className="font-editorial text-2xl mb-3">Seis coautoras</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm sm:text-base text-[var(--color-ink-soft)] mb-8">
                {COAUTHORS.map((author) => <li key={author}>{author}</li>)}
              </ul>

              <div className="max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
                <p className="font-tabular text-xs text-[var(--color-accent-strong)] font-semibold mb-3">COMPRA DE MUESTRA</p>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                  <h2 className="font-editorial text-2xl">Revolución Emprendedora</h2>
                  <span className="font-tabular text-2xl font-semibold">{formatPrice(demoPrice)}</span>
                </div>
                <p className="text-sm text-[var(--color-muted)] mb-5">Ejemplar impreso · formato de muestra</p>
                <p className="text-sm text-[var(--color-ink-soft)] border-l-2 border-[var(--color-accent-fill)] pl-3 mb-5">
                  Precio y entrega ficticios para revisar esta experiencia. No constituyen una oferta de Geraldine.
                </p>
                <fieldset className="space-y-2 mb-5">
                  <legend className="text-sm font-semibold mb-2">Elige una entrega de prueba</legend>
                  {([
                    { value: 'retiro', label: 'Retiro en Concepción', cost: 'Sin costo' },
                    { value: 'envio', label: 'Envío a domicilio', cost: formatPrice(3990) },
                  ] as const).map((option) => (
                    <label key={option.value} className="flex min-h-11 items-center gap-3 border border-[var(--color-border)] rounded-sm p-3 cursor-pointer">
                      <input type="radio" name="book-demo-delivery" value={option.value} checked={delivery === option.value}
                        onChange={() => { setDelivery(option.value); setPreviewConfirmed(false); }} className="h-4 w-4 accent-[var(--color-accent)]" />
                      <span className="flex-1 text-sm">{option.label}</span>
                      <span className="text-xs font-tabular">{option.cost}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 mb-4" aria-live="polite">
                  <span className="text-sm font-semibold">Total de muestra</span>
                  <strong className="font-tabular text-xl">{formatPrice(demoPrice + demoDelivery)}</strong>
                </div>
                <button type="button" onClick={() => setPreviewConfirmed(true)} className="flex w-full min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] hover:brightness-95">
                  Simular reserva de un ejemplar
                </button>
                <div role="status" aria-live="polite">
                  {previewConfirmed && <p className="flex gap-2 text-sm text-[var(--color-ink-soft)] mt-4 p-3 bg-[var(--color-surface-alt)]">
                    <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Vista previa completada: un ejemplar con {delivery === 'retiro' ? 'retiro' : 'envío'} por {formatPrice(demoPrice + demoDelivery)}. No se creó una reserva ni se realizó un cobro.</span>
                  </p>}
                </div>
                <a
                  href={`${SITE_LINKS.whatsapp}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 mt-3 text-sm font-semibold text-[var(--color-accent-strong)] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Consultar condiciones reales
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRESENTATION_GALLERY.map((item) => (
              <figure key={item.photo}>
                <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                  <ResilientImage
                    {...photo(item.photo)}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 30vw, 92vw"
                    loading="lazy"
                    decoding="async"
                    fallbackTitle={item.caption}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm font-medium">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
