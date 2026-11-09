import React, { useId } from 'react';
import { withBase } from '../lib/base';

// Original client assets, unmodified. Viewboxes omit empty transparent or white margins only.
export function GeraldineLogo() {
  const titleId = useId();
  return (
    <svg viewBox="8 184 474 107" width="190" height="43" role="img" aria-labelledby={titleId} className="block max-w-full">
      <title id={titleId}>Geraldine Manríquez</title>
      <image href={withBase("/images/marca/geraldine.png")} width="500" height="500" />
    </svg>
  );
}

export function ServiceBrand({ service }: { service: 'escuela' | 'radio' | 'speaker' | 'networking' }) {
  const labels = { escuela: 'Escuela', radio: 'Radio', speaker: 'Speaker', networking: 'Networking' };
  return <img src={withBase(`/images/marca/${service}.png`)} alt={`Aprende a Emprender · ${labels[service]}`} width="112" height="112" className="mb-6 h-28 w-28 object-contain rounded-sm" />;
}

export function EcosistemaBiobioLogo() {
  const titleId = useId();
  return (
    <svg viewBox="987 899 2165 421" width="220" height="43" role="img" aria-labelledby={titleId} className="max-w-full">
      <title id={titleId}>Ecosistema Biobío</title>
      <image href={withBase("/images/marca/ecosistema-biobio.png")} width="4000" height="2250" />
    </svg>
  );
}

// Preserve the supplied JPEG; frame the mark without its large white margins.
export function EcosistemaLALogo({ decorative = false }: { decorative?: boolean }) {
  const titleId = useId();
  return (
    <svg viewBox="365 520 850 300" width="220" height="78"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      className="block max-h-full max-w-full">
      {!decorative && <title id={titleId}>Ecosistema LA</title>}
      <image href={withBase("/images/marca/ecosistema-la.jpg")} width="1600" height="1467" />
    </svg>
  );
}
