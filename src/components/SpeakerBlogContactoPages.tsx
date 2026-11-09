import { SocialLinks } from './SocialLinks';
import { ServiceBrand } from './BrandLogo';
import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MessageCircle,
  Mic,
  Users,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { RoutePath, SITE_LINKS, SPEAKER_GALLERY } from '../data/siteContent';
import { photo } from '../data/photos';
import { ResilientImage } from './ResilientImage';

interface SpeakerPageProps {
  onNavigate: (route: RoutePath) => void;
}

export function SpeakerPage({ onNavigate }: SpeakerPageProps) {
  const [availabilityName, setAvailabilityName] = useState('');
  const [availabilityEmail, setAvailabilityEmail] = useState('');
  const [availabilityWhen, setAvailabilityWhen] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [availabilityErrors, setAvailabilityErrors] = useState<Record<string, string>>({});
  const [mailClientOpened, setMailClientOpened] = useState(false);
  const availabilityNameRef = useRef<HTMLInputElement>(null);
  const availabilityEmailRef = useRef<HTMLInputElement>(null);
  const availabilityMessageRef = useRef<HTMLTextAreaElement>(null);

  const handleAvailabilitySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!availabilityName.trim()) errors.name = 'Ingresa tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(availabilityEmail.trim())) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!availabilityMessage.trim()) errors.message = 'Cuéntanos brevemente sobre tu evento.';
    setAvailabilityErrors(errors);

    if (Object.keys(errors).length > 0) {
      if (errors.name) availabilityNameRef.current?.focus();
      else if (errors.email) availabilityEmailRef.current?.focus();
      else availabilityMessageRef.current?.focus();
      return;
    }

    const subject = encodeURIComponent('Consulta de disponibilidad para conferencia');
    const body = encodeURIComponent(
      [
        `Nombre: ${availabilityName.trim()}`,
        `Correo: ${availabilityEmail.trim()}`,
        `Fecha o referencia: ${availabilityWhen.trim() || 'Por definir'}`,
        '',
        availabilityMessage.trim(),
      ].join('\n')
    );
    window.location.href = `mailto:${SITE_LINKS.email}?subject=${subject}&body=${body}`;
    setMailClientOpened(true);
  };

  const speakerTopics = [
    {
      number: '01',
      title: 'Problema Real del Cliente',
      subtitle: 'Enfocarse en la causa, no el síntoma',
      description:
        'Una conferencia práctica para que los asistentes comprendan por qué sus prospectos no reaccionan cuando se les habla de soluciones técnicas y cómo identificar la raíz real del problema que moviliza la compra.',
    },
    {
      number: '02',
      title: 'Experiencia del Cliente',
      subtitle: 'Fidelización y recomendación por sobre adquisición',
      description:
        'Cómo diseñar cada punto de contacto para que tus clientes actuales se conviertan en el principal motor de crecimiento orgánico, priorizando la retención y la recomendación genuina por sobre el desgaste de adquirir en frío.',
    },
    {
      number: '03',
      title: 'Ruta Emprendedora',
      subtitle:
        'Para quienes ya conocen cliente ideal / Canvas / marketing pero no logran resultados consistentes',
      description:
        'Dirigida a quienes ya pasaron por talleres de modelo Canvas, arquetipos y marketing digital, pero siguen sin lograr ventas predecibles mes a mes.',
    },
  ];

  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      {/* Hero Section */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <ServiceBrand service="speaker" />
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
                <span>SPEAKER &amp; RELATORÍAS</span>
                <span aria-hidden="true">·</span>
                <span>CONFERENCIAS QUE SE VIVEN, NO SOLO SE ESCUCHAN</span>
              </div>

              <h1
                className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171A17] leading-[1.12] mb-6"
                style={{ textWrap: 'balance' }}
              >
                “Cómo llegar, conectar y atraer clientes de manera natural, auténtica y sin
                insistir.”
              </h1>

              <p className="text-lg sm:text-xl text-[#383B36] leading-relaxed border-l-2 border-[var(--color-accent)] pl-5 mb-8">
                Conferencias que se viven, no solo se escuchan. Diseñadas para activar claridad
                comercial inmediata en audiencias de emprendedores, organizaciones e instituciones.
              </p>

              {/* Consulta de disponibilidad y acceso a contacto */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#consulta-speaker"
                  className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Consultar disponibilidad</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('/contacto')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#171A17] border border-[#171A17]/30 hover:border-[#171A17] rounded-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Ir a página de Contacto</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-sm bg-[#121A16] aspect-[16/9] lg:aspect-[4/3]">
                  <ResilientImage
                    {...photo('speaker-hero')}
                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
                    fetchPriority="high"
                    decoding="async"
                    fallbackTitle="Geraldine Manríquez · Speaker"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs font-tabular text-[#5E615B]">
                  Conferencias presenciales y online
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Temas de Conferencia */}
      <section className="py-16 lg:py-24 border-b border-[#DEDAD0] bg-[#121A16] text-[#F4F1EA]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-2">
              EJES TEMÁTICOS OFICIALES
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA]">
              3 Temas de Conferencia
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {speakerTopics.map((topic) => (
              <article
                key={topic.number}
                className="bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="font-tabular text-xs text-[var(--color-accent-fill)] pb-3 mb-4 border-b border-[#2C3A32]">
                    CONFERENCIA {topic.number}
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-2">
                    {topic.number}. {topic.title}
                  </h3>
                  <div className="font-editorial italic text-base text-[var(--color-accent-fill)] mb-4">
                    “{topic.subtitle}”
                  </div>
                  <p className="text-sm text-[#C4C0B6] leading-relaxed">{topic.description}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#2C3A32] font-tabular text-xs text-[#9BA39D]">
                  Adaptable a 15, 30 ó 45 minutos
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-[64ch] mb-10">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
              EXPERIENCIAS EN ESCENARIO
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17] mb-3">
              Conferencias destacadas
            </h2>
            <p className="text-sm sm:text-base text-[#383B36] leading-relaxed">
              Registros de Geraldine en escenario durante conferencias y charlas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPEAKER_GALLERY.map((item) => {
              const p = photo(item.photo);
              return (
                <figure key={item.photo}>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#D5CFC2] bg-[#EAE6DC]">
                    <ResilientImage
                      {...p}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 30vw, 92vw"
                      loading="lazy"
                      decoding="async"
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm font-medium text-[#171A17]">
                    {item.title}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="consulta-speaker"
        className="scroll-mt-20 py-16 lg:py-20 bg-[var(--color-surface-alt)] border-b border-[#DEDAD0]"
        aria-labelledby="consulta-speaker-title"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-[760px] mx-auto bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm p-6 sm:p-9">
            <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
              CONSULTA DE DISPONIBILIDAD
            </div>
            <h2
              id="consulta-speaker-title"
              className="font-editorial text-2xl sm:text-3xl text-[#171A17] mb-3"
            >
              Cuéntame sobre tu evento
            </h2>
            <p className="text-sm sm:text-base text-[#383B36] leading-relaxed mb-6">
              Indica una fecha o una referencia. Si aún no tienes fecha, puedes dejar ese campo en
              blanco y contarme qué estás organizando.
            </p>

            {!mailClientOpened ? (
              <form onSubmit={handleAvailabilitySubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="speaker-name" className="block text-sm font-semibold mb-1.5">
                    Nombre completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={availabilityNameRef}
                    id="speaker-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={availabilityName}
                    onChange={(event) => {
                      setAvailabilityName(event.target.value);
                      setAvailabilityErrors((errors) => ({ ...errors, name: '' }));
                    }}
                    aria-invalid={Boolean(availabilityErrors.name)}
                    aria-describedby={availabilityErrors.name ? 'speaker-name-error' : undefined}
                    className="w-full min-h-11 px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {availabilityErrors.name && (
                    <p id="speaker-name-error" className="mt-1.5 text-sm font-medium text-[#8B2419]">
                      {availabilityErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="speaker-email" className="block text-sm font-semibold mb-1.5">
                    Correo electrónico <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={availabilityEmailRef}
                    id="speaker-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={availabilityEmail}
                    onChange={(event) => {
                      setAvailabilityEmail(event.target.value);
                      setAvailabilityErrors((errors) => ({ ...errors, email: '' }));
                    }}
                    aria-invalid={Boolean(availabilityErrors.email)}
                    aria-describedby={availabilityErrors.email ? 'speaker-email-error' : undefined}
                    className="w-full min-h-11 px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {availabilityErrors.email && (
                    <p id="speaker-email-error" className="mt-1.5 text-sm font-medium text-[#8B2419]">
                      {availabilityErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="speaker-when" className="block text-sm font-semibold mb-1.5">
                    Fecha o referencia <span className="font-normal text-[#5A5D56">(opcional)</span>
                  </label>
                  <input
                    id="speaker-when"
                    name="when"
                    type="text"
                    value={availabilityWhen}
                    onChange={(event) => setAvailabilityWhen(event.target.value)}
                    placeholder="Fecha tentativa, institución o contexto"
                    className="w-full min-h-11 px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label htmlFor="speaker-message" className="block text-sm font-semibold mb-1.5">
                    Mensaje <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    ref={availabilityMessageRef}
                    id="speaker-message"
                    name="message"
                    rows={4}
                    required
                    value={availabilityMessage}
                    onChange={(event) => {
                      setAvailabilityMessage(event.target.value);
                      setAvailabilityErrors((errors) => ({ ...errors, message: '' }));
                    }}
                    aria-invalid={Boolean(availabilityErrors.message)}
                    aria-describedby={availabilityErrors.message ? 'speaker-message-error' : undefined}
                    className="w-full px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {availabilityErrors.message && (
                    <p id="speaker-message-error" className="mt-1.5 text-sm font-medium text-[#8B2419]">
                      {availabilityErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                >
                  <span>Abrir consulta en mi correo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="text-xs sm:text-sm text-[#4A4D47] leading-relaxed">
                  Este prototipo abrirá tu aplicación de correo con el mensaje preparado; no lo
                  envía ni guarda tus datos en el sitio.
                </p>
              </form>
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="p-5 bg-[#EAE6DC] border border-[#767166] rounded-sm"
              >
                <h3 className="font-editorial text-xl text-[#171A17] mb-2">
                  Consulta preparada
                </h3>
                <p className="text-sm text-[#383B36] leading-relaxed">
                  Si tu aplicación de correo no se abrió, revisa la configuración del dispositivo.
                  Revisa el borrador y envíalo desde tu correo. El sitio no envió la consulta.
                </p>
                <button
                  type="button"
                  onClick={() => setMailClientOpened(false)}
                  className="inline-flex min-h-11 items-center mt-3 text-sm font-semibold text-[var(--color-accent)] underline underline-offset-2"
                >
                  Preparar otra consulta
                </button>
              </div>
            )}

            {SITE_LINKS.calendario && (
              <a
                href={SITE_LINKS.calendario}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center mt-4 px-5 py-3 text-sm font-semibold border border-[#767166] rounded-sm hover:bg-[var(--color-surface-alt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                Agendar en mi calendario
                <ArrowUpRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Ficha Técnica: Público, Formato, Duración y Precio */}
      <section className="py-16 lg:py-20 bg-[var(--color-surface-alt)] border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#171A17] mb-8">
            Ficha técnica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm">
              <div className="flex items-center gap-2 font-tabular text-xs text-[var(--color-accent)] mb-2">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>PÚBLICO OBJETIVO</span>
              </div>
              <h3 className="font-editorial text-xl text-[#171A17] mb-2">¿Para quién es?</h3>
              <p className="text-sm text-[#383B36] leading-relaxed">
                Profesionales independientes, emprendedores, coaches y terapeutas en su punto de
                quiebre.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm">
              <div className="flex items-center gap-2 font-tabular text-xs text-[var(--color-accent)] mb-2">
                <Mic className="w-4 h-4" aria-hidden="true" />
                <span>MODALIDAD</span>
              </div>
              <h3 className="font-editorial text-xl text-[#171A17] mb-2">Formato</h3>
              <p className="text-sm text-[#383B36] leading-relaxed">
                <strong>Presencial / Online</strong> para congresos, seminarios, programas de
                incubación, gremios y empresas.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm">
              <div className="flex items-center gap-2 font-tabular text-xs text-[var(--color-accent)] mb-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>BLOQUES DE TIEMPO</span>
              </div>
              <h3 className="font-editorial text-xl text-[#171A17] mb-2">Duración</h3>
              <p className="font-tabular text-base font-semibold text-[#171A17] mb-1">
                15, 30 ó 45 minutos
              </p>
              <p className="text-xs text-[#5A5D56]">
                Ajustable a charlas tipo TED, paneles o keynote principal.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm flex flex-col justify-between">
              <div>
                <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">ARANCEL SPEAKER</div>
                <h3 className="font-editorial text-xl text-[#171A17] mb-2">Precio: Consultar</h3>
                <p className="text-xs text-[#5A5D56] mb-4">
                  Cotización personalizada según formato, ciudad y alcance del evento (sin pago
                  online directo).
                </p>
              </div>
              <a
                href="mailto:hola@geraldinemanriquez.com?subject=Consulta%20Speaker%20-%20Geraldine%20Manr%C3%ADquez"
                className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm"
              >
                <span>Consultar disponibilidad</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
            <span>BLOG EDITORIAL · APRENDE A EMPRENDER</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl text-[#171A17] mb-4">
            Artículos sobre Ventas y Narrativa Comercial
          </h1>

          <p className="text-base sm:text-lg text-[#383B36] max-w-[64ch] leading-relaxed">
            Ideas y experiencias publicadas por Geraldine en su sitio.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          {BLOG_POSTS.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm overflow-hidden flex flex-col"
                >
                  {post.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-[#EAE6DC] border-b border-[#D5CFC2]">
                      <ResilientImage
                        src={post.image}
                        alt={`Imagen relacionada con el artículo: ${post.title}`}
                        fallbackTitle={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-tabular text-[#4A4D47] mb-3">
                      {post.category && (
                        <span className="text-[var(--color-accent)] font-semibold">
                          {post.category}
                        </span>
                      )}
                      <time dateTime={post.date}>
                        {new Intl.DateTimeFormat('es-CL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }).format(new Date(post.date))}
                      </time>
                    </div>

                    <h2 className="font-editorial text-xl sm:text-2xl text-[#171A17] mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[#383B36] leading-relaxed mb-6">{post.excerpt}</p>

                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Leer “${post.title}” en el sitio de Geraldine; se abre en una pestaña nueva`}
                      className="inline-flex min-h-11 items-center gap-2 mt-auto text-sm font-semibold text-[var(--color-accent)] underline underline-offset-2 decoration-1 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                    >
                      <span>Leer artículo</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="max-w-[64ch] rounded-sm border border-[#767166] bg-[var(--color-surface)] p-6 text-base leading-relaxed text-[#383B36]">
              Los artículos están pendientes de publicación en esta vista del prototipo.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export function ContactoPage() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);

  const handleDirectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactEmail.trim())) {
      setFormError('Por favor ingresa tu nombre y un correo electrónico válido.');
      return;
    }
    setFormError(null);
    // Prototipo sin backend: abre el cliente de correo del visitante con el
    // mensaje listo. En el sitio final (Laravel + Filament) esto entra
    // directo al panel de Geraldine — ver T1.7 del plan de mejoras.
    const subject = encodeURIComponent(`Consulta desde geraldinemanriquez.com — ${contactName}`);
    const body = encodeURIComponent(
      `${contactMessage}\n\n— ${contactName} (${contactEmail})`
    );
    window.location.href = `mailto:${SITE_LINKS.email}?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <div className="bg-[var(--color-paper)] text-[#171A17]">
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="min-w-0 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
            <span>CONTACTO DIRECTO</span>
            <span aria-hidden="true">·</span>
            <span>RESPUESTA EN MENOS DE 24H HÁBILES</span>
          </div>

          <h1
            className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] text-[#171A17] mb-6"
            style={{ textWrap: 'balance' }}
          >
            ¡Contáctame! Desbloquea el potencial de tu marca hoy.
          </h1>

          <p className="text-base sm:text-lg text-[#383B36] max-w-[62ch] leading-relaxed">
            ¿Quieres consultar por la Escuela de Ventas, cotizar una conferencia como Speaker,
            auspiciar el programa radial <em>Aprende a Emprender</em> o resolver una duda puntual?
            Escríbeme directamente.
          </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm border border-[#D4CFC3] bg-[#EAE6DC] aspect-[4/5] max-w-xs mx-auto lg:max-w-none">
              <ResilientImage
                {...photo('contacto-hero')}
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 320px"
                fetchPriority="high"
                decoding="async"
                fallbackTitle="Geraldine Manríquez"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Real Email + WhatsApp & Social Placeholders (6 cols) */}
            <div className="min-w-0 lg:col-span-6 space-y-6">
              {/* Real Email Card */}
              <div className="bg-[#121A16] text-[#F4F1EA] border border-[#2C3A32] rounded-sm p-6 sm:p-8">
                <div className="font-tabular text-xs text-[var(--color-accent-fill)] mb-2">
                  CORREO ELECTRÓNICO OFICIAL (CONFIRMADO)
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-2 [overflow-wrap:anywhere]">
                  {SITE_LINKS.email}
                </h2>
                <p className="text-sm text-[#C4C0B6] mb-6">
                  Respondo personalmente cada mensaje en{' '}
                  <strong className="text-[#F4F1EA]">menos de 24 horas hábiles</strong>.
                </p>
                <a
                  href={`mailto:${SITE_LINKS.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#121A16] bg-[var(--color-accent-fill)] hover:bg-[#E3B56C] rounded-sm transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Escribir un correo</span>
                </a>
              </div>

              {/* WhatsApp & Social Networks */}
              <div className="bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 text-xs font-tabular text-[#5A5D56] pb-3 mb-4 border-b border-[#E5E0D4]">
                  <span>WHATSAPP Y REDES SOCIALES</span>
                </div>

                <div className="mb-6">
                  <a
                    href={SITE_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-white bg-[#1F5E3B] hover:bg-[#17492D] rounded-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Conversar por WhatsApp</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                <SocialLinks variant="card" />
              </div>
            </div>

            {/* Right Column: Direct Message Form (No Payment Button) (6 cols) */}
            <div className="lg:col-span-6 bg-[var(--color-surface)] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
              <div className="font-tabular text-xs text-[var(--color-accent)] mb-2">
                MENSAJE RÁPIDO · SIN COMPROMISO
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171A17] mb-4">
                Envíame tu consulta directa
              </h2>

              {!formSent ? (
                <form onSubmit={handleDirectForm} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#171A17] mb-1.5"
                    >
                      Nombre y Apellido
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ej. Carolina Muñoz"
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#171A17] mb-1.5"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="nombre@tudominio.cl"
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-msg"
                      className="block text-xs font-semibold text-[#171A17] mb-1.5"
                    >
                      ¿En qué te puedo ayudar hoy?
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Cuéntame brevemente sobre tu negocio, si buscas información de la Escuela, Auspicio en Radio o Conferencias..."
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#767166] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[var(--color-accent)]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-semibold text-[var(--color-accent-on-fill)] bg-[var(--color-accent-fill)] hover:brightness-95 rounded-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enviar mensaje a hola@geraldinemanriquez.com</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="p-6 bg-[#121A16] text-[#F4F1EA] rounded-sm space-y-3">
                  <div className="w-9 h-9 rounded-sm bg-[var(--color-accent-fill)] text-[#121A16] flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <h3 className="font-editorial text-2xl text-[#F4F1EA]">
                    ¡Gracias, {contactName}!
                  </h3>
                  <p className="text-sm text-[#C4C0B6] leading-relaxed">
                    Se abrió tu cliente de correo con el mensaje listo para enviar a{' '}
                    <strong>hola@geraldinemanriquez.com</strong>. Si no se abrió, escribe
                    directo a ese correo — Geraldine responde en menos de 24 horas hábiles.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSent(false);
                      setContactName('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="font-tabular text-xs text-[var(--color-accent-fill)] hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
