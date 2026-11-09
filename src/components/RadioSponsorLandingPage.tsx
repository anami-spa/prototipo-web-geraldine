import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { RADIO_PLANS, SITE_LINKS, type RoutePath } from '../data/siteContent';
import { photo, type PhotoId } from '../data/photos';
import { ResilientImage } from './ResilientImage';

type Audience = 'pyme' | 'empresa';

export function RadioSponsorLandingPage({ audience, onNavigate }: {
  audience: Audience;
  onNavigate: (route: RoutePath) => void;
}) {
  const isPyme = audience === 'pyme';
  const label = isPyme ? 'PyME' : 'Empresa';
  const plans = RADIO_PLANS[audience];
  const heroPhoto: PhotoId = isPyme ? 'aus-pyme-hero' : 'aus-empresa-hero';
  // Franja de apoyo: la foto de portada de la otra audiencia más dos tomas del programa y del trabajo de contenido.
  const stripPhotos: PhotoId[] = ['home-radio', isPyme ? 'aus-empresa-hero' : 'aus-pyme-hero', 'aus-redes'];
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="bg-[#121A16] text-[#F4F1EA] py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
          <p className="font-tabular text-xs text-[var(--color-accent-fill)] mb-4">APRENDE A EMPRENDER · RADIO FEMENINA</p>
          <h1 className="font-editorial text-4xl sm:text-5xl leading-tight max-w-[18ch]">Auspicio radial para {label}</h1>
          <p className="mt-6 max-w-[62ch] text-lg text-[#E2DFD5] leading-relaxed">
            {isPyme
              ? 'Presenta tu emprendimiento con una presencia periódica en el programa y conversa con una audiencia regional.'
              : 'Dale continuidad a la presencia de tu marca en el programa y conoce las alternativas de entrevistas y menciones.'}
          </p>
          <a href="#planes" className="mt-8 inline-flex min-h-11 items-center gap-2 bg-[var(--color-accent-fill)] px-6 py-3 font-semibold text-[#171A17] rounded-sm">
            Ver alternativas <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm border border-[#2C3A32] bg-[#18221D] aspect-[4/3]">
              <ResilientImage
                {...photo(heroPhoto)}
                sizes="(min-width: 1100px) 440px, (min-width: 1024px) 38vw, 92vw"
                fetchPriority="high"
                decoding="async"
                fallbackTitle="Radio Femenina de Concepción"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Imágenes del programa" className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stripPhotos.map((id) => (
            <div key={id} className="overflow-hidden rounded-sm border border-[#D5CFC2] bg-[#EAE6DC] aspect-[4/3]">
              <ResilientImage
                {...photo(id)}
                sizes="(min-width: 1100px) 340px, (min-width: 640px) 30vw, 92vw"
                loading="lazy"
                decoding="async"
                fallbackTitle="Aprende a Emprender · Radio"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="planes" className="scroll-mt-20 mx-auto max-w-[1100px] px-4 sm:px-6 py-16 lg:py-20">
        <p className="font-tabular text-xs text-[var(--color-accent)] mb-2">PLANES DE AUSPICIO</p>
        <h2 className="font-editorial text-3xl sm:text-4xl">Elige la presencia que necesitas</h2>
        <p className="mt-4 max-w-[65ch] text-[#383B36]">Estos son los planes consignados en el prototipo. Confirma sus valores y condiciones con Geraldine antes de contratar.</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`flex flex-col rounded-sm border bg-white p-6 ${plan.recommended ? 'border-[var(--color-accent)]' : 'border-[#D5CFC2]'}`}>
              {plan.recommended && <p className="font-tabular text-xs font-semibold text-[var(--color-accent)] mb-3">DESTACADO</p>}
              <h3 className="font-editorial text-2xl">{plan.name}</h3>
              <p className="mt-4 text-2xl font-semibold">{plan.price}<span className="text-sm font-normal"> / mes</span></p>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-[#383B36]">
                {plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" /><span>{feature}</span></li>)}
              </ul>
              <a href={`${SITE_LINKS.whatsapp}?text=${encodeURIComponent(`Hola Geraldine, quisiera consultar por ${plan.name} de auspicio ${label} en Aprende a Emprender.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-4 py-3 text-sm font-semibold text-[#171A17]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Consultar por WhatsApp
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-[#5A5D56]">La coordinación se realiza directamente con Geraldine. Los valores y condiciones requieren su confirmación. También puedes escribir a <a href={`mailto:${SITE_LINKS.email}`} className="font-semibold text-[var(--color-accent)] underline">{SITE_LINKS.email}</a>.</p>
      </section>

      <section className="border-t border-[#DEDAD0] bg-white py-12">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-editorial text-xl">¿Necesitas otra modalidad?</p>
          <button type="button" onClick={() => onNavigate('/radio')} className="min-h-11 text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4">Volver al programa radial</button>
        </div>
      </section>
    </div>
  );
}
