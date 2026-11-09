type LegalKind = 'privacidad' | 'terminos';

interface LegalPageProps {
  kind: LegalKind;
}

const CONTENT: Record<LegalKind, { title: string; intro: string; sections: { title: string; body: string }[] }> = {
  privacidad: {
    title: 'Política de privacidad',
    intro: 'Un espacio claro para entender cómo se usarían los datos al contactar, inscribirse o comprar en el sitio.',
    sections: [
      { title: 'Responsable del tratamiento', body: 'Ejemplo de presentación: esta sección identifica a la persona o entidad responsable del sitio y sus canales de contacto. Los datos del responsable se incorporarán en el documento aprobado.' },
      { title: 'Datos que se recopilan y finalidades', body: 'Ejemplo de contenido: nombre y correo para responder una consulta, o datos de inscripción para coordinar un programa. En las demostraciones usa datos ficticios y revisa la indicación de cada formulario antes de continuar.' },
      { title: 'Uso, conservación y comunicación de datos', body: 'Ejemplo de contenido: explicar dónde se guarda la información, durante cuánto tiempo y qué proveedores intervienen. Los pedidos simulados de este prototipo se guardan únicamente en el navegador y pueden borrarse desde el bloque de órdenes de demostración.' },
      { title: 'Derechos de las personas y canales de contacto', body: 'Ejemplo de contenido: ofrecer un canal para consultas sobre datos personales y explicar cómo se gestionan las solicitudes. El procedimiento y las condiciones definitivas se incorporarán al validar el documento del sitio final.' },
    ],
  },
  terminos: {
    title: 'Términos y condiciones',
    intro: 'Información organizada para que cada persona pueda revisar las condiciones antes de elegir un programa o un libro.',
    sections: [
      { title: 'Alcance de los servicios', body: 'Ejemplo de contenido: la ficha de cada programa describe su modalidad, contenidos y acompañamiento. Las fechas o condiciones identificadas como muestra permiten evaluar la experiencia y no anuncian actividades confirmadas.' },
      { title: 'Inscripción y condiciones de pago', body: 'En este prototipo el recorrido de compra es una simulación. Puedes revisar una orden y sus resultados de prueba; no se realizan cargos ni se confirma una inscripción real. Los precios de muestra se identifican junto al producto.' },
      { title: 'Cambios, cancelaciones y garantías', body: 'Ejemplo de contenido: esta sección explicaría cómo solicitar un cambio de fecha, cancelar una inscripción o consultar una garantía. Los plazos, requisitos y posibles costos requieren condiciones aprobadas antes de habilitar una compra real.' },
      { title: 'Responsabilidades y contacto', body: 'Ejemplo de contenido: indicar a quién dirigir una consulta y qué información aportar para recibir ayuda. Los enlaces externos de contacto abren el canal indicado; una simulación de compra no envía una solicitud a Geraldine.' },
    ],
  },
};

export function LegalPage({ kind }: LegalPageProps) {
  const content = CONTENT[kind];

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="py-14 lg:py-20">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="font-tabular text-xs text-[var(--color-accent)] font-semibold mb-3">
            INFORMACIÓN DEL SITIO · DEMOSTRACIÓN
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl mb-5">{content.title}</h1>
          <p className="text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed mb-8">
            {content.intro}
          </p>

          <div className="border-l-4 border-[var(--color-accent-fill)] bg-[var(--color-surface-alt)] p-5 sm:p-6 mb-10">
            <p className="font-semibold">Texto de muestra para revisar el prototipo.</p>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              No es el documento legal aprobado de Geraldine ni establece las condiciones del sitio final.
            </p>
          </div>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <section key={section.title} className="border-b border-[var(--color-border)] pb-8">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-tabular text-xs text-[var(--color-accent)]" aria-hidden="true">0{index + 1}</span>
                  <h2 className="font-editorial text-2xl">{section.title}</h2>
                </div>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
