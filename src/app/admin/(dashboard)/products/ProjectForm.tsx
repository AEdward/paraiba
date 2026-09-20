import type { Project } from "@/generated/prisma/client";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

export function ProjectForm({
  project,
  action,
  submitLabel,
}: {
  project?: Project;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="name" className={labelClass} style={{ color: "var(--ink)" }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={project?.name}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass} style={{ color: "var(--ink)" }}>
          Slug (URL: /products/…)
        </label>
        <input
          id="slug"
          name="slug"
          required
          defaultValue={project?.slug}
          placeholder="my-project"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="tagline" className={labelClass} style={{ color: "var(--ink)" }}>
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          required
          defaultValue={project?.tagline}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass} style={{ color: "var(--ink)" }}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
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
          defaultValue={project?.status ?? "concept"}
          className={inputClass}
          style={inputStyle}
        >
          <option value="live">Live</option>
          <option value="in-progress">Building</option>
          <option value="concept">Prototype</option>
          <option value="archived">Built · not published</option>
        </select>
      </div>

      <div>
        <label htmlFor="tags" className={labelClass} style={{ color: "var(--ink)" }}>
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={project?.tags}
          placeholder="Product, Fintech"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} className="mt-0.5" />
        <span>
          <span className="font-medium" style={{ color: "var(--ink)" }}>
            Feature this project
          </span>
          <p className="mt-1 text-xs opacity-60">
            Shows it in the large showcase hero above the grid on /products. Only one
            project should be featured at a time — if more than one is checked, the most
            recently created one wins.
          </p>
        </span>
      </label>

      <div>
        <label htmlFor="link" className={labelClass} style={{ color: "var(--ink)" }}>
          Live link (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          defaultValue={project?.link ?? ""}
          placeholder="https://…"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div
        className="rounded-lg border p-4"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          Device mockup preview
        </p>
        <p className="mt-1 text-xs opacity-60">
          Pick how the laptop/phone mockup on the project page gets filled in. GitHub repo
          takes priority if both are set; leave both off to show a screenshot or the
          placeholder instead.
        </p>

        <div className="mt-4">
          <label htmlFor="githubRepo" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
            GitHub repo
          </label>
          <input
            id="githubRepo"
            name="githubRepo"
            defaultValue={project?.githubRepo ?? ""}
            placeholder="owner/repo or a github.com URL"
            className={inputClass}
            style={inputStyle}
          />
          <p className="mt-1 text-xs opacity-50">
            Boots and renders the app live from source via StackBlitz — no deployment
            needed. Works best for JS/web-stack projects; a repo with no runnable frontend
            won&apos;t show much.
          </p>
        </div>

        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="embedLive"
            defaultChecked={project?.embedLive}
            className="mt-0.5"
          />
          <span>
            <span className="font-medium" style={{ color: "var(--ink)" }}>
              Or render the live link above instead of a screenshot
            </span>
            <p className="mt-1 text-xs opacity-60">
              Only works if that site allows being framed (no X-Frame-Options / CSP
              block) — since it&apos;s your own project, you control that.
            </p>
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="screenshot" className={labelClass} style={{ color: "var(--ink)" }}>
          Screenshot URL (optional)
        </label>
        <input
          id="screenshot"
          name="screenshot"
          defaultValue={project?.screenshot ?? ""}
          placeholder="/images/project.png or https://…"
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1 text-xs opacity-50">
          Used when neither preview option above is set. Leave blank to show the
          placeholder device mockup.
        </p>
      </div>

      <div>
        <label className={labelClass} style={{ color: "var(--ink)" }}>
          What We Built (optional)
        </label>
        <RichTextEditor
          name="deliverables"
          defaultValue={project?.deliverables}
          placeholder="e.g. Website — Corporate website, Product catalog"
        />
        <p className="mt-1 text-xs opacity-50">
          Rendered as grouped cards on the project page. Use the heading button to start a
          new group (e.g. &ldquo;Website&rdquo;, &ldquo;ERP&rdquo;), then list its items as
          a bullet list. Leave blank to skip this section.
        </p>
      </div>

      <div>
        <label className={labelClass} style={{ color: "var(--ink)" }}>
          Case Study (optional)
        </label>
        <RichTextEditor
          name="caseStudy"
          defaultValue={project?.caseStudy}
          placeholder="e.g. The Challenge — what problem were we solving?"
        />
        <p className="mt-1 text-xs opacity-50">
          Rendered as numbered sections (01, 02, …) on the project page. Use the heading
          button to start a new section (e.g. &ldquo;The Challenge&rdquo;), then write
          paragraphs and/or bullet points under it. Leave blank to skip this section.
        </p>
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
