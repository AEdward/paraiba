import type { ProductSite } from "@/generated/prisma/client";
import { productSiteLogoSrc } from "@/lib/productSites";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

export function ProductSiteForm({
  site,
  action,
  submitLabel,
  rootDomain,
}: {
  site?: ProductSite;
  action: (formData: FormData) => void;
  submitLabel: string;
  rootDomain: string;
}) {
  const currentLogoSrc = site ? productSiteLogoSrc(site) : null;

  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="name" className={labelClass} style={{ color: "var(--ink)" }}>
          Name
        </label>
        <input id="name" name="name" required defaultValue={site?.name} className={inputClass} style={inputStyle} />
      </div>

      <div>
        <label htmlFor="subdomain" className={labelClass} style={{ color: "var(--ink)" }}>
          Subdomain
        </label>
        <div className="flex items-center gap-2">
          <input
            id="subdomain"
            name="subdomain"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            defaultValue={site?.subdomain}
            className={inputClass}
            style={inputStyle}
          />
          <span className="shrink-0 text-sm opacity-50">.{rootDomain}</span>
        </div>
        <p className="mt-1.5 text-xs opacity-50">
          Lowercase letters, numbers, and hyphens only — e.g. <code>temari</code>.
        </p>
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
              alt={site?.name}
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
          defaultValue={site?.logoUrl ?? ""}
          className={inputClass}
          style={inputStyle}
        />
        <p className="mt-1.5 text-xs opacity-50">Only used when no logo file is uploaded.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="themeColor" className={labelClass} style={{ color: "var(--ink)" }}>
            Theme color
          </label>
          <input
            id="themeColor"
            name="themeColor"
            type="text"
            placeholder="#1e6fd9"
            defaultValue={site?.themeColor ?? ""}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="themeColorSecondary" className={labelClass} style={{ color: "var(--ink)" }}>
            Secondary color
          </label>
          <input
            id="themeColorSecondary"
            name="themeColorSecondary"
            type="text"
            placeholder="#f5a623"
            defaultValue={site?.themeColorSecondary ?? ""}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>
      <p className="-mt-3 text-xs opacity-50">
        Hex colors, e.g. <code>#1e6fd9</code>. Leave blank to use Paraiba&apos;s default palette.
      </p>

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
