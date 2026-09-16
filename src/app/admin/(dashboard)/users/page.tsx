import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DeleteButton } from "../DeleteButton";
import { deleteUser } from "./actions";
import { CreateUserForm } from "./CreateUserForm";

export const metadata: Metadata = { title: "Users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([
    db.user.findMany({ orderBy: { createdAt: "asc" } }),
    getSession(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Users
      </h1>
      <p className="mt-1 text-sm opacity-60">
        Everyone listed here has full access to this dashboard.
      </p>

      <div
        className="mt-8 rounded-2xl border p-6"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <CreateUserForm />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {user.name} {user.id === session?.userId && <span className="opacity-50">(you)</span>}
                </td>
                <td className="px-4 py-3 opacity-70">{user.email}</td>
                <td className="px-4 py-3 text-right">
                  {user.id !== session?.userId && (
                    <DeleteButton action={deleteUser} id={user.id} label="user" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
