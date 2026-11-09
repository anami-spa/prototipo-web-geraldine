import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import type { ReactNode } from 'react';
import { SITE_LINKS } from '../data/siteContent';

type Network = keyof typeof SITE_LINKS.social;

const svgProps = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, className: 'h-5 w-5' } as const;

const ICONS: Record<Network, ReactNode> = {
  Instagram: <Instagram className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  YouTube: <Youtube className="h-5 w-5" aria-hidden="true" />,
  Facebook: <Facebook className="h-5 w-5" aria-hidden="true" />,
  TikTok: (
    <svg {...svgProps}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  Spotify: (
    <svg {...svgProps}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
};

const OPEN_HINT = ' (se abre en una pestaña nueva)';

/**
 * Redes oficiales como íconos. `footer` es solo ícono sobre fondo oscuro;
 * `card` suma el nombre de la red sobre fondo claro. Objetivo táctil de 44 px.
 */
export function SocialLinks({ variant }: { variant: 'footer' | 'card' }) {
  const networks = Object.keys(SITE_LINKS.social) as Network[];
  const footer = variant === 'footer';
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';
  const tone = footer
    ? 'min-w-11 border-[#2C3A32] bg-[#1A251F] text-[#F4F1EA] hover:border-[var(--color-accent-fill)] hover:text-[var(--color-accent-fill)] focus-visible:outline-[var(--color-accent-fill)]'
    : 'px-3.5 border-[#D5CFC2] bg-[var(--color-surface-alt)] text-[#171A17] text-xs font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-[var(--color-accent)]';

  return (
    <ul className={footer ? 'flex flex-wrap gap-2.5' : 'grid grid-cols-2 gap-3 sm:grid-cols-3'}>
      {networks.map((network) => (
        <li key={network} className={footer ? undefined : 'contents'}>
          <a
            href={SITE_LINKS.social[network]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={footer ? `${network}${OPEN_HINT}` : undefined}
            title={footer ? network : undefined}
            className={`${base} ${tone}`}
          >
            {ICONS[network]}
            {!footer && (
              <span>
                {network}
                <span className="sr-only">{OPEN_HINT}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
