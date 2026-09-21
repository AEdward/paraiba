"use client";

// Shared field primitives for both the fixed-shape block editors
// (BlockFields.tsx, uncontrolled — name+defaultValue picked up by the
// enclosing <form>'s native submit) and the freeform section editor
// (SectionEditor.tsx, controlled — passes onChangeValue since its whole
// tree is serialized into one hidden JSON field instead).

import { useState } from "react";
import type { SectionTheme } from "@/lib/blocks/types";

export const inputClass = "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
export const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
export const labelClass = "mb-1.5 block text-sm font-medium";

export function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
  onChangeValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChangeValue?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <div>
      <label htmlFor={name || undefined} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      {onChangeValue ? (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChangeValue(e.target.value);
          }}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 3,
  onChangeValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  onChangeValue?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <div>
      <label htmlFor={name || undefined} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      {onChangeValue ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChangeValue(e.target.value);
          }}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      )}
    </div>
  );
}

export function ThemeField({ defaultValue }: { defaultValue: SectionTheme }) {
  return (
    <div>
      <label htmlFor="theme" className={labelClass} style={{ color: "var(--ink)" }}>
        Theme
      </label>
      <select id="theme" name="theme" defaultValue={defaultValue} className={inputClass} style={inputStyle}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
