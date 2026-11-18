'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { business } from '@/content/business';
import { availableDays, equipmentTypes, requestTypes, timeWindows, REQUIRED_INPUT_COUNT } from '@/lib/booking';
import { fireConversionEvent } from '@/lib/analytics';
import { CallButton } from './CtaButtons';
import { PhoneIcon } from './Icons';

type Errors = Record<string, string>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues = {
  fullName: '', phone: '', email: '', zip: '', requestType: 'Repair',
  timeWindow: 'Any', equipmentType: 'Other', preferredDay: 'Any', message: '',
  streetAddress: '', customerStatus: '', planMember: '', website: '',
};

function Field({ id, label, error, required, children, hint }: {
  id: string; label: string; error?: string; required?: boolean; children: ReactNode; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-brand-dark">
        {label} {required ? <span className="text-cta" aria-hidden="true">*</span> : <span className="font-normal text-muted">(optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mb-1 text-xs text-muted">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-cta-dark">{error}</p>}
    </div>
  );
}

const inputClass = 'w-full rounded-lg border border-line bg-white px-3 py-3 text-base text-ink min-h-[48px] focus:border-brand';

/** PRD 16.6: 6 required inputs, emergency-first, progressive disclosure, accessible errors. */
export function BookingForm() {
  const [values, setValues] = useState(initialValues);
  const [emergency, setEmergency] = useState<'yes' | 'no' | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [deliveryConfigured, setDeliveryConfigured] = useState(true);
  const [serverMessage, setServerMessage] = useState('');
  const [serverUnavailable, setServerUnavailable] = useState(false);
  const days = availableDays();

  useEffect(() => {
    // /request-estimate/ 301s here with ?type=Estimate (PRD 16.4 #3).
    const type = new URLSearchParams(window.location.search).get('type');
    if (type && (requestTypes as readonly string[]).includes(type)) {
      setValues((v) => ({ ...v, requestType: type }));
    }
  }, []);

  const set = (key: keyof typeof initialValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (emergency === null) next.emergency = 'Please answer this question so we can route your request.';
    if (values.fullName.trim().length < 2) next.fullName = 'Please enter your name';
    if (!/^[0-9()+\-.\s]{7,20}$/.test(values.phone.trim())) next.phone = 'Enter a phone number we can reach';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (!/^\d{5}$/.test(values.zip.trim())) next.zip = 'Enter a 5-digit ZIP code';
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      document.getElementById(Object.keys(clientErrors)[0])?.focus();
      return;
    }
    setStatus('submitting');
    setServerMessage('');
    setServerUnavailable(false);
    try {
      const payload = {
        fullName: values.fullName.trim(), phone: values.phone.trim(), email: values.email.trim(),
        zip: values.zip.trim(), requestType: values.requestType, timeWindow: values.timeWindow,
        equipmentType: values.equipmentType, preferredDay: values.preferredDay,
        message: values.message.trim(), streetAddress: values.streetAddress.trim(),
        ...(values.customerStatus ? { customerStatus: values.customerStatus } : {}),
        ...(values.planMember ? { planMember: values.planMember } : {}),
        emergency: emergency === 'yes', website: values.website,
      };
      const response = await fetch('/api/booking/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        setServerMessage(result.message || 'Please check the highlighted fields.');
        setServerUnavailable(Boolean(result.unavailable) || response.status >= 500 || response.status === 429);
        setStatus('error');
        return;
      }
      setDeliveryConfigured(Boolean(result.delivery?.delivered));
      fireConversionEvent('booking_submit', { request_type: values.requestType, emergency: emergency === 'yes' });
      setStatus('success');
    } catch {
      setServerMessage('We could not send your request. Please call us instead.');
      setServerUnavailable(true);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-line bg-white p-6">
        <h2 className="text-2xl font-bold text-brand-dark">Thanks, {values.fullName.trim().split(' ')[0]} — we have your request.</h2>
        <p className="mt-3 leading-7 text-ink">We will contact you about your {values.requestType.toLowerCase()} request.</p>
        <p className="mt-2 leading-7 text-muted">Our office is open {business.hours.office}. {business.hours.emergency}. {business.hours.afterHours}</p>
        {!deliveryConfigured && (
          <p className="mt-4 rounded-lg bg-[#fff6e9] p-3 text-sm text-ink">
            Test mode: email delivery is not configured on this deployment, so the office inbox and the customer confirmation were not sent. Set the environment variables in .env.example before launch.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <CallButton />
          <Link href="/" className="btn btn-outline">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <fieldset className="rounded-xl border-2 border-brand bg-brand-soft p-4">
        <legend className="px-2 text-base font-bold text-brand-dark">First: is this an emergency?</legend>
        <p className="text-sm text-muted">No heat, no cooling, water leak or unusual smell.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {(['yes', 'no'] as const).map((option) => (
            <label key={option} className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg border px-4 font-semibold ${emergency === option ? 'border-brand bg-white text-brand-dark' : 'border-line bg-white text-ink'}`}>
              <input type="radio" name="emergency" value={option} checked={emergency === option} onChange={() => { setEmergency(option); setErrors((e) => ({ ...e, emergency: '' })); }} className="h-5 w-5 accent-[#004b93]" />
              {option === 'yes' ? 'Yes, it is' : 'No, it can wait'}
            </label>
          ))}
        </div>
        {errors.emergency && <p role="alert" id="emergency-error" className="mt-2 text-sm font-medium text-cta-dark">{errors.emergency}</p>}
      </fieldset>

      {emergency === 'yes' && (
        <div className="mt-5 rounded-xl border-2 border-cta bg-[#fff6e9] p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-dark"><PhoneIcon /> Call us now — fastest for emergencies</h2>
          <p className="mt-2 leading-7 text-ink">{business.hours.emergency}. {business.hours.afterHours}</p>
          <CallButton className="mt-4 w-full sm:w-auto" />
          <p className="mt-3 text-sm text-muted">Prefer to write it down? The form below is a secondary option.</p>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <h2 className="text-xl font-bold text-brand-dark">{emergency === 'yes' ? 'Or send a request' : 'Your request'}</h2>
        <p className="text-sm text-muted">{REQUIRED_INPUT_COUNT} required fields. No state dropdown. Takes under a minute.</p>
        {serverMessage && <p role="alert" className="rounded-lg bg-[#fff0ec] p-3 text-sm font-medium text-cta-dark">{serverMessage}</p>}
        {serverUnavailable && (
          <div className="rounded-xl border-2 border-cta bg-[#fff6e9] p-4">
            <p className="font-semibold text-brand-dark">Please call us — we do not want to lose your request.</p>
            <CallButton className="mt-3" />
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required error={errors.fullName}>
            <input id="fullName" name="fullName" autoComplete="name" required value={values.fullName} onChange={(e) => set('fullName', e.target.value)} className={inputClass} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone}>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(e) => set('email', e.target.value)} className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          </Field>
          <Field id="zip" label="ZIP code" required error={errors.zip} hint="5 digits — enough to confirm we serve your area.">
            <input id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} required value={values.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, ''))} className={inputClass} aria-invalid={Boolean(errors.zip)} aria-describedby={errors.zip ? 'zip-error' : 'zip-hint'} />
          </Field>
          <Field id="requestType" label="What do you need?" required error={errors.requestType}>
            <select id="requestType" name="requestType" required value={values.requestType} onChange={(e) => set('requestType', e.target.value)} className={inputClass} aria-invalid={Boolean(errors.requestType)} aria-describedby={errors.requestType ? 'requestType-error' : undefined}>
              {requestTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </Field>
          <Field id="timeWindow" label="Preferred time window" required error={errors.timeWindow}>
            <select id="timeWindow" name="timeWindow" required value={values.timeWindow} onChange={(e) => set('timeWindow', e.target.value)} className={inputClass} aria-invalid={Boolean(errors.timeWindow)} aria-describedby={errors.timeWindow ? 'timeWindow-error' : undefined}>
              {timeWindows.map((window) => <option key={window} value={window}>{window}</option>)}
            </select>
          </Field>
          <Field id="equipmentType" label="Equipment type" error={errors.equipmentType}>
            <select id="equipmentType" name="equipmentType" value={values.equipmentType} onChange={(e) => set('equipmentType', e.target.value)} className={inputClass}>
              {equipmentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </Field>
          <Field id="preferredDay" label="Preferred day" error={errors.preferredDay}>
            <select id="preferredDay" name="preferredDay" value={values.preferredDay} onChange={(e) => set('preferredDay', e.target.value)} className={inputClass}>
              {days.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
          </Field>
        </div>

        <Field id="message" label="Anything else we should know?" error={errors.message}>
          <textarea id="message" name="message" rows={3} value={values.message} onChange={(e) => set('message', e.target.value)} className={inputClass} />
        </Field>

        <details className="group rounded-xl border border-line p-3">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
            More details (optional) <span className="text-sm font-normal text-brand group-open:hidden">Show</span><span className="hidden text-sm font-normal text-brand group-open:inline">Hide</span>
          </summary>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field id="streetAddress" label="Street address">
              <input id="streetAddress" name="streetAddress" autoComplete="street-address" value={values.streetAddress} onChange={(e) => set('streetAddress', e.target.value)} className={inputClass} />
            </Field>
            <Field id="customerStatus" label="New or existing customer?">
              <select id="customerStatus" name="customerStatus" value={values.customerStatus} onChange={(e) => set('customerStatus', e.target.value)} className={inputClass}>
                <option value="">Prefer not to say</option><option value="New">New</option><option value="Existing">Existing</option>
              </select>
            </Field>
            <Field id="planMember" label="Maintenance plan member?">
              <select id="planMember" name="planMember" value={values.planMember} onChange={(e) => set('planMember', e.target.value)} className={inputClass}>
                <option value="">Prefer not to say</option><option value="Yes">Yes</option><option value="No">No</option>
              </select>
            </Field>
          </div>
        </details>

        {/* Honeypot — hidden from people, visible to naive bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Do not fill this in</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
        </div>

        <button type="submit" disabled={status === 'submitting'} className="btn btn-cta w-full text-lg disabled:opacity-60">
          {status === 'submitting' ? 'Sending…' : 'Send my request'}
        </button>
        <p className="text-center text-sm text-muted">
          We will contact you about your request. Office: {business.hours.office}. No response time is promised.
        </p>
      </form>
    </div>
  );
}
