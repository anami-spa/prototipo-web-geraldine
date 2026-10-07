import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  Mail,
  MessageSquare,
  Mic,
  Radio as RadioIcon,
  Users,
} from 'lucide-react';
import { PARTNER_ORGS, RADIO_PLANS, SITE_LINKS } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

export function RadioPage() {
  const [activePlanTab, setActivePlanTab] = useState<'pyme' | 'empresa'>('pyme');

  const plans = RADIO_PLANS[activePlanTab];

  return (
    <div className="bg-[#F8F6F1] text-[#171A17]">
      {/* 1. HERO RADIO */}
      <section className="py-14 lg:py-20 bg-[#1F1A17] text-[#F6F3EC] border-b border-[#332B26]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#362E29] text-xs sm:text-sm font-tabular text-[#D9CBB8]">
            <div className="flex items-center gap-2.5">
              <RadioIcon className="w-4 h-4 text-[#D4A359]" aria-hidden="true" />
              <span className="text-[#F6F3EC] font-semibold">SEÑAL FM · GRAN CONCEPCIÓN</span>
              <span aria-hidden="true">·</span>
              <span>Radio Femenina de Concepción (44 años al aire · Asociada a ARCHI)</span>
            </div>
            <div>
              <span>Lunes - Miércoles - Viernes</span>
              <span aria-hidden="true"> · </span>
              <span className="text-[#D4A359] font-semibold">18:00 a 19:00 hrs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="font-tabular text-xs text-[#D4A359] mb-3">
                PROGRAMA RADIAL &amp; PLATAFORMA DE VISIBILIDAD REGIONAL
              </div>
              <h1
                className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] text-[#F6F3EC] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Programa “Aprende a Emprender”
              </h1>
              <p className="text-base sm:text-lg text-[#D6D0C6] leading-relaxed max-w-[60ch] mb-8">
                Transmitido en vivo cada{' '}
                <strong className="text-[#F6F3EC]">
                  Lunes, Miércoles y Viernes de 18:00 a 19:00 hrs
                </strong>{' '}
                por <strong className="text-[#F6F3EC]">Radio Femenina de Concepción</strong> —emisora
                con 44 años al aire y asociada a ARCHI— conectando emprendimientos y empresas con
                una audiencia real en todo el Gran Concepción.
              </p>

              {/* Key Quantitative Metrics */}
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#362E29]">
                <div className="p-4 bg-[#29221E] border border-[#3D332D] rounded-sm">
                  <dt className="text-xs text-[#BFB7AC] mb-1">Alcance real por emisión</dt>
                  <dd className="font-tabular text-xl sm:text-2xl font-semibold text-[#D4A359]">
                    25.000–45.000
                  </dd>
                  <span className="text-xs text-[#D6D0C6]">Auditores en el Gran Concepción</span>
                </div>
                <div className="p-4 bg-[#29221E] border border-[#3D332D] rounded-sm">
                  <dt className="text-xs text-[#BFB7AC] mb-1">Trayectoria de entrevistas</dt>
                  <dd className="font-tabular text-xl sm:text-2xl font-semibold text-[#F6F3EC]">
                    +150 invitados
                  </dd>
                  <span className="text-xs text-[#D6D0C6]">Entrevistados en el estudio</span>
                </div>
                <div className="p-4 bg-[#29221E] border border-[#3D332D] rounded-sm">
                  <dt className="text-xs text-[#BFB7AC] mb-1">Demanda actual</dt>
                  <dd className="font-tabular text-xl sm:text-2xl font-semibold text-[#F6F3EC]">
                    2 meses
                  </dd>
                  <span className="text-xs text-[#D6D0C6]">De lista de espera para entrevista</span>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-sm border border-[#3D332D] bg-[#29221E] aspect-[16/9] lg:aspect-[4/3]">
                  <ResilientImage
                    src="/images/radio_estudio_femenina_1791226539429.webp"
                    alt="Estudio de Radio Femenina de Concepción durante el programa Aprende a Emprender"
                    fallbackTitle="Estudio Radio Femenina de Concepción"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs font-tabular text-[#A89F94]">
                  Radio Femenina de Concepción · Asociada a ARCHI
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CÓMO PARTICIPAR (ÚNICA VS AUSPICIADOR) + FORMATOS GRATUITOS */}
      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">MODALIDADES DE PRESENCIA</div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17]">
              ¿Cómo participar en Aprende a Emprender?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Participación Única */}
            <div className="bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-tabular text-[#5A5D56] pb-3 mb-4 border-b border-[#E5E0D4]">
                  <span>MODALIDAD 01 · INVITADO DE ESTUDIO</span>
                  <span className="text-[var(--color-accent)]">2 meses de lista de espera</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#171A17] mb-3">
                  Participación Única (Lista de Espera)
                </h3>
                <p className="text-sm sm:text-base text-[#383B36] leading-relaxed mb-6">
                  Postula tu historia o emprendimiento para ser parte de las entrevistas del
                  programa. Debido a la alta demanda (+150 invitados entrevistados), las
                  participaciones únicas se asignan por orden en nuestra lista de espera.
                </p>
              </div>

              <div>
                <a
                  href={SITE_LINKS.radioListaEsperaForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#171A17] bg-[#EAE5DA] hover:bg-[#DFD9CB] border border-[#C9C3B4] rounded-sm transition-colors"
                >
                  <Users className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                  <span>Unirme a la Lista</span>
                </a>
              </div>
            </div>

            {/* Participación Periódica Mensual como Auspiciador */}
            <div className="bg-[#18221D] text-[#F4F1EA] border border-[#2C3A32] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-tabular text-[#D4A359] pb-3 mb-4 border-b border-[#2C3A32]">
                  <span>MODALIDAD 02 · ACCESO DIRECTO SIN ESPERA</span>
                  <span>Auspicio Mensual</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-3">
                  Participación Periódica Mensual como Auspiciador
                </h3>
                <p className="text-sm sm:text-base text-[#C4C0B6] leading-relaxed mb-6">
                  Posiciona tu marca cada semana frente a 25.000–45.000 auditores en el Gran
                  Concepción mediante cortinas radiales, menciones en vivo, concursos y entrevistas
                  mensuales de 50 minutos sin pasar por la lista de espera.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:hola@geraldinemanriquez.com?subject=Quiero%20Info%20Auspiciador%20-%20Radio%20Aprende%20a%20Emprender"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#121A16] bg-[#D4A359] hover:bg-[#E3B56C] rounded-sm transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Quiero Info Auspiciador</span>
                </a>
                <a
                  href="#planes-auspicio"
                  className="text-xs font-tabular text-[#D4A359] hover:underline"
                >
                  Ver tablas Plan PYME y Plan Empresa ↓
                </a>
              </div>
            </div>
          </div>

          {/* Formatos Gratuitos sin Lista de Espera */}
          <div className="bg-[#F2EFE7] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
            <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold mb-2">
              FORMATOS GRATUITOS SIN LISTA DE ESPERA
            </div>
            <h3 className="font-editorial text-2xl text-[#171A17] mb-6">
              Participa hoy mismo con la comunidad de Aprende a Emprender
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FBF9F5] border border-[#DED8CA] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-tabular text-[var(--color-accent)] mb-2">
                  <Mic className="w-4 h-4" aria-hidden="true" />
                  <span>FORMATO GRATUITO 01</span>
                </div>
                <h4 className="font-editorial text-xl text-[#171A17] mb-2">
                  Audio Emprendedor (Pitch de 20 seg por WhatsApp)
                </h4>
                <p className="text-sm text-[#383B36] leading-relaxed">
                  Envía tu nota de voz con un pitch de 20 segundos por WhatsApp presentando qué
                  problema resuelves y cómo contactarte para ser emitido al aire sin lista de
                  espera.
                </p>
              </div>

              <div className="p-5 bg-[#FBF9F5] border border-[#DED8CA] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-tabular text-[var(--color-accent)] mb-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>FORMATO GRATUITO 02</span>
                </div>
                <h4 className="font-editorial text-xl text-[#171A17] mb-2">
                  Panoramas Mensuales (Agenda de eventos del ecosistema)
                </h4>
                <p className="text-sm text-[#383B36] leading-relaxed">
                  Difusión gratuita de talleres, ferias, charlas y encuentros del ecosistema
                  emprendedor de la Región del Biobío dentro de nuestra agenda radial mensual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOGGLE / TABS "PLAN PYME" / "PLAN EMPRESA" (SIN BOTÓN FLOW, SOLO MAILTO) */}
      <section
        id="planes-auspicio"
        className="scroll-mt-16 py-16 lg:py-24 bg-[#121A16] text-[#F4F1EA] border-b border-[#26312B]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-10 border-b border-[#27332C]">
            <div>
              <div className="font-tabular text-xs text-[#D4A359] mb-2">
                TABLAS DE AUSPICIO MENSUAL · TODOS LOS PLANES SON EXENTOS DE IVA
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA]">
                Planes de Auspicio Radial
              </h2>
            </div>

            {/* Interactive Segmented Toggle: Plan PYME vs Plan Empresa */}
            <div
              role="tablist"
              aria-label="Seleccionar categoría de auspicio"
              className="inline-flex p-1 bg-[#1A251F] border border-[#2C3A32] rounded-sm self-start"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activePlanTab === 'pyme'}
                onClick={() => setActivePlanTab('pyme')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  activePlanTab === 'pyme'
                    ? 'bg-[#D4A359] text-[#121A16]'
                    : 'text-[#C4C0B6] hover:text-white'
                }`}
              >
                Plan PYME
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activePlanTab === 'empresa'}
                onClick={() => setActivePlanTab('empresa')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  activePlanTab === 'empresa'
                    ? 'bg-[#D4A359] text-[#121A16]'
                    : 'text-[#C4C0B6] hover:text-white'
                }`}
              >
                Plan Empresa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((tier) => (
              <article
                key={`${activePlanTab}-${tier.name}`}
                className={`flex flex-col justify-between rounded-sm p-6 sm:p-8 border ${
                  tier.recommended
                    ? 'bg-[#1D2923] border-[#D4A359]'
                    : 'bg-[#18221D] border-[#2C3A32]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#2C3A32] font-tabular text-xs">
                    <span className="text-[#D4A359]">
                      {activePlanTab === 'pyme' ? 'CATEGORÍA PYME' : 'CATEGORÍA EMPRESA'}
                    </span>
                    <span className="text-[#9BA39D]">Exento de IVA</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-2">
                    {tier.name}
                  </h3>
                  <div className="font-tabular text-3xl sm:text-4xl font-semibold text-[#D4A359] mb-6">
                    {tier.price}
                    <span className="text-xs font-normal text-[#C4C0B6]"> / mensual</span>
                  </div>

                  <ul className="space-y-3 border-t border-[#2C3A32] pt-5 mb-8 text-sm text-[#E2DFD5]">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sin botón Flow: únicamente CTA "Quiero ser auspiciador" por mailto */}
                <div className="pt-5 border-t border-[#2C3A32]">
                  <a
                    href={`mailto:hola@geraldinemanriquez.com?subject=${encodeURIComponent(
                      `Quiero ser auspiciador - ${tier.name} (${
                        activePlanTab === 'pyme' ? 'Plan PYME' : 'Plan Empresa'
                      } ${tier.price})`
                    )}`}
                    className={`w-full inline-flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold rounded-sm transition-colors whitespace-nowrap ${
                      tier.recommended
                        ? 'bg-[#D4A359] text-[#121A16] hover:bg-[#E3B56C]'
                        : 'bg-transparent border border-[#495A4F] text-[#F4F1EA] hover:border-[#D4A359] hover:text-[#D4A359]'
                    }`}
                  >
                    <span>Quiero ser auspiciador</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs font-tabular text-[#9BA39D]">
            * Todos los planes son exentos de IVA. La contratación de auspicios radiales se coordina
            directamente vía correo electrónico (hola@geraldinemanriquez.com).
          </p>
        </div>
      </section>

      {/* 4. SINERGIA REGIONAL (LOGOS PLACEHOLDER) */}
      <section className="py-16 bg-[#F2EFE7] border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">SINERGIA REGIONAL</div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171A17]">
                Alianza estratégica con los ecosistemas del Biobío
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_ORGS.filter((o) =>
              ['Ecosistema Biobío', 'CorpArauco', 'Ecosistema LA', 'Rediversas'].includes(o.name)
            ).map((partner) =>
              partner.url ? (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm flex flex-col justify-between hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="font-tabular text-[11px] text-[#3B3E39] mb-3">
                    ALIANZA REGIONAL
                  </div>
                  <div className="font-editorial text-xl text-[#171A17] font-medium">
                    {partner.name}
                  </div>
                </a>
              ) : (
                <div
                  key={partner.name}
                  className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm flex flex-col justify-between"
                >
                  <div className="font-tabular text-[11px] text-[#3B3E39] mb-3">
                    ALIANZA REGIONAL
                  </div>
                  <div className="font-editorial text-xl text-[#171A17] font-medium">
                    {partner.name}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
