import type { Partner } from "@/generated/prisma/client";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

export function PartnerForm({
  partner,
  action,
  submitLabel,
}: {
  partner?: Partner;
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
          defaultValue={partner?.name}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="logoUrl" className={labelClass} style={{ color: "var(--ink)" }}>
          Logo URL
        </label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          placeholder="https://…/logo.png"
          defaultValue={partner?.logoUrl ?? ""}
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">
          Optional. A wide, transparent-background logo works best. Leave blank to show the
          partner name as a text badge instead.
        </p>
      </div>

      <div>
        <label htmlFor="website" className={labelClass} style={{ color: "var(--ink)" }}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://partner.com"
          defaultValue={partner?.website ?? ""}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="order" className={labelClass} style={{ color: "var(--ink)" }}>
          Display order
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={partner?.order ?? 0}
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">Lower numbers appear first.</p>
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
