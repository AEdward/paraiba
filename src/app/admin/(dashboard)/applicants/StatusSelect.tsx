"use client";

import { APPLICATION_STATUSES, APPLICATION_STATUS_LABELS } from "@/lib/applications";
import { updateApplicationStatus } from "./actions";

export function StatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateApplicationStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none focus:border-(--color-teal)"
        style={{ borderColor: "var(--border-soft)", background: "var(--background)", color: "var(--foreground)" }}
      >
        {APPLICATION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {APPLICATION_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
