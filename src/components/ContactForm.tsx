"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border px-4 py-3 text-sm outline-none shadow-[inset_0_1px_2px_rgba(22,35,63,0.05)] transition-all focus:border-(--color-teal) focus:shadow-[inset_0_1px_2px_rgba(22,35,63,0.05),0_0_0_3px_color-mix(in_srgb,var(--color-teal)_18%,transparent)]";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};

export function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-2xl border p-10 text-center"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--color-teal)" }}
        >
          <Check size={22} color="var(--color-cream)" />
        </span>
        <h3 className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
          Message sent
        </h3>
        <p className="max-w-sm text-sm opacity-70">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Name
        </label>
        <input id="name" name="name" required className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={initialMessage}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {status === "error" && <p className="text-sm text-(--color-ember)">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="font-display inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(22,35,63,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(22,35,63,0.6)] disabled:opacity-60"
        style={{ background: "var(--color-ember)" }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
