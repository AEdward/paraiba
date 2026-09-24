import type { NavItem } from "@/generated/prisma/client";

const inputClass = "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

export function NavItemForm({
  item,
  action,
  submitLabel,
}: {
  item?: NavItem;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-lg flex-col gap-5">
      <div>
        <label htmlFor="label" className={labelClass} style={{ color: "var(--ink)" }}>
          Label
        </label>
        <input
          id="label"
          name="label"
          required
          defaultValue={item?.label}
          placeholder="e.g. Solutions"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="href" className={labelClass} style={{ color: "var(--ink)" }}>
          Link
        </label>
        <input
          id="href"
          name="href"
          required
          defaultValue={item?.href}
          placeholder="/solutions or https://…"
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">
          A path to a page on this site (e.g. <code>/solutions</code>) or a full external URL. If
          it points at a page that gets unpublished, this link disappears automatically.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className={labelClass} style={{ color: "var(--ink)" }}>
            Show in
          </label>
          <select
            id="location"
            name="location"
            defaultValue={item?.location ?? "both"}
            className={inputClass}
            style={inputStyle}
          >
            <option value="header">Header only</option>
            <option value="footer">Footer only</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label htmlFor="order" className={labelClass} style={{ color: "var(--ink)" }}>
            Order
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={item?.order ?? 0}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="group" className={labelClass} style={{ color: "var(--ink)" }}>
          Group — optional
        </label>
        <input
          id="group"
          name="group"
          defaultValue={item?.group ?? ""}
          placeholder="e.g. Company"
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">
          Items sharing the same group name are combined into one dropdown (header) or one column
          (footer) labeled with that name. Leave empty for a plain top-level link.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm" style={{ color: "var(--ink)" }}>
        <input type="checkbox" name="newTab" defaultChecked={item?.newTab} />
        Open in a new tab
      </label>

      <button
        type="submit"
        className="font-display w-fit rounded-lg px-5 py-2.5 text-sm font-semibold text-(--color-cream)"
        style={{ background: "var(--color-indigo)" }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
