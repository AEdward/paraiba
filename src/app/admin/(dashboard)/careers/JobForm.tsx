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
          <label htmlFor="category" className={labelClass} style={{ color: "var(--ink)" }}>
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            defaultValue={job?.category ?? "Engineering"}
            placeholder="Engineering"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="level" className={labelClass} style={{ color: "var(--ink)" }}>
            Level
          </label>
          <select
            id="level"
            name="level"
            defaultValue={job?.level ?? "Mid"}
            className={inputClass}
            style={inputStyle}
          >
            <option value="Internship">Internship</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="location" className={labelClass} style={{ color: "var(--ink)" }}>
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={job?.location}
            placeholder="Addis Ababa, Ethiopia"
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
        <div>
          <label htmlFor="workMode" className={labelClass} style={{ color: "var(--ink)" }}>
            Work mode
          </label>
          <select
            id="workMode"
            name="workMode"
            defaultValue={job?.workMode ?? "On-site"}
            className={inputClass}
            style={inputStyle}
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass} style={{ color: "var(--ink)" }}>
          Short summary
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={job?.description}
          placeholder="Shown on the listing card, and as the role's intro if no longer 'About the role' text is set below."
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="aboutRole" className={labelClass} style={{ color: "var(--ink)" }}>
          About the role (optional)
        </label>
        <textarea
          id="aboutRole"
          name="aboutRole"
          rows={4}
          defaultValue={job?.aboutRole ?? ""}
          placeholder="Longer intro shown on the role's own page. Falls back to the short summary above if left blank."
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="responsibilities" className={labelClass} style={{ color: "var(--ink)" }}>
          What you&apos;ll do (optional, one per line)
        </label>
        <textarea
          id="responsibilities"
          name="responsibilities"
          rows={4}
          defaultValue={job?.responsibilities ?? ""}
          placeholder={"Ship features end-to-end\nWrite and consume REST APIs\n..."}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="niceToHave" className={labelClass} style={{ color: "var(--ink)" }}>
          Nice to have (optional, one per line)
        </label>
        <textarea
          id="niceToHave"
          name="niceToHave"
          rows={3}
          defaultValue={job?.niceToHave ?? ""}
          placeholder={"Experience with Tailwind CSS\nExposure to PostgreSQL\n..."}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="techStack" className={labelClass} style={{ color: "var(--ink)" }}>
          Tech stack (optional, comma-separated)
        </label>
        <input
          id="techStack"
          name="techStack"
          defaultValue={job?.techStack ?? ""}
          placeholder="TypeScript, Next.js, React, PostgreSQL"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="howToApply" className={labelClass} style={{ color: "var(--ink)" }}>
          How to apply (optional)
        </label>
        <textarea
          id="howToApply"
          name="howToApply"
          rows={3}
          defaultValue={job?.howToApply ?? ""}
          placeholder="Shown above the application form on the role's page."
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
