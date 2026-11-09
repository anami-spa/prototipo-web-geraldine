import { ServiceBrand } from './BrandLogo';
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ESCUELA_CARDS, RoutePath } from '../data/siteContent';
import { photo } from '../data/photos';
import { ResilientImage } from './ResilientImage';

interface EscuelaCatalogPageProps {
  onNavigate: (route: RoutePath) => void;
}

export function EscuelaCatalogPage({ onNavigate }: EscuelaCatalogPageProps) {
  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      {/* Hero Section */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
          <ServiceBrand service="escuela" />
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
            <span>ESCUELA DE VENTAS · CATÁLOGO OFICIAL</span>
            <span aria-hidden="true">·</span>
            <span>4 FORMATOS CON INSCRIPCIÓN ONLINE</span>
          </div>

          <h1
            className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] text-[#171A17] max-w-[24ch] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Atrae a los clientes correctos y vende sin presionar
          </h1>

          <p className="text-lg sm:text-xl text-[#383B36] max-w-[60ch] leading-relaxed border-l-2 border-[var(--color-accent)] pl-5">
            Prepárate para transformar la frustración en conexión y la confusión en claridad.
          </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/5] max-w-sm mx-auto lg:max-w-none">
              <ResilientImage
                {...photo('escuela-hero')}
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 90vw"
                fetchPriority="high"
                decoding="async"
                fallbackTitle="Geraldine Manríquez"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Service Cards Grid */}
      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ESCUELA_CARDS.map((card) => (
              <article
                key={card.slug}
                className="overflow-hidden bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:border-[var(--color-accent)] transition-colors duration-150"
              >
                <div>
                  <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 lg:-mx-10 lg:-mt-10 mb-6 aspect-[16/9] overflow-hidden border-b border-[#D5CFC2] bg-[#EAE6DC]">
                    <ResilientImage
                      {...photo(card.image)}
                      sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 92vw"
                      loading="lazy"
                      decoding="async"
                      fallbackTitle={card.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Unboxed top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tabular text-[#5A5D56] pb-4 mb-6 border-b border-[#E5E0D4]">
                    <span className="text-[var(--color-accent)] font-semibold">
                      FICHA {card.index} · ESCUELA DE VENTAS
                    </span>
                    <span>Pago online vía Flow</span>
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#171A17] mb-4">
                    {card.index}. {card.title}
                  </h2>

                  <p className="font-editorial text-lg sm:text-xl italic text-[#323530] mb-6 leading-snug">
                    {card.hook}
                  </p>

                  <div className="mb-8">
                    <div className="font-tabular text-xs text-[#646760] mb-3">
                      LO QUE VAS A LOGRAR:
                    </div>
                    <ul className="space-y-2.5">
                      {card.outcomes.map((outcome, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm sm:text-base text-[#171A17]"
                        >
                          <div className="w-5 h-5 rounded-sm bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                          </div>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E5E0D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-tabular text-[#5A5D56]">
                      Valor regular: <strong className="text-[#171A17]">{card.regularPrice}</strong>
                    </div>
                    <div className="text-xs sm:text-sm font-tabular text-[var(--color-accent)] font-semibold">
                      {card.preferentialTag}: {card.preferentialPrice}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(card.slug)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <span>Ver ficha y pagar con Flow</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
