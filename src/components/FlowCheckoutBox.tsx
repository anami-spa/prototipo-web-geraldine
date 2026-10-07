import React, { useState } from 'react';
import { Check, Loader2, ShieldCheck } from 'lucide-react';

interface FlowCheckoutBoxProps {
  serviceName: string;
  regularPrice: string;
  regularPriceLabel: string;
  preferentialPrice: string;
  preferentialPriceLabel: string;
  preferentialCondition: string;
  paymentNote?: string;
}

/**
 * NOTA TÉCNICA DE PROTOTIPO:
 * Este componente implementa un MOCK VISUAL de la pasarela de pago Flow.cl
 * exclusivamente para fines de validación de diseño y experiencia de usuario.
 * NO realiza llamadas reales a la API de Flow ni procesa transacciones bancarias.
 * La integración real con el endpoint de Flow se realiza en la etapa de producción.
 */
export function FlowCheckoutBox({
  serviceName,
  regularPrice,
  regularPriceLabel,
  preferentialPrice,
  preferentialPriceLabel,
  preferentialCondition,
  paymentNote,
}: FlowCheckoutBoxProps) {
  const [selectedTier, setSelectedTier] = useState<'regular' | 'preferential'>('regular');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  const activeAmount = selectedTier === 'regular' ? regularPrice : preferentialPrice;
  const activeTierLabel =
    selectedTier === 'regular' ? regularPriceLabel : preferentialPriceLabel;

  const handleSimulatedFlowPayment = () => {
    if (paymentStatus === 'processing') return;
    setPaymentStatus('processing');

    // Simulación visual de 1.5 segundos (MOCK sin backend)
    window.setTimeout(() => {
      setPaymentStatus('confirmed');
    }, 1500);
  };

  return (
    <div className="bg-[#18221D] border border-[#2C3A32] rounded-sm p-6 sm:p-8 text-[#F4F1EA]">
      {/* Aviso de simulación — imposible de ignorar, deliberadamente la única
          excepción al criterio de "cero placeholder" (ver T1.6 del plan) */}
      <div
        role="alert"
        className="flex items-center gap-3 p-4 mb-6 bg-[#E8B23D] text-[#171A17] rounded-sm font-semibold text-base"
      >
        <ShieldCheck className="w-6 h-6 shrink-0" aria-hidden="true" />
        <span>SIMULACIÓN — ningún pago se procesa de verdad en este prototipo.</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#2C3A32]">
        <span className="font-tabular text-xs text-[#D4A359]">
          INSCRIPCIÓN E INVERSIÓN DIRECTA
        </span>
      </div>

      {/* Selector de Tarifa: Regular vs Preferencial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" role="radiogroup" aria-label="Seleccionar tarifa">
        <button
          type="button"
          role="radio"
          aria-checked={selectedTier === 'regular'}
          onClick={() => {
            setSelectedTier('regular');
            if (paymentStatus === 'confirmed') setPaymentStatus('idle');
          }}
          className={`text-left p-4 rounded-sm border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white ${
            selectedTier === 'regular'
              ? 'bg-[#223029] border-[#D4A359] text-[#F4F1EA]'
              : 'bg-[#131B17] border-[#2C3A32] text-[#B6B2A8] hover:border-[#495A4F]'
          }`}
        >
          <div className="text-xs font-tabular text-[#C4C0B6] mb-1">{regularPriceLabel}</div>
          <div className="font-tabular text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
            {regularPrice}
          </div>
          <div className="text-xs text-[#9BA39D] mt-1">Inscripción general abierta</div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={selectedTier === 'preferential'}
          onClick={() => {
            setSelectedTier('preferential');
            if (paymentStatus === 'confirmed') setPaymentStatus('idle');
          }}
          className={`text-left p-4 rounded-sm border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white ${
            selectedTier === 'preferential'
              ? 'bg-[#223029] border-[#D4A359] text-[#F4F1EA]'
              : 'bg-[#131B17] border-[#2C3A32] text-[#B6B2A8] hover:border-[#495A4F]'
          }`}
        >
          <div className="text-xs font-tabular text-[#D4A359] mb-1">{preferentialPriceLabel}</div>
          <div className="font-tabular text-2xl sm:text-3xl font-semibold text-[#D4A359]">
            {preferentialPrice}
          </div>
          <div className="text-xs text-[#C4C0B6] mt-1">Alianzas y comunidades</div>
        </button>
      </div>

      {/* Condición de precio preferencial */}
      <div className="p-3.5 bg-[#121A16] border border-[#2C3A32] rounded-sm text-xs text-[#C4C0B6] mb-6 leading-relaxed">
        <strong className="text-[#D4A359]">Condición tarifa preferencial ({preferentialPrice}):</strong>{' '}
        {preferentialCondition}
        {paymentNote && (
          <span className="block mt-1 text-[#F4F1EA] font-medium">{paymentNote}</span>
        )}
      </div>

      {/* Estado de pago Flow (MOCK) */}
      {paymentStatus !== 'confirmed' ? (
        <div>
          <button
            type="button"
            disabled={paymentStatus === 'processing'}
            onClick={handleSimulatedFlowPayment}
            className="w-full py-4 px-6 rounded-sm font-semibold text-base text-[#171A17] bg-[#D4A359] hover:bg-[#E3B56C] disabled:opacity-80 transition-colors duration-150 flex items-center justify-center gap-3 shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {paymentStatus === 'processing' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">Simulando pago…</span>
              </>
            ) : (
              <span className="whitespace-nowrap">
                Ver simulación de pago · {activeAmount}
              </span>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-[#C4C0B6] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0" aria-hidden="true" />
            <span>
              En el sitio final: Transferencia Electrónica y tarjetas de crédito/débito vía Flow,
              100% seguro
            </span>
          </p>
        </div>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="p-5 bg-[#12261E] border border-[#2B6E51] rounded-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-sm bg-[#D4A359] text-[#171A17] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <div className="font-tabular text-xs text-[#D4A359]">
                SIMULACIÓN · {serviceName.toUpperCase()} ({activeTierLabel}: {activeAmount})
              </div>
              <h4 className="font-editorial text-xl text-white">
                Así se vería la confirmación de pago.
              </h4>
              <p className="text-xs text-[#C4C0B6] leading-relaxed">
                Ningún pago se procesó. En el sitio real, Flow te avisa a ti por correo y la
                inscripción entra sola al panel de administración — sin que nadie tenga que
                revisarla a mano.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentStatus('idle')}
                  className="font-tabular text-xs text-[#D4A359] hover:underline"
                >
                  Reiniciar simulación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
