import { ServiceBrand } from './BrandLogo';
import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
} from 'lucide-react';
import {
  ESCUELA_CARDS,
  RoutePath,
  ServiceDetailData,
} from '../data/siteContent';
import { FlowCheckoutBox } from './FlowCheckoutBox';
import { ResilientImage } from './ResilientImage';
import { photo } from '../data/photos';

interface ServiceDetailTemplateProps {
  service: ServiceDetailData;
  onNavigate: (route: RoutePath) => void;
}

export function ServiceDetailTemplate({
  service,
  onNavigate,
}: ServiceDetailTemplateProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cardImage = ESCUELA_CARDS.find((c) => c.slug === service.slug)?.image;
  const otherServices = ESCUELA_CARDS.filter((c) => c.slug !== service.slug);

  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#DEDAD0] bg-[var(--color-surface-alt)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-tabular text-[#5A5D56]">
          <button
            type="button"
            onClick={() => onNavigate('/escuela')}
            className="inline-flex items-center gap-2 text-[#171A17] hover:text-[var(--color-accent)] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Volver al catálogo de Escuela</span>
          </button>
          <div>
            <span>Escuela de Ventas</span>
            <span aria-hidden="true"> / </span>
            <span className="text-[var(--color-accent)] font-semibold">{service.shortTitle}</span>
          </div>
        </div>
      </div>

      {/* 1. HERO CON PREGUNTA / DOLOR + REGLA DE ORO */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <ServiceBrand service={service.slug.includes("conexiones") ? "networking" : "escuela"} />
              <div className="font-tabular text-xs sm:text-sm text-[var(--color-accent)] font-semibold mb-4">
                {service.categoryKicker}
              </div>

              <h1
                className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171A17] leading-[1.12] mb-8"
                style={{ textWrap: 'balance' }}
              >
                {service.painQuestion}
              </h1>

              {cardImage && (
                <div className="mb-8 aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC]">
                  <ResilientImage
                    {...photo(cardImage)}
                    sizes="(min-width: 1280px) 720px, (min-width: 1024px) 60vw, 92vw"
                    fetchPriority="high"
                    decoding="async"
                    fallbackTitle={service.shortTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Regla de oro / Promesa central */}
              <div className="p-6 bg-[#F1EDE4] border-l-2 border-[var(--color-accent)] rounded-r-sm mb-6">
                <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold mb-2">
                  {service.goldenRuleLabel}
                </div>
                <p className="font-editorial text-xl sm:text-2xl italic text-[#171A17] leading-snug">
                  {service.goldenRuleText}
                </p>
              </div>

              {/* Aviso de fecha/horario, cuando el servicio lo tiene */}
              {service.scheduleNotice && (
                <div className="p-4 bg-[#EAE5DA] border border-[#CFC8B8] rounded-sm flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-semibold text-[#171A17]">
                    {service.scheduleNotice.text}
                  </span>
                  <span className="font-tabular text-xs text-[var(--color-accent)]">
                    [{service.scheduleNotice.placeholderLabel}]
                  </span>
                </div>
              )}
            </div>

            {/* Quick Summary Sidebar Card */}
            <div className="lg:col-span-4 bg-[var(--color-surface)] border border-[#D4CFC3] rounded-sm p-6 sm:p-7">
              <div className="font-tabular text-xs text-[#646760] pb-3 mb-4 border-b border-[#E5E0D5]">
                RESUMEN DE INVERSIÓN
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#5A5D56]">{service.regularPriceLabel}:</span>
                  <span className="font-tabular text-xl font-semibold text-[#171A17]">
                    {service.regularPrice}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-[#EAE6DC]">
                  <span className="text-xs font-medium text-[var(--color-accent)]">
                    {service.preferentialPriceLabel}:
                  </span>
                  <span className="font-tabular text-2xl font-semibold text-[var(--color-accent)]">
                    {service.preferentialPrice}
                  </span>
                </div>
              </div>

              <a
                href="#checkout-flow"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors duration-150 whitespace-nowrap"
              >
                <span>Ir a inscripción y pago Flow</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BULLETS DE "LO QUE VAS A LOGRAR" + INCLUYE / BONOS */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0] bg-[var(--color-surface)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6">
              <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
                RESULTADOS CONCRETOS
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171A17] mb-6">
                {service.achievementsTitle}
              </h2>

              <ul className="space-y-4">
                {service.achievements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 p-4 bg-[var(--color-paper)] border border-[#E2DDD1] rounded-sm"
                  >
                    <div className="w-6 h-6 rounded-sm bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base text-[#282B26] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              {service.includesList && (
                <div className="bg-[var(--color-surface-alt)] border border-[#D8D2C5] rounded-sm p-6 sm:p-8 mb-6">
                  <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
                    CONTENIDO DEL PROGRAMA
                  </div>
                  <h3 className="font-editorial text-2xl text-[#171A17] mb-4">
                    Qué incluye tu inscripción
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-[#2E312C]">
                    {service.includesList.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-tabular text-xs text-[var(--color-accent)] font-semibold mt-1">
                          0{i + 1}.
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.bonuses && (
                <div className="bg-[var(--color-surface-alt)] border border-[#D8D2C5] rounded-sm p-6 sm:p-8">
                  <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
                    VALOR AGREGADO INCLUIDO
                  </div>
                  <h3 className="font-editorial text-2xl text-[#171A17] mb-4">
                    Bonos de implementación
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-[#2E312C]">
                    {service.bonuses.map((bonus, i) => (
                      <li
                        key={i}
                        className="p-3.5 bg-[var(--color-surface)] border border-[#DED9CC] rounded-sm"
                      >
                        {bonus}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!service.includesList && !service.bonuses && (
                <div className="bg-[var(--color-surface-alt)] border border-[#D8D2C5] rounded-sm p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
                      ENFOQUE LA RETINA EMPRENDEDORA
                    </div>
                    <h3 className="font-editorial text-2xl text-[#171A17] mb-3">
                      Por qué este formato funciona desde la primera sesión
                    </h3>
                    <p className="text-sm sm:text-base text-[#383B36] leading-relaxed">
                      En lugar de entregarte teoría genérica de marketing, trabajamos directamente
                      sobre lo que hoy vendes y sobre las objeciones reales que escuchas en tus
                      reuniones o conversaciones por WhatsApp.
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#DED8CA] font-tabular text-xs text-[#5A5D56]">
                    Metodología creada por Geraldine Manríquez · Concepción, Chile
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CÓMO FUNCIONA (PASOS NUMERADOS) */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">METODOLOGÍA PASO A PASO</div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17]">
              {service.stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.steps.map((step) => (
              <div
                key={step.number}
                className="bg-[var(--color-surface)] border border-[#D8D3C6] rounded-sm p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="font-tabular text-xs text-[var(--color-accent)] pb-3 mb-4 border-b border-[#E6E2D6]">
                    PASO {step.number}
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#171A17] mb-3">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3D403A] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIOS REALES — solo se muestra la sección si hay testimonios reales asignados */}
      {service.testimonials.length > 0 && (
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0] bg-[var(--color-surface-alt)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
              EXPERIENCIAS VERIFICADAS
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17]">
              Testimonios reales de quienes aplicaron el método
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {service.testimonials.map((t, idx) => (
              <article
                key={`${t.name}-${idx}`}
                className="bg-[var(--color-surface)] border border-[#D8D3C6] rounded-sm p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="font-tabular text-xs text-[#646760] pb-3 mb-5 border-b border-[#E6E2D6]">
                    {t.shift}
                  </div>
                  <blockquote className="mb-6">
                    <p className="font-editorial text-lg sm:text-xl text-[#171A17] leading-relaxed">
                      “{t.quote}”
                    </p>
                  </blockquote>
                </div>
                <footer className="pt-4 border-t border-[#E6E2D6]">
                  <div className="font-semibold text-base text-[#171A17]">{t.name}</div>
                  <div className="text-xs text-[#5A5D56] mt-0.5">{t.role}</div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 5 & 6 & 7. PRECIO REGULAR VS PREFERENCIAL + GARANTÍA + BOTÓN DE PAGO FLOW */}
      <section
        id="checkout-flow"
        className="scroll-mt-16 py-16 lg:py-24 bg-[#121A16] text-[#F4F1EA] border-b border-[#26312B]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Guarantee & Value Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-2">
                  INVERSIÓN Y RESPALDO
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EA]">
                  Reserva tu cupo en {service.shortTitle}
                </h2>
              </div>

              {/* Guarantee Box */}
              <div className="p-6 bg-[#18221D] border border-[#2C3A32] rounded-sm">
                <div className="flex items-center gap-2.5 text-[var(--color-accent-fill)] font-tabular text-xs mb-2">
                  <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>GARANTÍA EXPLÍCITA</span>
                </div>
                <h3 className="font-editorial text-xl text-[#F4F1EA] mb-2">
                  {service.guaranteeTitle}
                </h3>
                <p className="text-sm text-[#C4C0B6] leading-relaxed">
                  {service.guaranteeText}
                </p>
              </div>

              <div className="p-5 bg-[#18221D] border border-[#2C3A32] rounded-sm text-xs text-[#B6B2A8] space-y-2">
                <div className="font-tabular text-[var(--color-accent-fill)]">¿TIENES DUDAS ANTES DE PAGAR?</div>
                <p>
                  Si perteneces a alguno de los ecosistemas en convenio o necesitas ayuda con tu
                  inscripción, puedes escribir directamente a{' '}
                  <a
                    href="mailto:hola@geraldinemanriquez.com"
                    className="text-[#F4F1EA] underline hover:text-[var(--color-accent-fill)]"
                  >
                    hola@geraldinemanriquez.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right Column: Simulated Flow Payment Box (7 cols) */}
            <div className="lg:col-span-7">
              <FlowCheckoutBox
                serviceName={service.shortTitle}
                regularPrice={service.regularPrice}
                regularPriceLabel={service.regularPriceLabel}
                preferentialPrice={service.preferentialPrice}
                preferentialPriceLabel={service.preferentialPriceLabel}
                preferentialCondition={service.preferentialCondition}
                paymentNote={service.paymentNote}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0] bg-[var(--color-paper)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">PREGUNTAS FRECUENTES</div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17]">
              Resuelve tus dudas sobre {service.shortTitle}
            </h2>
          </div>

          <div className="divide-y divide-[#DEDAD0] border-t border-b border-[#DEDAD0]">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left font-editorial text-lg sm:text-xl text-[#171A17] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-[var(--color-accent)]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 text-[#5A5D56]" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-[#3D403A] leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-navigation to other Escuela programs */}
      <section className="py-12 bg-[var(--color-surface-alt)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="font-tabular text-xs text-[#5A5D56] mb-6">
            OTROS PROGRAMAS DE LA ESCUELA DE VENTAS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((card) => (
              <button
                key={card.slug}
                type="button"
                onClick={() => onNavigate(card.slug)}
                className="text-left p-5 bg-[var(--color-surface)] border border-[#D8D3C6] hover:border-[var(--color-accent)] rounded-sm transition-colors cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="font-tabular text-xs text-[var(--color-accent)] mb-1">
                    Programa {card.index}
                  </div>
                  <h3 className="font-editorial text-xl text-[#171A17] group-hover:text-[var(--color-accent)] transition-colors mb-2">
                    {card.title}
                  </h3>
                </div>
                <div className="pt-3 border-t border-[#EAE6DC] flex items-center justify-between text-xs font-tabular text-[#5A5D56]">
                  <span>
                    {card.regularPrice} / Pref. {card.preferentialPrice}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
