import React, { useState } from 'react';

interface ResilientImageProps {
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
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#E8E4DA] text-[#3B403B] p-8 text-center ${
          className || ''
        }`}
        role="img"
        aria-label={alt}
      >
        <span className="font-editorial text-2xl italic">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (import.meta.env.DEV) {
          console.error(`[ResilientImage] Falló la carga de "${src}" (alt: "${alt}"). Revisa la ruta — las imágenes deben vivir en public/.`);
        }
        setHasError(true);
      }}
      className={className}
    />
  );
}
