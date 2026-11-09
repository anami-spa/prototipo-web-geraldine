import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleAlert, ShieldCheck, X } from 'lucide-react';
import { withBase } from '../lib/base';

interface FlowCheckoutBoxProps {
  serviceName: string;
  regularPrice: string;
  regularPriceLabel: string;
  preferentialPrice: string;
  preferentialPriceLabel: string;
  preferentialCondition: string;
  paymentNote?: string;
}

type CheckoutStep = 1 | 2 | 3 | 4;
type OrderStatus = 'pendiente' | 'aprobada-demo' | 'rechazada-demo';
type Tariff = 'regular' | 'preferential';

interface DemoOrder {
  orderId: string;
  createdAt: string;
  service: string;
  tariff: string;
  name: string;
  email: string;
  status: OrderStatus;
}

const ORDERS_STORAGE_KEY = 'demo_ae_ordenes';

function readOrders(): DemoOrder[] {
  try {
    const rawOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!rawOrders) return [];
    const parsed: unknown = JSON.parse(rawOrders);
    return Array.isArray(parsed) ? (parsed as DemoOrder[]) : [];
  } catch {
    return [];
  }
}

function formatOrderDate(value: string): string {
  return new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusLabel(status: OrderStatus): string {
  if (status === 'aprobada-demo') return 'Aprobada (simulación)';
  if (status === 'rechazada-demo') return 'Rechazada (simulación)';
  return 'Pendiente';
}

/** Checkout demostrativo. No llama a Flow ni procesa transacciones reales. */
export function FlowCheckoutBox({
  serviceName,
  regularPrice,
  regularPriceLabel,
  preferentialPrice,
  preferentialPriceLabel,
  preferentialCondition,
  paymentNote,
}: FlowCheckoutBoxProps) {
  const [step, setStep] = useState<CheckoutStep>(1);
  const [selectedTier, setSelectedTier] = useState<Tariff>('regular');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferentialAccepted, setPreferentialAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [orders, setOrders] = useState<DemoOrder[]>(() => readOrders());
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [storageError, setStorageError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  const activeAmount = selectedTier === 'regular' ? regularPrice : preferentialPrice;
  const activeTierLabel = selectedTier === 'regular' ? regularPriceLabel : preferentialPriceLabel;
  const currentOrder = orders.find((order) => order.orderId === currentOrderId) ?? null;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const persistOrders = (nextOrders: DemoOrder[]): boolean => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
      setOrders(nextOrders);
      setStorageError('');
      return true;
    } catch {
      setStorageError(
        'No se pudo guardar la orden de demostración en este navegador. Libera espacio o habilita el almacenamiento local e inténtalo nuevamente.'
      );
      return false;
    }
  };

  const handleDetailsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) nextErrors.fullName = 'Ingresa tu nombre completo.';
    if (!trimmedEmail) {
      nextErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (selectedTier === 'preferential' && !preferentialAccepted) {
      nextErrors.preferentialAccepted = 'Confirma que cumples la condición de la tarifa.';
    }

    setFieldErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setAnnouncement('Revisa los campos indicados antes de continuar.');
      const focusId: Record<string, string> = {
        fullName: 'checkout-full-name',
        email: 'checkout-email',
        preferentialAccepted: 'checkout-preferential-accepted',
      };
      window.setTimeout(() => document.getElementById(focusId[firstInvalid])?.focus(), 0);
      return;
    }

    setStep(2);
    setAnnouncement('Datos guardados en este navegador. Revisa y confirma tu orden de demostración.');
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!privacyAccepted) nextErrors.privacyAccepted = 'Debes aceptar la política de privacidad.';
    if (!termsAccepted) nextErrors.termsAccepted = 'Debes aceptar los términos y condiciones.';
    setFieldErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setAnnouncement('Acepta los documentos indicados para continuar.');
      window.setTimeout(() => document.getElementById(firstInvalid)?.focus(), 0);
      return;
    }

    const orderId = `DEMO-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const newOrder: DemoOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      service: serviceName,
      tariff: activeTierLabel,
      name: fullName.trim(),
      email: email.trim(),
      status: 'pendiente',
    };
    const nextOrders = [newOrder, ...orders];

    // La orden se escribe de forma síncrona antes de mostrar el paso de pago.
    if (!persistOrders(nextOrders)) return;
    setCurrentOrderId(orderId);
    setStep(3);
    setAnnouncement('La orden quedó registrada como pendiente en la demostración.');
  };

  const updateCurrentOrder = (status: OrderStatus) => {
    if (!currentOrderId) return;
    const nextOrders = orders.map((order) =>
      order.orderId === currentOrderId ? { ...order, status } : order
    );
    if (!persistOrders(nextOrders)) return;
    setStep(4);
    setAnnouncement(`Resultado de la demostración: ${statusLabel(status)}.`);
  };

  const retryPayment = () => {
    if (!currentOrderId) return;
    const nextOrders = orders.map((order) =>
      order.orderId === currentOrderId ? { ...order, status: 'pendiente' as const } : order
    );
    if (!persistOrders(nextOrders)) return;
    setStep(3);
    setAnnouncement('La orden volvió a estado pendiente para repetir la demostración.');
  };

  const clearDemoOrders = () => {
    try {
      window.localStorage.removeItem(ORDERS_STORAGE_KEY);
      setOrders([]);
      setCurrentOrderId(null);
      setStep(1);
      setStorageError('');
      setAnnouncement('Se borraron las órdenes de demostración de este navegador.');
    } catch {
      setStorageError('No se pudieron borrar las órdenes de demostración.');
    }
  };

  const scrollToService = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const steps = ['Tus datos', 'Revisa y confirma', 'Pago de demostración', 'Resultado'];

  return (
    <div className="rounded-sm border border-[#2C3A32] bg-[#18221D] p-5 text-[#F4F1EA] sm:p-8">
      <div className="mb-6 rounded-sm bg-[#E8B23D] p-4 text-[#171A17] sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">SIMULACIÓN: ningún pago se procesa</p>
            <p className="mt-1 text-sm font-normal">
              Este recorrido solo muestra cómo se vería la compra en el sitio final. No se conecta a Flow.
            </p>
          </div>
        </div>
      </div>

      <ol aria-label="Pasos de la inscripción" className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const current = step === stepNumber;
          const complete = step > stepNumber;
          return (
            <li
              key={label}
              aria-current={current ? 'step' : undefined}
              className={`rounded-sm border p-3 text-sm ${
                current
                  ? 'border-[var(--color-accent-fill)] bg-[#223029] text-[#F4F1EA]'
                  : complete
                    ? 'border-[#2C3A32] bg-[#131B17] text-[var(--color-accent-fill)]'
                    : 'border-[#2C3A32] bg-[#131B17] text-[#B6B2A8]'
              }`}
            >
              <span className="mr-2 font-tabular text-xs">0{stepNumber}</span>
              <span>{label}</span>
            </li>
          );
        })}
      </ol>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {step === 1 && (
        <section aria-labelledby="checkout-step-1-heading">
          <h3
            id="checkout-step-1-heading"
            ref={headingRef}
            tabIndex={-1}
            className="font-editorial text-2xl text-[#F4F1EA] focus:outline-none sm:text-3xl"
          >
            Tus datos
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#C4C0B6]">
            Deja solo los datos necesarios para preparar la orden de demostración.
          </p>

          <form noValidate onSubmit={handleDetailsSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="checkout-full-name" className="mb-2 block text-sm font-semibold">
                Nombre completo <span aria-hidden="true">*</span>
              </label>
              <input
                id="checkout-full-name"
                name="name"
                autoComplete="name"
                required
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                  if (fieldErrors.fullName) setFieldErrors((errors) => ({ ...errors, fullName: '' }));
                }}
                aria-invalid={fieldErrors.fullName ? 'true' : undefined}
                aria-describedby={fieldErrors.fullName ? 'checkout-name-error' : undefined}
                className="w-full rounded-sm border border-[#777B73] bg-[#131B17] px-4 py-3 text-[#F4F1EA] placeholder:text-[#C4C0B6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
              />
              {fieldErrors.fullName && (
                <p id="checkout-name-error" className="mt-2 text-sm text-[#FFD38A]">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-email" className="mb-2 block text-sm font-semibold">
                Correo electrónico <span aria-hidden="true">*</span>
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (fieldErrors.email) setFieldErrors((errors) => ({ ...errors, email: '' }));
                }}
                aria-invalid={fieldErrors.email ? 'true' : undefined}
                aria-describedby={fieldErrors.email ? 'checkout-email-error' : undefined}
                className="w-full rounded-sm border border-[#777B73] bg-[#131B17] px-4 py-3 text-[#F4F1EA] placeholder:text-[#C4C0B6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
              />
              {fieldErrors.email && (
                <p id="checkout-email-error" className="mt-2 text-sm text-[#FFD38A]">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-phone" className="mb-2 block text-sm font-semibold">
                Teléfono <span className="font-normal text-[#C4C0B6]">(opcional)</span>
              </label>
              <input
                id="checkout-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-sm border border-[#777B73] bg-[#131B17] px-4 py-3 text-[#F4F1EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
              />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold">Selecciona tu tarifa</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  { id: 'regular', label: regularPriceLabel, amount: regularPrice },
                  { id: 'preferential', label: preferentialPriceLabel, amount: preferentialPrice },
                ] as const).map((tier) => (
                  <label
                    key={tier.id}
                    className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-sm border p-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-accent-fill)] ${
                      selectedTier === tier.id
                        ? 'border-[var(--color-accent-fill)] bg-[#223029]'
                        : 'border-[#495A4F] bg-[#131B17] hover:border-[var(--color-accent-fill)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="checkout-tier"
                      value={tier.id}
                      checked={selectedTier === tier.id}
                      onChange={() => {
                        setSelectedTier(tier.id);
                        if (fieldErrors.preferentialAccepted) {
                          setFieldErrors((errors) => ({ ...errors, preferentialAccepted: '' }));
                        }
                      }}
                      className="mt-1 h-4 w-4 accent-[var(--color-accent-fill)]"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{tier.label}</span>
                      <span className="mt-1 block font-tabular text-xl text-[#F4F1EA]">
                        {tier.amount}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {selectedTier === 'preferential' && (
              <div className="rounded-sm border border-[#495A4F] bg-[#121A16] p-4">
                <p className="mb-3 text-sm leading-relaxed text-[#D6D0C6]">
                  <strong className="text-[#F4F1EA]">Condición de tarifa preferencial:</strong>{' '}
                  {preferentialCondition}
                </p>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input
                    id="checkout-preferential-accepted"
                    type="checkbox"
                    checked={preferentialAccepted}
                    onChange={(event) => {
                      setPreferentialAccepted(event.target.checked);
                      if (fieldErrors.preferentialAccepted) {
                        setFieldErrors((errors) => ({ ...errors, preferentialAccepted: '' }));
                      }
                    }}
                    aria-invalid={fieldErrors.preferentialAccepted ? 'true' : undefined}
                    aria-describedby={
                      fieldErrors.preferentialAccepted ? 'checkout-preferential-error' : undefined
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-fill)]"
                  />
                  <span>Declaro que cumplo la condición de esta tarifa.</span>
                </label>
                {fieldErrors.preferentialAccepted && (
                  <p id="checkout-preferential-error" className="mt-2 text-sm text-[#FFD38A]">
                    {fieldErrors.preferentialAccepted}
                  </p>
                )}
              </div>
            )}

            {paymentNote && <p className="text-sm text-[#C4C0B6]">{paymentNote}</p>}

            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 font-semibold text-[#171A17] hover:bg-[#E3B56C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Continuar <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="checkout-step-2-heading">
          <h3
            id="checkout-step-2-heading"
            ref={headingRef}
            tabIndex={-1}
            className="font-editorial text-2xl text-[#F4F1EA] focus:outline-none sm:text-3xl"
          >
            Revisa y confirma
          </h3>
          <dl className="mt-5 grid gap-3 rounded-sm border border-[#2C3A32] bg-[#131B17] p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <dt className="text-xs text-[#C4C0B6]">Servicio</dt>
              <dd className="mt-1 font-semibold">{serviceName}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#C4C0B6]">Tarifa</dt>
              <dd className="mt-1 font-semibold">{activeTierLabel}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#C4C0B6]">Monto</dt>
              <dd className="mt-1 font-tabular text-lg">{activeAmount}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#C4C0B6]">Correo</dt>
              <dd className="mt-1 break-all font-semibold">{email.trim()}</dd>
            </div>
          </dl>

          <form noValidate onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
            <div>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  id="privacyAccepted"
                  type="checkbox"
                  required
                  checked={privacyAccepted}
                  onChange={(event) => {
                    setPrivacyAccepted(event.target.checked);
                    if (fieldErrors.privacyAccepted) {
                      setFieldErrors((errors) => ({ ...errors, privacyAccepted: '' }));
                    }
                  }}
                  aria-invalid={fieldErrors.privacyAccepted ? 'true' : undefined}
                  aria-describedby={fieldErrors.privacyAccepted ? 'checkout-privacy-error' : undefined}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-fill)]"
                />
                <span>
                  Acepto la{' '}
                  <a className="underline decoration-[var(--color-accent-fill)] underline-offset-2" href={withBase("/privacidad")}>
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
              {fieldErrors.privacyAccepted && (
                <p id="checkout-privacy-error" className="mt-1 ml-7 text-sm text-[#FFD38A]">
                  {fieldErrors.privacyAccepted}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(event) => {
                    setTermsAccepted(event.target.checked);
                    if (fieldErrors.termsAccepted) {
                      setFieldErrors((errors) => ({ ...errors, termsAccepted: '' }));
                    }
                  }}
                  aria-invalid={fieldErrors.termsAccepted ? 'true' : undefined}
                  aria-describedby={fieldErrors.termsAccepted ? 'checkout-terms-error' : undefined}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-fill)]"
                />
                <span>
                  Acepto los{' '}
                  <a className="underline decoration-[var(--color-accent-fill)] underline-offset-2" href={withBase("/terminos")}>
                    términos y condiciones
                  </a>
                  .
                </span>
              </label>
              {fieldErrors.termsAccepted && (
                <p id="checkout-terms-error" className="mt-1 ml-7 text-sm text-[#FFD38A]">
                  {fieldErrors.termsAccepted}
                </p>
              )}
            </div>

            {storageError && (
              <p role="alert" className="flex items-start gap-2 text-sm text-[#FFD38A]">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {storageError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  setFieldErrors({});
                  setStep(1);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#777B73] px-5 py-3 text-sm font-semibold hover:border-[var(--color-accent-fill)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Atrás
              </button>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 text-sm font-semibold text-[#171A17] hover:bg-[#E3B56C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Confirmar orden <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="checkout-step-3-heading">
          <h3
            id="checkout-step-3-heading"
            ref={headingRef}
            tabIndex={-1}
            className="font-editorial text-2xl text-[#F4F1EA] focus:outline-none sm:text-3xl"
          >
            Pago de demostración
          </h3>
          <div className="my-5 w-full rounded-sm bg-[#E8B23D] p-4 text-center font-bold text-[#171A17] sm:p-5">
            SIMULACIÓN: ningún pago se procesa
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-[#C4C0B6]">
            En el sitio real, continuarías a una pasarela de pago. Esta pantalla es genérica y local;
            no usa la marca de Flow ni envía datos a ningún servicio.
          </p>
          <div className="mt-5 rounded-sm border border-[#2C3A32] bg-[#131B17] p-4 sm:p-5">
            <p className="text-xs text-[#C4C0B6]">Orden de demostración</p>
            <p className="mt-1 font-tabular text-[var(--color-accent-fill)]">{currentOrder?.orderId ?? '—'}</p>
            <p className="mt-3 text-sm">
              {serviceName} · {activeTierLabel} · <strong>{activeAmount}</strong>
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => updateCurrentOrder('aprobada-demo')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-4 py-3 text-sm font-semibold text-[#171A17] hover:bg-[#E3B56C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Check className="h-4 w-4" aria-hidden="true" /> Simular pago aprobado
            </button>
            <button
              type="button"
              onClick={() => updateCurrentOrder('rechazada-demo')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#D89483] px-4 py-3 text-sm font-semibold text-[#FFD4C9] hover:bg-[#37221F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD4C9]"
            >
              <X className="h-4 w-4" aria-hidden="true" /> Simular pago rechazado
            </button>
            <button
              type="button"
              onClick={() => updateCurrentOrder('pendiente')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#777B73] px-4 py-3 text-sm font-semibold hover:border-[var(--color-accent-fill)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
            >
              Volver sin pagar
            </button>
          </div>
          {storageError && <p role="alert" className="mt-4 text-sm text-[#FFD38A]">{storageError}</p>}
        </section>
      )}

      {step === 4 && currentOrder && (
        <section aria-labelledby="checkout-step-4-heading">
          <div className="my-5 w-full rounded-sm bg-[#E8B23D] p-4 text-center font-bold text-[#171A17] sm:p-5">
            SIMULACIÓN: ningún pago se procesa
          </div>
          <div
            role="status"
            aria-live="polite"
            className={`rounded-sm border p-5 sm:p-6 ${
              currentOrder.status === 'aprobada-demo'
                ? 'border-[#4A9A74] bg-[#12261E]'
                : currentOrder.status === 'rechazada-demo'
                  ? 'border-[#D89483] bg-[#2C1E1D]'
                  : 'border-[var(--color-accent-fill)] bg-[#2B2519]'
            }`}
          >
            <h3
              id="checkout-step-4-heading"
              ref={headingRef}
              tabIndex={-1}
              className="font-editorial text-2xl text-[#F4F1EA] focus:outline-none sm:text-3xl"
            >
              {currentOrder.status === 'aprobada-demo'
                ? 'Pago aprobado en la simulación'
                : currentOrder.status === 'rechazada-demo'
                  ? 'Pago rechazado en la simulación'
                  : 'Orden pendiente'}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#E6E2D6]">
              {currentOrder.status === 'aprobada-demo'
                ? 'La demostración marcó esta orden como aprobada. No se procesó un pago; en el sitio real recibirías una confirmación por correo.'
                : currentOrder.status === 'rechazada-demo'
                  ? 'La demostración marcó esta orden como rechazada. No se procesó un pago; puedes volver a intentarlo.'
                  : 'Volviste sin pagar. La orden queda pendiente en esta demostración y no se procesó ningún pago.'}
            </p>
            <p className="mt-3 font-tabular text-xs text-[var(--color-accent-fill)]">
              {currentOrder.orderId} · {statusLabel(currentOrder.status)}
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            {currentOrder.status !== 'aprobada-demo' && (
              <button
                type="button"
                onClick={retryPayment}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-fill)] px-5 py-3 text-sm font-semibold text-[#171A17] hover:bg-[#E3B56C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Reintentar simulación <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={scrollToService}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#777B73] px-5 py-3 text-sm font-semibold hover:border-[var(--color-accent-fill)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
            >
              Volver a la ficha del servicio
            </button>
          </div>
        </section>
      )}

      {storageError && step !== 2 && step !== 3 && (
        <p role="alert" className="mt-4 text-sm text-[#FFD38A]">{storageError}</p>
      )}

      <details className="mt-8 border-t border-[#2C3A32] pt-5">
        <summary className="cursor-pointer rounded-sm py-2 text-sm font-semibold text-[var(--color-accent-fill)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]">
          Así se verá en el panel de Geraldine ({orders.length})
        </summary>
        <div className="mt-4 overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-sm text-[#C4C0B6]">Todavía no hay órdenes de demostración en este navegador.</p>
          ) : (
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">Órdenes guardadas solo en este navegador</caption>
              <thead>
                <tr className="border-b border-[#495A4F] text-xs text-[#D6D0C6]">
                  <th scope="col" className="px-2 py-3">Orden</th>
                  <th scope="col" className="px-2 py-3">Fecha</th>
                  <th scope="col" className="px-2 py-3">Servicio</th>
                  <th scope="col" className="px-2 py-3">Tarifa</th>
                  <th scope="col" className="px-2 py-3">Nombre</th>
                  <th scope="col" className="px-2 py-3">Correo</th>
                  <th scope="col" className="px-2 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-[#2C3A32] align-top">
                    <th scope="row" className="px-2 py-3 font-tabular text-xs">{order.orderId}</th>
                    <td className="px-2 py-3">{formatOrderDate(order.createdAt)}</td>
                    <td className="px-2 py-3">{order.service}</td>
                    <td className="px-2 py-3">{order.tariff}</td>
                    <td className="px-2 py-3">{order.name}</td>
                    <td className="break-all px-2 py-3">{order.email}</td>
                    <td className="px-2 py-3">{statusLabel(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {storageError && <p role="alert" className="mt-3 text-sm text-[#FFD38A]">{storageError}</p>}
          <button
            type="button"
            onClick={clearDemoOrders}
            disabled={orders.length === 0}
            className="mt-4 inline-flex min-h-11 items-center rounded-sm border border-[#777B73] px-4 py-2 text-sm font-semibold hover:border-[#D89483] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-fill)]"
          >
            Borrar datos de la demo
          </button>
          <p className="mt-2 text-xs leading-relaxed text-[#C4C0B6]">
            Estos datos quedan únicamente en el almacenamiento local de este navegador.
          </p>
        </div>
      </details>
    </div>
  );
}
