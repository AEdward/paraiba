import type { Partner } from "@/generated/prisma/client";
import { partnerLogoSrc } from "@/lib/partners";

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
  const currentLogoSrc = partner ? partnerLogoSrc(partner) : null;

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
        <label className={labelClass} style={{ color: "var(--ink)" }}>
          Logo
        </label>

        {currentLogoSrc && (
          <div className="mb-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentLogoSrc}
              alt={partner?.name}
              className="h-10 w-auto max-w-[160px] rounded border object-contain p-1.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            />
            <label className="flex items-center gap-2 text-xs opacity-70">
              <input type="checkbox" name="removeLogo" value="on" />
              Remove current logo
            </label>
          </div>
        )}

        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:px-3 file:py-1.5 file:text-xs file:font-semibold`}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">
          Upload a logo file (PNG, JPG, SVG — up to 2MB, transparent background works best).
          {currentLogoSrc ? " Uploading a new file replaces the current logo." : ""}
        </p>
      </div>

      <div>
        <label htmlFor="logoUrl" className={labelClass} style={{ color: "var(--ink)" }}>
          Or logo URL
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
          Only used when no logo file is uploaded. Leave everything blank to show the partner
          name as a text badge instead.
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
