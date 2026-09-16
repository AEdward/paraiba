import type { Metadata } from "next";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { toggleRead, deleteMessage } from "./actions";

export const metadata: Metadata = { title: "Messages" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Messages
      </h1>
      <p className="mt-1 text-sm opacity-60">Submissions from the /contact form.</p>

      <div className="mt-8 flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl border p-5"
            style={{
              borderColor: "var(--border-soft)",
              background: message.read ? "var(--surface)" : "color-mix(in srgb, var(--color-teal) 6%, var(--surface))",
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold" style={{ color: "var(--ink)" }}>
                  {message.name}
                </p>
                <a href={`mailto:${message.email}`} className="text-sm opacity-60 hover:opacity-100">
                  {message.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs opacity-50">
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(
                    message.createdAt,
                  )}
                </p>
                <form action={toggleRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="read" value={String(message.read)} />
                  <button type="submit" className="text-sm font-medium" style={{ color: "var(--color-teal)" }}>
                    {message.read ? "Mark unread" : "Mark read"}
                  </button>
                </form>
                <DeleteButton action={deleteMessage} id={message.id} label="message" />
              </div>
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap opacity-80">{message.message}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <div
            className="rounded-2xl border p-8 text-center opacity-50"
            style={{ borderColor: "var(--border-soft)" }}
          >
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
