#!/usr/bin/env bash
# Genera las fotos optimizadas del sitio (WebP) a partir de los originales de Geraldine.
#
# - Los originales viven en el vault y NUNCA se modifican ni se versionan (material privado de la clienta).
# - Salida: public/images/fotos/<id>-<ancho>.webp  +  src/data/photos.generated.ts (manifiesto).
# - Requiere ImageMagick 6 (`convert`, `identify`). Sin dependencias npm.
#
# Uso:  scripts/optimizar-fotos.sh [--force] [id ...]
#   --force   regenera aunque la salida sea más nueva que el original
#   id ...    procesa solo esos ids (el manifiesto se reescribe con todos los ids ya generados)
#
# Formato de la tabla FOTOS (una por línea):
#   id | ruta relativa a $GERALDINE_FOTOS_DIR | proporción W:H | fx | fy | anchos (coma) | tope KB del ancho mayor
# La proporción admite zoom opcional: "16:9*0.5" = recorte de la mitad del tamaño máximo (acerca al sujeto).
# fx, fy (0..1) = punto focal: dónde queda el sujeto dentro del recorte. El CSS usa el mismo punto
# (object-position) cuando el contenedor tiene otra proporción.

set -euo pipefail

GERALDINE_FOTOS_DIR="${GERALDINE_FOTOS_DIR:-$HOME/ANAMI_SPA/3_VENTAS_Y_CLIENTES/3.4_CLIENTES/GERALDINE MANRIQUEZ/Contenido de marca}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/images/fotos"
MANIFEST="$ROOT/src/data/photos.generated.ts"

FORCE=0
IDS=()
for a in "$@"; do
  if [[ "$a" == "--force" ]]; then FORCE=1; else IDS+=("$a"); fi
done

# id|ruta|proporción|fx|fy|anchos|tope KB
FOTOS=(
  # --- Fase A · Home ---
  "home-hero-retina|Fotos_marca personal/DSC07736.jpg|3:4|0.50|0.45|600,1200|200"
  "home-hero-vender|Fotos_marca personal/DSC07762.jpg|3:4|0.50|0.45|600,1200|200"
  "home-hero-libro|Fotos Libro/7843284c-4872-4c87-9823-11c154f25df5.jpg|3:4|0.50|0.50|600,960|160"
  "home-retina-sesion|Fotos_marca personal/DSC07731.jpg|4:3|0.50|0.38|800,1600|240"
  "home-card-escuela|Fotos_marca personal/3df4b8d4-b7d4-419d-94ba-8b8d06ac3a63.JPG|16:9|0.50|0.26|640,1280|150"
  "home-card-speaker|Conferencias/DSC08744 copia.JPG|16:9*0.55|0.49|0.51|640,1280|150"
  "home-radio|Fotos Radio/DSC01855.JPG|4:3|0.50|0.35|800,1600|240"
  # --- Fase B · páginas que tenían muestras ---
  "speaker-hero|Conferencias/DSC08731 copia.JPG|16:9|0.50|0.50|800,1600|260"
  "spk-g-escenario|Conferencias/DSC08744 copia.JPG|4:3|0.55|0.50|640,1200|200"
  "spk-g-retrato|Fotos_marca personal/DSC02206.JPEG|4:3|0.50|0.33|640,1200|200"
  "spk-g-auditorio|Conferencias/DSC02233 (1).JPEG|4:3|0.50|0.35|640,1200|200"
  "spk-g-ecosistema|Conferencias/DSC02267.JPG|4:3|0.50|0.40|640,1200|200"
  "spk-g-atril|Conferencias/DSC02242.JPEG|4:3|0.50|0.35|640,1200|200"
  "spk-g-perfil|Conferencias/DSC02225.JPEG|4:3|0.60|0.55|640,1200|200"
  "sobre-hero|Fotos_marca personal/DSC00156.JPG|4:5|0.55|0.50|600,1200|220"
  "sobre-retrato|Fotos_marca personal/DSC07749.jpg|3:4|0.50|0.40|600,1200|200"
  "sobre-sesion|Fotos_marca personal/DSC07731.jpg|4:3*0.9|0.50|0.42|640,1200|200"
  "radio-hero|Fotos Radio/DSC01857.JPG|4:3|0.50|0.40|800,1600|240"
  "libro-portada|Fotos Libro/LIBRO FONDO TRANSPARENTE (1).PNG|4:5|0.50|0.50|600,1200|220"
  "libro-autora|Fotos Libro/IMG_5649.JPG|3:4|0.50|0.50|600,1200|200"
  "libro-interior|Fotos Libro/IMG_2785.JPG|4:5|0.50|0.50|600,1200|200"
  "libro-g-firma|Fotos Libro/DSC07563.JPEG|4:3*0.75|0.90|0.36|640,1200|200"
  "libro-g-presentacion|Fotos Libro/DSC07042.JPEG|4:3|0.50|0.40|640,1200|200"
  "libro-g-auditorio|Fotos Libro/b59b7f05-b6ae-4f57-b118-f0a4114871b6.JPG|4:3|0.50|0.50|640,1200|200"
  # --- Fase C · espacios nuevos ---
  "escuela-hero|Fotos_marca personal/3df4b8d4-b7d4-419d-94ba-8b8d06ac3a63.JPG|4:5|0.50|0.30|600,1200|220"
  "esc-diagnostica|Fotos_marca personal/DSC07731.jpg|16:9|0.50|0.33|640,1280|150"
  "esc-narrativa|Fotos_marca personal/3c1f915b-029c-41de-a67f-d83cc978b642.JPG|16:9*0.8|0.38|0.55|640,1280|150"
  "esc-vender|Fotos_marca personal/DSC07762.jpg|16:9|0.60|0.40|640,1280|150"
  "esc-conexiones|Conferencias/DSC02233 (1).JPEG|16:9*0.6|0.55|0.45|640,1280|150"
  "aus-pyme-hero|Fotos Radio/DSC01843.JPG|4:3|0.50|0.33|800,1600|240"
  "aus-empresa-hero|Fotos Radio/DSC01877.JPG|4:3|0.50|0.40|800,1600|240"
  "aus-redes|Fotos_marca personal/3c1f915b-029c-41de-a67f-d83cc978b642.JPG|4:3*0.85|0.40|0.55|640,1200|200"
  "contacto-hero|Fotos_marca personal/a0991172-8f96-4385-b372-411673062436.JPG|4:5|0.50|0.35|600,1200|220"
)

[[ -d "$GERALDINE_FOTOS_DIR" ]] || { echo "ERROR: no existe GERALDINE_FOTOS_DIR='$GERALDINE_FOTOS_DIR'" >&2; exit 1; }
command -v convert >/dev/null || { echo "ERROR: falta ImageMagick (convert)" >&2; exit 1; }
mkdir -p "$OUT"

want() { # ¿procesar este id?
  [[ ${#IDS[@]} -eq 0 ]] && return 0
  local i; for i in "${IDS[@]}"; do [[ "$i" == "$1" ]] && return 0; done
  return 1
}

# Devuelve "tamaño_en_bytes"
fsize() { stat -c %s "$1"; }

declare -A M_RATIO M_WIDTHS M_FOCAL M_H
fail=0

for row in "${FOTOS[@]}"; do
  IFS='|' read -r id rel ratio fx fy widths capkb <<<"$row"
  src="$GERALDINE_FOTOS_DIR/$rel"
  want "$id" || { :; }
  if ! [[ -f "$src" ]]; then echo "ERROR [$id]: falta el original '$rel'" >&2; fail=1; continue; fi

  zoom=1
  if [[ "$ratio" == *"*"* ]]; then zoom="${ratio##*\*}"; ratio="${ratio%%\**}"; fi
  rw="${ratio%%:*}"; rh="${ratio##*:}"
  # Dimensiones YA enderezadas (EXIF Orientation), no las crudas.
  read -r W H < <(convert "$src" -auto-orient -format '%w %h\n' info: | head -1)

  # Recorte máximo en la proporción pedida, centrado en el punto focal y dentro de la foto.
  read -r CW CH CX CY < <(awk -v W="$W" -v H="$H" -v rw="$rw" -v rh="$rh" -v fx="$fx" -v fy="$fy" -v z="$zoom" 'BEGIN{
    cw=W; ch=int(cw*rh/rw);
    if (ch>H) { ch=H; cw=int(ch*rw/rh) }
    cw=int(cw*z); ch=int(ch*z);
    x=int(fx*W-cw/2); y=int(fy*H-ch/2);
    if (x<0) x=0; if (y<0) y=0; if (x>W-cw) x=W-cw; if (y>H-ch) y=H-ch;
    print cw, ch, x, y }')

  # Anchos: nunca ampliar. Si el mayor pedido excede el recorte, se usa el ancho del recorte.
  IFS=',' read -ra WS <<<"$widths"
  final=()
  for w in "${WS[@]}"; do
    if (( w > CW )); then w=$CW; fi
    [[ " ${final[*]:-} " == *" $w "* ]] || final+=("$w")
  done
  maxw="${final[-1]}"

  for w in "${final[@]}"; do
    dst="$OUT/$id-$w.webp"
    if want "$id"; then
      if [[ $FORCE -eq 0 && -f "$dst" && "$dst" -nt "$src" ]]; then
        :
      else
        # Tope: el ancho mayor usa capkb; los menores, 45 % de capkb.
        if (( w == maxw )); then cap=$((capkb*1024)); else cap=$((capkb*1024*45/100)); fi
        ok=0
        for q in 80 72 64 56; do
          convert "$src" -auto-orient -crop "${CW}x${CH}+${CX}+${CY}" +repage \
                  -resize "${w}x" -colorspace sRGB -strip -quality "$q" \
                  -define webp:method=6 "$dst"
          if (( $(fsize "$dst") <= cap )); then ok=1; break; fi
        done
        if (( ok == 0 )); then
          echo "ERROR [$id-$w]: $(( $(fsize "$dst")/1024 )) KB > tope $((cap/1024)) KB incluso a q=56" >&2
          fail=1
        fi
      fi
    fi
  done

  M_RATIO[$id]="$ratio"
  M_WIDTHS[$id]="${final[*]}"
  M_FOCAL[$id]="$fx $fy"
  # Alto del ancho mayor, para width/height en el <img> (evita CLS).
  M_H[$id]=$(( maxw * rh / rw ))
done

# --- og:image (JPG 1200x630, para compartir enlaces) ---
OG_SRC="$GERALDINE_FOTOS_DIR/Conferencias/DSC08731 copia.JPG"
OG_DST="$OUT/og-geraldine.jpg"
if [[ -f "$OG_SRC" ]]; then
  if [[ $FORCE -eq 1 || ! -f "$OG_DST" || "$OG_SRC" -nt "$OG_DST" ]]; then
    for q in 82 74 66; do
      convert "$OG_SRC" -auto-orient -gravity center -crop 6000x3150+0+0 +repage -resize 1200x630! \
              -colorspace sRGB -strip -quality "$q" -interlace Plane "$OG_DST"
      (( $(fsize "$OG_DST") <= 200*1024 )) && break
    done
    (( $(fsize "$OG_DST") <= 200*1024 )) || { echo "ERROR [og]: pesa mas de 200 KB" >&2; fail=1; }
  fi
else
  echo "ERROR [og]: falta DSC08731 copia.JPG" >&2; fail=1
fi

# --- Manifiesto TypeScript (solo ids cuyos archivos existen) ---
{
  echo "// GENERADO por scripts/optimizar-fotos.sh — no editar a mano."
  echo "export interface PhotoFile { ratio: string; widths: number[]; maxHeight: number; focal: [number, number]; }"
  echo "export const PHOTO_FILES: Record<string, PhotoFile> = {"
  for id in "${!M_RATIO[@]}"; do
    ws="${M_WIDTHS[$id]}"; ok=1
    for w in $ws; do [[ -f "$OUT/$id-$w.webp" ]] || ok=0; done
    (( ok )) || continue
    printf "  '%s': { ratio: '%s', widths: [%s], maxHeight: %s, focal: [%s] },\n" \
      "$id" "${M_RATIO[$id]}" "${ws// /, }" "${M_H[$id]}" "${M_FOCAL[$id]// /, }"
  done | sort
  echo "};"
} > "$MANIFEST"

echo
printf "%-22s %-8s %-10s %s\n" "id" "ratio" "ancho" "KB"
for f in "$OUT"/*.webp; do
  [[ -f "$f" ]] || continue
  b="$(basename "$f" .webp)"; id="${b%-*}"; w="${b##*-}"
  printf "%-22s %-8s %-10s %s\n" "$id" "${M_RATIO[$id]:-?}" "$w" "$(( $(fsize "$f")/1024 ))"
done
echo "Total fotos/: $(du -sk "$OUT" | cut -f1) KB"
exit $fail
