"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, {});

  return (
    <form action={formAction} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Name
        </label>
        <input id="name" name="name" required className={inputClass} style={inputStyle} />
      </div>
      <div className="flex-1">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} style={inputStyle} />
      </div>
      <div className="flex-1">
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Temporary password
        </label>
        <input id="password" name="password" type="password" required minLength={8} className={inputClass} style={inputStyle} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="font-display inline-flex h-fit items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-(--color-cream) disabled:opacity-60"
        style={{ background: "var(--color-indigo)" }}
      >
        {pending ? "Adding…" : "Add teammate"}
      </button>
      {state.error && (
        <p className="w-full text-sm sm:basis-full" style={{ color: "var(--color-ember)" }}>
          {state.error}
        </p>
      )}
    </form>
  );
}
