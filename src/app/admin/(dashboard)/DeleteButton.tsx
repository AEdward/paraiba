"use client";

export function DeleteButton({
  action,
  id,
  label,
}: {
  action: (formData: FormData) => void;
  id: string;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete this ${label}? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="font-medium" style={{ color: "var(--color-ember)" }}>
        Delete
      </button>
    </form>
  );
}
