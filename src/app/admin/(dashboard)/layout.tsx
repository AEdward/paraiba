import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Briefcase, FolderKanban, Mail, Users, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { getSession } from "@/lib/auth";
import { logout } from "./actions";

const navLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-full flex-1" style={{ background: "var(--background)" }}>
      <aside
        className="hidden w-60 shrink-0 flex-col border-r px-4 py-6 sm:flex"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <Link href="/" className="px-2">
          <Logo size={32} />
        </Link>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium opacity-75 transition-opacity hover:opacity-100"
                style={{ color: "var(--ink)" }}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t pt-4" style={{ borderColor: "var(--border-soft)" }}>
          <p className="truncate px-3 text-xs opacity-50">{session?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium opacity-75 transition-opacity hover:opacity-100"
              style={{ color: "var(--color-ember)" }}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <nav
          className="flex gap-4 overflow-x-auto border-b px-4 py-3 sm:hidden"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm font-medium opacity-75"
              style={{ color: "var(--ink)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
