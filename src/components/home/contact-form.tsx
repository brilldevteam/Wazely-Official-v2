"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Copy, Send } from "lucide-react";
import { useId, useState } from "react";
import type { FormEvent } from "react";

import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const topics = [
  "Wazely CRM",
  "Wazely ERP",
  "Wazely Color",
  "Not sure yet",
] as const;

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10)
    e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

// Contact form. There is no form backend: on submit it opens the visitor's
// email app with a pre-filled message to siteConfig.contact.email.
export function ContactForm() {
  const reduce = useSafeReducedMotion();
  const id = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [topic, setTopic] = useState<(typeof topics)[number]>("Wazely CRM");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const to = siteConfig.contact.email;

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (Object.keys(found) as (keyof Fields)[])[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const subject = `${topic} enquiry from ${fields.name.trim()}`;
    const lines = [`Name: ${fields.name.trim()}`];
    if (fields.company.trim()) lines.push(`Company: ${fields.company.trim()}`);
    lines.push(`Email: ${fields.email.trim()}`);
    if (fields.phone.trim()) lines.push(`Phone: ${fields.phone.trim()}`);
    lines.push(`Interested in: ${topic}`, "", fields.message.trim());
    const body = lines.join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(to);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    cn(
      "bg-wz-surface-2 text-wz-ink placeholder:text-wz-muted/70 w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-wz-brand focus:shadow-[0_0_0_4px_var(--wz-brand-soft)]",
      hasError ? "border-[#e5484d]" : "border-wz-line",
    );

  const field = (
    key: keyof Fields,
    label: string,
    opts: {
      required?: boolean;
      type?: string;
      placeholder: string;
      autoComplete?: string;
    },
  ) => (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`${id}-${key}`}
        className="text-wz-ink text-sm font-medium"
      >
        {label}
        {opts.required ? (
          <span className="ml-0.5 text-[#e5484d]">*</span>
        ) : null}
      </label>
      <input
        id={`${id}-${key}`}
        type={opts.type ?? "text"}
        value={fields[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={opts.placeholder}
        autoComplete={opts.autoComplete}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${id}-${key}-error` : undefined}
        className={inputClass(Boolean(errors[key]))}
      />
      {errors[key] ? (
        <p id={`${id}-${key}-error`} className="text-[13px] text-[#e5484d]">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="bg-wz-surface border-wz-line relative overflow-hidden rounded-[28px] border p-6 shadow-[0_40px_90px_-50px_rgb(var(--wz-shadow)/0.55)] sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={reduce ? false : { scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="bg-wz-brand-soft text-wz-brand grid size-16 place-items-center rounded-2xl"
            >
              <CircleCheck aria-hidden="true" className="size-8" />
            </motion.span>
            <h3 className="text-wz-ink mt-6 text-2xl font-bold tracking-tight">
              Your email is ready to send
            </h3>
            <p className="text-wz-muted mt-2 max-w-[40ch] text-[15px] leading-relaxed">
              We opened your email app with the message filled in. Press send
              there and we will get back to you.
            </p>
            <p className="text-wz-muted mt-6 text-sm">
              Nothing opened? Email us directly:
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`mailto:${to}`}
                className="text-wz-brand font-semibold underline-offset-4 hover:underline"
              >
                {to}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="border-wz-line text-wz-muted hover:text-wz-brand hover:border-wz-brand inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
              >
                <Copy aria-hidden="true" className="size-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setFields(empty);
              }}
              className="text-wz-brand mt-8 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            className="space-y-5"
          >
            <div>
              <p className="text-wz-ink text-2xl font-bold tracking-tight">
                Send us a message
              </p>
              <p className="text-wz-muted mt-1.5 text-[15px]">
                We usually reply within one business day.
              </p>
            </div>

            <fieldset>
              <legend className="text-wz-ink mb-2 text-sm font-medium">
                What is it about?
              </legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const active = t === topic;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTopic(t)}
                      className={cn(
                        "relative rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors",
                        active
                          ? "border-wz-brand text-wz-on-brand"
                          : "border-wz-line text-wz-muted hover:border-wz-brand hover:text-wz-brand",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="contact-topic"
                          className="bg-wz-brand absolute inset-0 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      ) : null}
                      <span className="relative">{t}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", "Full name", {
                required: true,
                placeholder: "Your name",
                autoComplete: "name",
              })}
              {field("company", "Company", {
                placeholder: "Company name",
                autoComplete: "organization",
              })}
              {field("email", "Work email", {
                required: true,
                type: "email",
                placeholder: "you@company.com",
                autoComplete: "email",
              })}
              {field("phone", "Phone or WhatsApp", {
                type: "tel",
                placeholder: "+974 ...",
                autoComplete: "tel",
              })}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor={`${id}-message`}
                className="text-wz-ink text-sm font-medium"
              >
                Message<span className="ml-0.5 text-[#e5484d]">*</span>
              </label>
              <textarea
                id={`${id}-message`}
                rows={4}
                value={fields.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell us about your team and what you need."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? `${id}-message-error` : undefined
                }
                className={cn(
                  inputClass(Boolean(errors.message)),
                  "resize-none",
                )}
              />
              {errors.message ? (
                <p
                  id={`${id}-message-error`}
                  className="text-[13px] text-[#e5484d]"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="wz-shine group bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong flex h-13 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold shadow-[0_14px_30px_-14px_rgb(10_155_161/0.8)] transition-[background-color,transform] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
            >
              Send message
              <Send
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </button>
            <p className="text-wz-muted text-center text-xs">
              Sending opens your email app with this message filled in.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
