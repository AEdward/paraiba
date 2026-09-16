import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-20">
      <div
        className="w-full max-w-sm rounded-2xl border p-8 shadow-[0_1px_2px_rgba(22,35,63,0.04),0_20px_36px_-16px_rgba(22,35,63,0.22)]"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <Logo size={40} />
        <h1 className="font-display mt-6 text-xl font-bold" style={{ color: "var(--ink)" }}>
          Admin sign in
        </h1>
        <p className="mt-1 text-sm opacity-60">Meskeday Technologies Group</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
