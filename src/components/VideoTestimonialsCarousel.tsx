import { Play } from 'lucide-react';
import { VIDEO_TESTIMONIALS } from '../data/videoTestimonials';
import { ScrollCarousel } from './ScrollCarousel';

/** Carrusel de testimonios en video. Con `src` reproduce el video; sin `src` muestra el espacio pendiente. */
export function VideoTestimonialsCarousel() {
  return (
    <section className="py-14 lg:py-20 border-b border-[#DEDAD0]" aria-labelledby="testimonios-video-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <p className="font-tabular text-xs text-[var(--color-accent)] mb-2">TESTIMONIOS EN VIDEO</p>
        <h2 id="testimonios-video-title" className="font-editorial text-3xl sm:text-4xl mb-8">
          Testimonios
        </h2>
        <ScrollCarousel label="Testimonios en video">
          {VIDEO_TESTIMONIALS.map((item) => (
            <figure key={item.id}>
              <div className="relative aspect-video overflow-hidden rounded-sm border border-[#D5CFC2] bg-[#EAE6DC]">
                {item.src ? (
                  <video
                    controls
                    preload="none"
                    poster={item.poster}
                    src={item.src}
                    className="h-full w-full object-cover"
                    aria-label={item.name ? `Testimonio en video de ${item.name}` : 'Testimonio en video'}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#9B8D75] text-[var(--color-accent)]">
                      <Play className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-tabular text-xs tracking-wide text-[#5A5D56]">VIDEO TESTIMONIO PENDIENTE</span>
                  </div>
                )}
              </div>
              {(item.name || item.role) && (
                <figcaption className="mt-2 text-sm">
                  {item.name && <strong className="font-semibold">{item.name}</strong>}
                  {item.role && <span className="text-[var(--color-muted)]"> · {item.role}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </ScrollCarousel>
      </div>
    </section>
  );
}
