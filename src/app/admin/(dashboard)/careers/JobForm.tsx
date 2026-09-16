import type { JobPosting } from "@/generated/prisma/client";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

export function JobForm({
  job,
  action,
  submitLabel,
}: {
  job?: JobPosting;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="title" className={labelClass} style={{ color: "var(--ink)" }}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={job?.title}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className={labelClass} style={{ color: "var(--ink)" }}>
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={job?.location}
            placeholder="Addis Ababa · Remote"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="type" className={labelClass} style={{ color: "var(--ink)" }}>
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={job?.type ?? "Full-time"}
            className={inputClass}
            style={inputStyle}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass} style={{ color: "var(--ink)" }}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={job?.description}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="status" className={labelClass} style={{ color: "var(--ink)" }}>
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={job?.status ?? "open"}
          className={inputClass}
          style={inputStyle}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button
        type="submit"
        className="font-display mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-(--color-cream)"
        style={{ background: "var(--color-indigo)" }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
