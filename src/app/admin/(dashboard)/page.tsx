import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban, Briefcase, UserCheck, Mail, Users } from "lucide-react";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Admin Overview" };
export const dynamic = "force-dynamic";

async function getStats() {
  const [projectCount, liveProjectCount, openJobCount, newApplicantCount, unreadMessageCount, userCount] =
    await Promise.all([
      db.project.count(),
      db.project.count({ where: { status: "live" } }),
      db.jobPosting.count({ where: { status: "open" } }),
      db.jobApplication.count({ where: { status: "new" } }),
      db.contactSubmission.count({ where: { read: false } }),
      db.user.count(),
    ]);
  return { projectCount, liveProjectCount, openJobCount, newApplicantCount, unreadMessageCount, userCount };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const tiles = [
    {
      label: "Projects",
      value: stats.projectCount,
      sub: `${stats.liveProjectCount} live`,
      icon: FolderKanban,
      href: "/admin/projects",
      accent: "var(--color-teal)",
    },
    {
      label: "Open positions",
      value: stats.openJobCount,
      sub: "on the careers page",
      icon: Briefcase,
      href: "/admin/careers",
      accent: "var(--color-amber)",
    },
    {
      label: "New applicants",
      value: stats.newApplicantCount,
      sub: "awaiting review",
      icon: UserCheck,
      href: "/admin/applicants?status=new",
      accent: "var(--color-teal)",
    },
    {
      label: "Unread messages",
      value: stats.unreadMessageCount,
      sub: "from the contact form",
      icon: Mail,
      href: "/admin/messages",
      accent: "var(--color-ember)",
    },
    {
      label: "Admin users",
      value: stats.userCount,
      sub: "with dashboard access",
      icon: Users,
      href: "/admin/users",
      accent: "var(--color-indigo)",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Overview
      </h1>
      <p className="mt-1 text-sm opacity-60">
        Live counts from the database. This is not visitor analytics — just what&apos;s
        actually stored right now.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.label}
              href={tile.href}
              className="rounded-2xl border p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `color-mix(in srgb, ${tile.accent} 16%, transparent)` }}
              >
                <Icon size={16} style={{ color: tile.accent }} />
              </span>
              <p className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
                {tile.value}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--ink)" }}>
                {tile.label}
              </p>
              <p className="text-xs opacity-50">{tile.sub}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
