import React, { useState } from 'react';
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
import { BLOG_PLACEHOLDER_POSTS, RoutePath, SITE_LINKS } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface SpeakerPageProps {
  onNavigate: (route: RoutePath) => void;
}

export function SpeakerPage({ onNavigate }: SpeakerPageProps) {
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
    <div className="bg-[#F8F6F1] text-[#171A17]">
      {/* Hero Section */}
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
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

              {/* Sin botón Flow: solo CTA de contacto / Quiero Info Auspiciador */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:hola@geraldinemanriquez.com?subject=Cotizar%20Conferencia%20Speaker%20-%20Geraldine%20Manr%C3%ADquez"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Quiero Info Auspiciador / Cotizar Conferencia</span>
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
                {/* Foto pendiente: la imagen de IA que había acá mostraba a una
                    mujer que no es Geraldine dando esta charla — se retira
                    hasta tener su foto real (pregunta 1 del brief de WhatsApp) */}
                <div
                  className="flex flex-col items-center justify-center bg-[#E8E4DA] text-[#3B403B] p-8 text-center aspect-[16/9] lg:aspect-[4/3]"
                  role="img"
                  aria-label="Geraldine Manríquez en conferencia — pendiente"
                >
                  <span className="font-editorial text-2xl italic">Speaker & Conferencias</span>
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
            <div className="font-tabular text-xs text-[#D4A359] mb-2">
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
                  <div className="font-tabular text-xs text-[#D4A359] pb-3 mb-4 border-b border-[#2C3A32]">
                    CONFERENCIA {topic.number}
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-2">
                    {topic.number}. {topic.title}
                  </h3>
                  <div className="font-editorial italic text-base text-[#D4A359] mb-4">
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

      {/* Ficha Técnica: Público, Formato, Duración y Precio */}
      <section className="py-16 lg:py-20 bg-[#F2EFE7] border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm">
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

            <div className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm">
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

            <div className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm">
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

            <div className="p-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm flex flex-col justify-between">
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
                className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm"
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
  const [selectedDemoPost, setSelectedDemoPost] = useState<string | null>(null);

  return (
    <div className="bg-[#F8F6F1] text-[#171A17]">
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-tabular text-[var(--color-accent)] mb-4">
            <span>BLOG EDITORIAL · APRENDE A EMPRENDER</span>
            <span aria-hidden="true">·</span>
            <span>CONTENIDO DE EJEMPLO (PLACEHOLDER DE SECCIÓN)</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl text-[#171A17] mb-4">
            Artículos sobre Ventas y Narrativa Comercial
          </h1>

          <p className="text-base sm:text-lg text-[#383B36] max-w-[64ch] leading-relaxed">
            Vista previa estructural de la sección Blog. Las 3 tarjetas siguientes corresponden a{' '}
            <strong>contenido de ejemplo</strong> para representar el diseño editorial antes de la
            carga de artículos definitivos.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          {selectedDemoPost && (
            <div
              role="status"
              className="mb-8 p-4 bg-[#EAE5DA] border border-[#C9C3B4] rounded-sm flex items-center justify-between gap-4 text-xs sm:text-sm text-[#171A17]"
            >
              <span>
                <strong>Nota de prototipo:</strong> “{selectedDemoPost}” es una tarjeta placeholder
                de ejemplo para validar la grilla de artículos del Blog.
              </span>
              <button
                type="button"
                onClick={() => setSelectedDemoPost(null)}
                className="font-tabular text-xs text-[var(--color-accent)] hover:underline shrink-0 cursor-pointer"
              >
                Cerrar aviso
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BLOG_PLACEHOLDER_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#EAE6DC] border-b border-[#D5CFC2]">
                    <ResilientImage
                      src={post.image}
                      alt={`Imagen de ejemplo para artículo: ${post.title}`}
                      fallbackTitle={post.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tabular text-[#5A5D56] mb-3">
                      <span className="text-[var(--color-accent)] font-semibold">Contenido de ejemplo</span>
                      <span>{post.date}</span>
                    </div>

                    <h2 className="font-editorial text-xl sm:text-2xl text-[#171A17] mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[#4A4D47] leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-7 pt-4 border-t border-[#EAE6DC] flex items-center justify-between text-xs font-tabular">
                  <span className="text-[#646760]">{post.category} · Placeholder</span>
                  <button
                    type="button"
                    onClick={() => setSelectedDemoPost(post.title)}
                    className="text-[var(--color-accent)] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Vista de ejemplo</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
    <div className="bg-[#F8F6F1] text-[#171A17]">
      <section className="py-14 lg:py-20 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
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
      </section>

      <section className="py-16 lg:py-24 border-b border-[#DEDAD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Real Email + WhatsApp & Social Placeholders (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Real Email Card */}
              <div className="bg-[#121A16] text-[#F4F1EA] border border-[#2C3A32] rounded-sm p-6 sm:p-8">
                <div className="font-tabular text-xs text-[#D4A359] mb-2">
                  CORREO ELECTRÓNICO OFICIAL (CONFIRMADO)
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mb-2">
                  hola@geraldinemanriquez.com
                </h2>
                <p className="text-sm text-[#C4C0B6] mb-6">
                  Respondo personalmente cada mensaje en{' '}
                  <strong className="text-[#F4F1EA]">menos de 24 horas hábiles</strong>.
                </p>
                <a
                  href="mailto:hola@geraldinemanriquez.com"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#121A16] bg-[#D4A359] hover:bg-[#E3B56C] rounded-sm transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Escribir a hola@geraldinemanriquez.com</span>
                </a>
              </div>

              {/* WhatsApp & Social Networks */}
              <div className="bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.keys(SITE_LINKS.social) as Array<keyof typeof SITE_LINKS.social>).map(
                    (net) => (
                      <a
                        key={net}
                        href={SITE_LINKS.social[net]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 bg-[#F2EFE7] border border-[#D5CFC2] hover:border-[var(--color-accent)] rounded-sm text-xs font-medium text-[#171A17] flex items-center justify-between"
                      >
                        <span>{net}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-accent)]" aria-hidden="true" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Message Form (No Payment Button) (6 cols) */}
            <div className="lg:col-span-6 bg-[#FBF9F5] border border-[#D5CFC2] rounded-sm p-6 sm:p-8">
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
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#C8C2B4] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
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
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#C8C2B4] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
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
                      className="w-full px-3.5 py-3 text-sm bg-white border border-[#C8C2B4] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[var(--color-accent)]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enviar mensaje a hola@geraldinemanriquez.com</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="p-6 bg-[#121A16] text-[#F4F1EA] rounded-sm space-y-3">
                  <div className="w-9 h-9 rounded-sm bg-[#D4A359] text-[#121A16] flex items-center justify-center">
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
                    className="font-tabular text-xs text-[#D4A359] hover:underline"
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
