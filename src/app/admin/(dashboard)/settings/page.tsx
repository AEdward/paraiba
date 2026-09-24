import type { Metadata } from "next";
import { getSiteSettings, SOCIAL_LINK_KEYS, SOCIAL_LINK_LABELS } from "@/lib/site-settings";
import { updateSiteSettings } from "./actions";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

const inputClass = "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={inputClass}
        style={inputStyle}
      />
    </div>
  );
}

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Settings
      </h1>
      <p className="mt-2 max-w-lg text-sm opacity-60">
        Office location, phone, email, map, and social links — shown on the Contact page and in
        the site footer. One place to keep them in sync everywhere.
      </p>

      <form action={updateSiteSettings} className="mt-8 flex max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-sm font-bold tracking-wide uppercase opacity-60" style={{ color: "var(--ink)" }}>
            Contact details
          </h2>
          <Field label="Office location" name="officeLocation" defaultValue={settings.officeLocation} required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone — optional" name="phone" defaultValue={settings.phone} placeholder="+251 …" />
            <Field label="Email" name="email" defaultValue={settings.email} required type="email" />
          </div>
          <Field
            label="Map embed URL — optional"
            name="mapEmbedUrl"
            defaultValue={settings.mapEmbedUrl}
            placeholder="https://www.google.com/maps/embed?..."
          />
          <p className="-mt-3 text-xs opacity-50">
            On Google Maps: search your location → Share → Embed a map → copy the URL from the{" "}
            <code>src</code> attribute of the given code, and paste it here.
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t pt-6" style={{ borderColor: "var(--border-soft)" }}>
          <h2 className="font-display text-sm font-bold tracking-wide uppercase opacity-60" style={{ color: "var(--ink)" }}>
            Social links
          </h2>
          <p className="-mt-3 text-xs opacity-50">
            Leave a field empty to hide that platform&apos;s icon from the footer and contact page.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {SOCIAL_LINK_KEYS.map((key) => (
              <Field
                key={key}
                label={SOCIAL_LINK_LABELS[key]}
                name={key}
                defaultValue={settings[key]}
                placeholder="https://…"
                type="url"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="font-display w-fit rounded-lg px-5 py-2.5 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          Save settings
        </button>
      </form>
    </div>
  );
}
