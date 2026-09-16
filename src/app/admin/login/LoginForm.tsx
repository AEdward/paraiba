"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-(--color-teal)"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--foreground)" }}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-(--color-teal)"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--foreground)" }}
        />
      </div>

      {state.error && <p className="text-sm" style={{ color: "var(--color-ember)" }}>{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="font-display inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: "var(--color-indigo)" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
