import React, { useState } from 'react';

interface ResilientImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onError'> {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

export function ResilientImage({
  src,
  alt,
  className,
  fallbackTitle,
  ...imgProps
}: ResilientImageProps) {
  // Se guarda QUÉ src falló (no un booleano): si el src cambia, el error se olvida solo.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasError = failedSrc === src;

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#E8E4DA] text-[#3B403B] p-8 text-center ${
          className || ''
        }`}
        role="img"
        aria-label={alt}
        aria-hidden={imgProps['aria-hidden']}
      >
        <span className="font-editorial text-2xl italic">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      referrerPolicy="no-referrer"
      {...imgProps}
      src={src}
      alt={alt}
      onError={() => {
        if (import.meta.env.DEV) {
          console.error(`[ResilientImage] Falló la carga de "${src}" (alt: "${alt}"). Revisa la ruta — las imágenes deben vivir en public/.`);
        }
        setFailedSrc(src);
      }}
      className={className}
    />
  );
}
