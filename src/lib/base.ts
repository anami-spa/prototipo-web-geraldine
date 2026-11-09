// Prefijo de despliegue. Es '' en la raíz de un dominio (jerry.anami.cl, localhost) y
// '/prototipo-web-geraldine' cuando se sirve desde GitHub Pages (ver vite.config.ts).
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string): string => `${BASE}${path}`;

export const stripBase = (pathname: string): string =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
