#!/usr/bin/env node
// Sirve el BUILD del prototipo (SPA) para la demo pública detrás de un túnel de Cloudflare.
// No usa el servidor de desarrollo de Vite: ese serviría el código fuente al público.
// Sin dependencias. Solo escucha en 127.0.0.1; el túnel es lo único que lo expone.
//
//   DEMO_ROOT   carpeta del build        (por defecto ~/.cache/webjerry/site)
//   DEMO_PORT   puerto local             (por defecto 4180)
//   PUBLIC_URL  URL pública, para og:image absoluta (por defecto https://gery.anami.cl)

import http from 'node:http';
import { createReadStream, readFileSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';

const ROOT = resolve(process.env.DEMO_ROOT ?? `${process.env.HOME}/.cache/webjerry/site`);
const PORT = Number(process.env.DEMO_PORT ?? 4180);
const PUBLIC_URL = (process.env.PUBLIC_URL ?? 'https://gery.anami.cl').replace(/\/$/, '');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

// Es un prototipo para revisión de la clienta: que no lo indexe ningún buscador.
const BASE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function send(res, status, headers, body) {
  res.writeHead(status, { ...BASE_HEADERS, ...headers });
  res.end(body);
}

function sendIndex(req, res) {
  // La og:image del build es relativa; los previews de WhatsApp/Facebook necesitan URL absoluta.
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8').replaceAll(
    'content="/images/fotos/og-geraldine.jpg"',
    `content="${PUBLIC_URL}/images/fotos/og-geraldine.jpg"`,
  );
  send(res, 200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-cache' }, req.method === 'HEAD' ? undefined : html);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, { Allow: 'GET, HEAD' }, 'Método no permitido');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    return send(res, 400, {}, 'Solicitud inválida');
  }
  if (pathname.includes('\0')) return send(res, 400, {}, 'Solicitud inválida');

  if (pathname === '/robots.txt') {
    return send(res, 200, { 'Content-Type': TYPES['.txt'] }, 'User-agent: *\nDisallow: /\n');
  }

  const target = resolve(ROOT, `.${pathname}`);
  // Nada fuera de la carpeta del build (path traversal).
  if (target !== ROOT && !target.startsWith(ROOT + sep)) return send(res, 403, {}, 'Prohibido');

  if (pathname !== '/' && isFile(target)) {
    const ext = extname(target).toLowerCase();
    const cache = pathname.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable' // nombres con hash
      : 'public, max-age=3600'; // fotos y logos: sin hash, que se puedan actualizar
    res.writeHead(200, {
      ...BASE_HEADERS,
      'Content-Type': TYPES[ext] ?? 'application/octet-stream',
      'Content-Length': statSync(target).size,
      'Cache-Control': cache,
    });
    return req.method === 'HEAD' ? res.end() : createReadStream(target).pipe(res);
  }

  // Un archivo que no existe (tiene extensión) es 404; una ruta de la app cae al index (SPA).
  if (extname(pathname)) return send(res, 404, {}, 'No encontrado');
  return sendIndex(req, res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[demo] sirviendo ${ROOT} en http://127.0.0.1:${PORT} (público: ${PUBLIC_URL})`);
});
