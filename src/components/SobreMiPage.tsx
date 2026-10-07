import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';
import { RoutePath, SITE_LINKS } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface SobreMiPageProps {
  onNavigate: (route: RoutePath) => void;
}

export function SobreMiPage({ onNavigate }: SobreMiPageProps) {
  return (
    <div className="bg-[#F8F6F1] text-[#171A17]">
      {/* Page Hero */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
            <span>SOBRE MÍ · RELATO DE ORIGEN</span>
            <span aria-hidden="true">·</span>
            <span>GERALDINE MANRÍQUEZ</span>
          </div>

          <h1
            className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] text-[#171A17] max-w-[24ch] mb-6"
            style={{ textWrap: 'balance' }}
          >
            De un despido inesperado tras 12 años en el aula a crear{' '}
            <span className="italic font-normal text-[var(--color-accent)]">La Retina Emprendedora.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#383B36] max-w-[66ch] leading-relaxed border-l-2 border-[var(--color-accent)] pl-5">
            Esta es mi historia real: cómo pasé de hacer “todo bien” sin lograr que llegaran los
            clientes, al punto de quiebre que dio origen a Aprende a Emprender en Concepción.
          </p>
        </div>
      </section>

      {/* First-Person Narrative with Intercalated Editorial Photos */}
      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
          {/* Chapter 01: 12 años de docencia y el despido */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#2C2F2A] leading-relaxed">
              <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold">
                CAPÍTULO 01 · LA VOCACIÓN DOCENTE Y EL QUIEBRE LABORAL
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171A17]">
                “Tenía contrato indefinido, dos magíster y era jefa de curso por tercera vez… y aun
                así me despidieron.”
              </h2>
              <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[var(--color-accent)]">
                Durante 12 años trabajé como profesora de Educación Física, recorriendo la
                educación regular, el pregrado y el postgrado. Me especialicé en neurociencia y
                cursé dos magísteres porque siempre creí que la excelencia académica y el
                compromiso eran garantía de estabilidad.
              </p>
              <p>
                A pesar de contar con contrato indefinido y de haber sido elegida jefa de curso por
                tercera vez, fui despedida. Ese golpe inesperado cerró de pronto una etapa de 12
                años, pero me dejó un finiquito que decidí usar para dar el salto y emprender.
              </p>
            </div>

            <div className="lg:col-span-5">
              <figure>
                {/* Foto real de Geraldine (Sony ILCE-6400, misma foto que usa en
                    geraldinemanriquez.com/escuela) — reemplaza el bloque pendiente */}
                <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[3/4] max-w-md mx-auto">
                  <ResilientImage
                    src="/images/geraldine_manriquez_retrato.webp"
                    alt="Retrato de Geraldine Manríquez, profesora de emprendedores y especialista en neurociencia aplicada a las ventas"
                    fallbackTitle="Geraldine Manríquez — Profesora"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs font-tabular text-[#5E615B]">
                  Fig. 01 — 12 años de docencia y neurociencia
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Chapter 02: El primer emprendimiento y el punto de quiebre */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <figure>
                <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/3]">
                  <ResilientImage
                    src="/images/retina_emprendedora_cafe_1791226529701.webp"
                    alt="Sesión de trabajo aplicando La Retina Emprendedora en Concepción"
                    fallbackTitle="El nacimiento de La Retina Emprendedora"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs font-tabular text-[#5E615B]">
                  Fig. 02 — Del punto de quiebre al método propio
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-base sm:text-lg text-[#2C2F2A] leading-relaxed">
              <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold">
                CAPÍTULO 02 · EL DESCUBRIMIENTO DE LA RETINA EMPRENDEDORA
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171A17]">
                Hacía “todo bien”, pero los clientes no llegaban
              </h2>
              <p>
                Con mi finiquito fundé mi primera empresa. Invertí tiempo, energía y recursos
                siguiendo cada consejo tradicional, pero los clientes simplemente no llegaban pese a
                que yo sentía que estaba haciendo “todo bien”.
              </p>
              <p>
                Fue exactamente en ese punto de quiebre donde descubrí mi método:{' '}
                <strong className="text-[#171A17]">la Retina Emprendedora</strong>. Comprendí que
                el error era mirar mi negocio desde mi propia solución, mis títulos y mi técnica, en
                vez de empezar a mirarlo desde el{' '}
                <strong className="text-[var(--color-accent)]">problema real del cliente</strong> y las
                palabras exactas con las que él lo vive.
              </p>
              <p>
                Ese cambio radical de mirada no solo destrabó mis ventas, sino que me permitió
                fundar <strong className="text-[#171A17]">Aprende a Emprender</strong> para que
                otros profesionales independientes, terapeutas, coaches y emprendedores no tuvieran
                que atravesar ese desgaste a ciegas.
              </p>
            </div>
          </div>

          {/* Chapter 03: Coautora de "Revolución Emprendedora" */}
          <div className="bg-[#F2EFE7] border border-[#D5CFC2] rounded-sm p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 font-tabular text-xs text-[var(--color-accent)] font-semibold">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>PUBLICACIÓN COLECTIVA · DISPONIBLE EN BUSCALIBRE CHILE</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171A17]">
                  Coautora del libro “Revolución Emprendedora”
                </h2>
                <p className="text-base sm:text-lg text-[#323530] leading-relaxed">
                  Junto a <strong>5 mujeres emprendedoras más</strong>, soy coautora del libro{' '}
                  <em>“Revolución Emprendedora”</em>, una obra donde reunimos conocimientos
                  prácticos y herramientas concretas para pasar de la idea a resultados reales en
                  los negocios.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('/escuela')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors cursor-pointer"
                  >
                    <span>Conocer la Escuela de Ventas</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <a
                    href={SITE_LINKS.bookBuscalibre}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tabular text-xs text-[#5A5D56] hover:text-[var(--color-accent)] underline"
                  >
                    Ver en Buscalibre Chile →
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure>
                  <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/3]">
                    <ResilientImage
                      src="/images/sobre_mi_libro_revolucion_1791229215968.webp"
                      alt="Libro Revolución Emprendedora, coautoría de Geraldine Manríquez junto a 5 mujeres emprendedoras"
                      fallbackTitle="Libro: Revolución Emprendedora"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs font-tabular text-[#5E615B]">
                    Fig. 03 — Libro “Revolución Emprendedora”
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embajadora de Ecosistemas (Logos Placeholder) */}
      <section className="py-16 lg:py-20 bg-[#121A16] text-[#F4F1EA] border-b border-[#26312B]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="font-tabular text-xs text-[#D4A359] mb-2">
                REPRESENTACIÓN Y REDES EN CHILE
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EA] mb-3">
                Embajadora oficial de Ecosistemas
              </h2>
              <p className="text-sm sm:text-base text-[#C4C0B6] leading-relaxed">
                Articulando colaboración, formación comercial y redes de apoyo activo como
                Embajadora de <strong>Ecosistema Biobío</strong> y <strong>Rediversas</strong>.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  name: 'Ecosistema Biobío',
                  role: 'Embajadora Oficial · Región del Biobío',
                  url: 'https://ecosistemabiobio.cl/',
                },
                {
                  name: 'Rediversas',
                  role: 'Embajadora Oficial · Red de Mujeres y Emprendimiento',
                  url: 'https://www.rediversas.cl',
                },
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-[#18221D] border border-[#2C3A32] rounded-sm flex flex-col justify-between hover:border-[#D4A359] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-tabular text-[#8E9690] pb-4 mb-4 border-b border-[#26332B]">
                    <span>RED ALIADA</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A359]" aria-hidden="true" />
                  </div>
                  <div className="font-editorial text-2xl text-[#F4F1EA] mb-1">{org.name}</div>
                  <div className="text-xs text-[#B6B2A8]">{org.role}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
