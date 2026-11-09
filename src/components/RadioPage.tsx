import { EcosistemaLALogo, EcosistemaBiobioLogo, ServiceBrand } from './BrandLogo';
import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  Mail,
  Mic,
  Radio as RadioIcon,
  Users,
} from 'lucide-react';
import {
  PARTNER_ORGS,
  type RoutePath,
  SITE_LINKS,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';
import { photo } from '../data/photos';
import { RADIO_EPISODES } from '../data/playlistEpisodes';
import { withBase } from '../lib/base';

const PARTNER_LOGOS = [
  { name: 'Ecosistema Biobío', file: 'svg' },
  { name: 'CorpArauco', file: 'corparauco.png' },
  { name: 'Ecosistema LA', file: 'ecosistema-la.jpg' },
  { name: 'Rediversas', file: 'rediversas.png' },
];

export function RadioPage({ onNavigate }: { onNavigate: (route: RoutePath) => void }) {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [visibleEpisodes, setVisibleEpisodes] = useState(9);

  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      {/* 1. HERO RADIO */}
      <section className="py-14 lg:py-20 bg-[#1F1A17] text-[#F6F3EC] border-b border-[#332B26]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#362E29] text-xs sm:text-sm font-tabular text-[#D9CBB8]">
            <div className="flex items-center gap-2.5">
              <RadioIcon className="w-4 h-4 text-[var(--color-accent-fill)]" aria-hidden="true" />
              <span className="text-[#F6F3EC] font-semibold">SEÑAL FM · GRAN CONCEPCIÓN</span>
              <span aria-hidden="true">·</span>
              <span>Radio Femenina de Concepción (44 años al aire · Asociada a ARCHI)</span>
            </div>
            <div>
              <span>Lunes - Miércoles - Viernes</span>
              <span aria-hidden="true"> · </span>
              <span className="text-[var(--color-accent-fill)] font-semibold">18:00 a 19:00 hrs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <ServiceBrand service="radio" />
              <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-3">
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

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={SITE_LINKS.radioYouTubePlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#171A17] bg-[var(--color-accent-fill)] hover:bg-[#E3B56C] rounded-sm transition-colors"
                >
                  Ver capítulos en YouTube <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={SITE_LINKS.radioYouTubePlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm font-semibold text-[#F6F3EC] border border-[#716354] hover:border-[var(--color-accent-fill)] rounded-sm transition-colors"
                >
                  Ver playlist en YouTube
                </a>
              </div>

              {/* Key Quantitative Metrics */}
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#362E29]">
                <div className="p-4 bg-[#29221E] border border-[#3D332D] rounded-sm">
                  <dt className="text-xs text-[#BFB7AC] mb-1">Alcance real por emisión</dt>
                  <dd className="font-tabular text-xl sm:text-2xl font-semibold text-[var(--color-accent-fill)]">
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
                    {...photo('radio-hero')}
                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
                    fetchPriority="high"
                    decoding="async"
                    fallbackTitle="Radio Femenina de Concepción"
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

      {/* CAPÍTULOS DEL PROGRAMA */}
      <section className="py-16 lg:py-20 border-b border-[#DEDAD0]" aria-labelledby="radio-episodes-title">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-[70ch] mb-8">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">ARCHIVO DEL PROGRAMA</div>
            <h2 id="radio-episodes-title" className="font-editorial text-3xl sm:text-4xl text-[#171A17] mb-3">
              Capítulos de Aprende a Emprender
            </h2>
            <p className="text-base text-[#383B36] leading-relaxed">
              Revisa los capítulos publicados por Femenina FM en la lista oficial de YouTube.            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#5A5D56]">{RADIO_EPISODES.length} videos de la playlist pública · Títulos publicados por Femenina FM</p>
            <a href={SITE_LINKS.radioYouTubePlaylist} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4">Ver playlist completa <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {RADIO_EPISODES.slice(0, visibleEpisodes).map((episode, index) => {
                  const playing = episode.id === activeEpisodeId;
                  const validId = /^[\w-]+$/.test(episode.id);
                  return (
                    <article key={episode.id} className="bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm overflow-hidden">
                      {playing && validId ? (
                        <iframe
                          className="aspect-video w-full"
                          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(episode.id)}?autoplay=1`}
                          title={`Reproducción: ${episode.title}`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => validId && setActiveEpisodeId(episode.id)}
                          disabled={!validId}
                          aria-label={`Reproducir capítulo: ${episode.title}`}
                          className="relative block w-full aspect-video bg-[#29221E] text-[#F6F3EC] disabled:cursor-not-allowed"
                        >
                          <img
                            src={`https://i.ytimg.com/vi/${encodeURIComponent(episode.id)}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <span className="rounded-full bg-[var(--color-accent-fill)] px-4 py-2 text-sm font-semibold text-[#171A17]">
                              Reproducir capítulo
                            </span>
                          </span>
                        </button>
                      )}
                      <div className="p-5">
                        <p className="font-tabular text-xs text-[var(--color-accent)] mb-2">CAPÍTULO {String(index + 1).padStart(2, '0')}</p>
                        <h3 className="font-editorial text-xl text-[#171A17]">{episode.title}</h3>
                        <a href={`https://www.youtube.com/watch?v=${episode.id}&list=PL6Z8t3mS8vaTUDtCw2ocTuCkEFyfUqJ3P`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4">Abrir capítulo en YouTube <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
                      </div>
                    </article>
                  );
                })}
              </div>
              {visibleEpisodes < RADIO_EPISODES.length && (
                <button type="button" onClick={() => setVisibleEpisodes((count) => Math.min(count + 9, RADIO_EPISODES.length))} className="mt-8 min-h-11 rounded-sm border border-[#9B8D75] px-5 py-3 text-sm font-semibold text-[var(--color-accent)]">Mostrar más capítulos</button>
              )}
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
            <div className="bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
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
                <div className="flex items-center justify-between text-xs font-tabular text-[var(--color-accent-fill)] pb-3 mb-4 border-b border-[#2C3A32]">
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#121A16] bg-[var(--color-accent-fill)] hover:bg-[#E3B56C] rounded-sm transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Quiero Info Auspiciador</span>
                </a>
                <a
                  href="#planes-auspicio"
                  className="text-xs font-tabular text-[var(--color-accent-fill)] hover:underline"
                >
                  Ver opciones para PyME y Empresa ↓
                </a>
              </div>
            </div>
          </div>

          {/* Formatos Gratuitos sin Lista de Espera */}
          <div className="bg-[var(--color-surface-alt)] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
            <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold mb-2">
              FORMATOS GRATUITOS SIN LISTA DE ESPERA
            </div>
            <h3 className="font-editorial text-2xl text-[#171A17] mb-6">
              Participa hoy mismo con la comunidad de Aprende a Emprender
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[var(--color-surface)] border border-[#DED8CA] rounded-sm">
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

              <div className="p-5 bg-[var(--color-surface)] border border-[#DED8CA] rounded-sm">
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

      <section id="planes-auspicio" className="scroll-mt-20 bg-[#121A16] py-16 text-[#F4F1EA]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <p className="font-tabular text-xs text-[var(--color-accent-fill)] mb-2">AUSPICIOS RADIALES</p>
          <h2 className="font-editorial text-3xl sm:text-4xl">Conoce las opciones para tu marca</h2>
          <p className="mt-4 max-w-[65ch] text-[#C4C0B6]">Explora los planes en la página dedicada a tu tipo de organización.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={withBase("/radio/auspicio-pyme")} onClick={(event) => { event.preventDefault(); onNavigate('/radio/auspicio-pyme'); }} className="inline-flex min-h-11 items-center rounded-sm bg-[var(--color-accent-fill)] px-6 py-3 font-semibold text-[#171A17]">Planes para PyME →</a>
            <a href={withBase("/radio/auspicio-empresa")} onClick={(event) => { event.preventDefault(); onNavigate('/radio/auspicio-empresa'); }} className="inline-flex min-h-11 items-center rounded-sm border border-[var(--color-accent-fill)] px-6 py-3 font-semibold text-[var(--color-accent-fill)]">Planes para Empresa →</a>
          </div>
        </div>
      </section>

      {/* 4. SINERGIA REGIONAL (LOGOS PLACEHOLDER) */}
      <section className="py-16 bg-[var(--color-surface-alt)] border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">SINERGIA REGIONAL</div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171A17]">
                Alianza estratégica con los ecosistemas del Biobío
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_LOGOS.map((partner) => {
              const url = PARTNER_ORGS.find((o) => o.name === partner.name)?.url;
              const card = (
                <>
                  <div className="h-28 bg-white rounded-sm flex items-center justify-center p-4 mb-4">
                    {partner.file === 'svg' ? (
                      <EcosistemaBiobioLogo />
                    ) : partner.name === 'Ecosistema LA' ? (
                      <EcosistemaLALogo decorative />
                    ) : (
                      <img src={withBase(`/images/marca/${partner.file}`)} alt="" className="max-h-20 max-w-full object-contain" loading="lazy" />
                    )}
                  </div>
                  <div className="font-tabular text-[11px] text-[#3B3E39] mb-1">ALIANZA REGIONAL</div>
                  <div className="font-editorial text-xl text-[#171A17] font-medium">{partner.name}</div>
                </>
              );
              const cls = 'block h-full p-5 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm';
              return (
                <li key={partner.name}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[var(--color-accent)] transition-colors`}>
                      {card}
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  ) : (
                    <div className={cls}>{card}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
