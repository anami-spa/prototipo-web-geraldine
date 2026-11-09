#!/usr/bin/env bash
# Republica la demo pública (https://gery.anami.cl) con el estado ACTUAL del prototipo.
# Reconstruye el build en ~/.cache/webjerry/site; el servidor lee los archivos en cada petición,
# así que no hace falta reiniciar nada. Si los servicios están apagados, los levanta.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
SITE="${HOME}/.cache/webjerry/site"
URL="https://gery.anami.cl"

npx tsc --noEmit
npx vite build --outDir "$SITE" --emptyOutDir 2>&1 | grep -E "built in|error|Error" || true
systemctl --user is-active --quiet webjerry-tunnel.service || systemctl --user start webjerry-tunnel.service

sleep 2
code="$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$URL/")"
echo "[demo] $URL -> HTTP $code"
[[ "$code" == "200" ]] || { echo "[demo] ERROR: la URL pública no responde 200" >&2; exit 1; }
