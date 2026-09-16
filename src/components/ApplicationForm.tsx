"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none shadow-[inset_0_1px_2px_rgba(22,35,63,0.05)] transition-all focus:border-(--color-teal) focus:shadow-[inset_0_1px_2px_rgba(22,35,63,0.05),0_0_0_3px_color-mix(in_srgb,var(--color-teal)_18%,transparent)]";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};

export function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, jobId }),
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
        className="mt-4 flex flex-col items-center gap-2 rounded-xl border p-6 text-center"
        style={{ borderColor: "var(--border-soft)", background: "var(--background)" }}
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "var(--color-teal)" }}
        >
          <Check size={18} color="var(--color-cream)" />
        </span>
        <h4 className="font-display text-sm font-bold" style={{ color: "var(--ink)" }}>
          Application sent
        </h4>
        <p className="max-w-xs text-xs opacity-70">
          Thanks for applying to {jobTitle} — we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 border-t pt-4" style={{ borderColor: "var(--border-soft)" }}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`name-${jobId}`} className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Name
          </label>
          <input id={`name-${jobId}`} name="name" required className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label htmlFor={`email-${jobId}`} className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Email
          </label>
          <input
            id={`email-${jobId}`}
            name="email"
            type="email"
            required
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`phone-${jobId}`} className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Phone (optional)
          </label>
          <input id={`phone-${jobId}`} name="phone" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label htmlFor={`resume-${jobId}`} className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Resume link (optional)
          </label>
          <input
            id={`resume-${jobId}`}
            name="resumeUrl"
            type="url"
            placeholder="https://…"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`cover-${jobId}`} className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
          Cover letter (optional)
        </label>
        <textarea
          id={`cover-${jobId}`}
          name="coverLetter"
          rows={3}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {status === "error" && <p className="text-xs text-(--color-ember)">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="font-display inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-(--color-cream) disabled:opacity-60"
        style={{ background: "var(--color-indigo)" }}
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
        <ArrowRight size={14} />
      </button>
    </form>
  );
}
