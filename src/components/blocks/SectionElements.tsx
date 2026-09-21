import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { ICONS, type MediaRef, type SectionElement } from "@/lib/blocks/types";
import { mediaSrc } from "@/lib/media";
import { resolveEmbed } from "@/lib/embed";

const headingSizes: Record<number, string> = {
  1: "text-4xl sm:text-5xl",
  2: "text-3xl sm:text-4xl",
  3: "text-2xl sm:text-3xl",
  4: "text-xl sm:text-2xl",
  5: "text-lg sm:text-xl",
  6: "text-base sm:text-lg",
};

const buttonBase =
  "font-display inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5";

function PrimaryButton({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className={`${buttonBase} text-white`} style={{ background: "var(--color-ember)" }}>
      {label} <ArrowRight size={15} />
    </Link>
  );
}

function SecondaryButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className={`${buttonBase} border`}
      style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
    >
      {label}
    </Link>
  );
}

function MediaImage({
  refImage,
  className,
  sizes,
}: {
  refImage: MediaRef;
  className?: string;
  sizes?: string;
}) {
  const src = mediaSrc(refImage);
  if (!src) return null;
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={refImage.alt ?? ""}
        fill
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        style={{ objectFit: "cover" }}
        unoptimized
      />
    </div>
  );
}

export function renderSectionElement(element: SectionElement) {
  switch (element.type) {
    case "heading": {
      const { level, text, align } = element.data;
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag
          className={`font-display font-bold ${headingSizes[level]} ${align === "center" ? "text-center" : ""}`}
          style={{ color: "var(--ink)" }}
        >
          {text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className="leading-relaxed whitespace-pre-line opacity-80" style={{ color: "var(--foreground)" }}>
          {element.data.text}
        </p>
      );
    case "list": {
      const { style, items } = element.data;
      const Tag = style === "number" ? "ol" : "ul";
      return (
        <Tag
          className={`flex flex-col gap-2 pl-5 opacity-80 ${style === "number" ? "list-decimal" : "list-disc"}`}
          style={{ color: "var(--foreground)" }}
        >
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote
          className="border-l-4 pl-5 text-lg italic opacity-85"
          style={{ borderColor: "var(--color-ember)", color: "var(--ink)" }}
        >
          <p>&ldquo;{element.data.text}&rdquo;</p>
          {element.data.citation && <cite className="mt-2 block text-sm not-italic opacity-60">— {element.data.citation}</cite>}
        </blockquote>
      );
    case "pullquote":
      return (
        <div className="py-2 text-center">
          <p
            className="font-display mx-auto max-w-xl text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-ember)" }}
          >
            &ldquo;{element.data.text}&rdquo;
          </p>
          {element.data.citation && <p className="mt-3 text-sm opacity-60">— {element.data.citation}</p>}
        </div>
      );
    case "code":
      return (
        <div>
          <pre
            className="overflow-x-auto rounded-xl border p-4 font-mono text-sm"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
          >
            <code>{element.data.code}</code>
          </pre>
          {element.data.language && <p className="mt-1.5 text-xs opacity-50">{element.data.language}</p>}
        </div>
      );
    case "preformatted":
      return (
        <pre
          className="overflow-x-auto rounded-xl border p-4 font-mono text-sm whitespace-pre-wrap"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--foreground)" }}
        >
          {element.data.text}
        </pre>
      );
    case "details":
      return (
        <details
          className="group rounded-xl border p-4"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
        >
          <summary
            className="flex cursor-pointer list-none items-center justify-between font-semibold"
            style={{ color: "var(--ink)" }}
          >
            {element.data.summary}
            <ChevronDown size={16} className="opacity-60 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 opacity-75">{element.data.body}</p>
        </details>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border-soft)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: "var(--surface)" }}>
                {element.data.headers.map((h, i) => (
                  <th key={i} className="border-b px-4 py-2.5 font-semibold" style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {element.data.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border-b px-4 py-2.5 opacity-75" style={{ borderColor: "var(--border-soft)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image": {
      const src = mediaSrc(element.data.image);
      if (!src) return null;
      return (
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image src={src} alt={element.data.image.alt ?? ""} fill style={{ objectFit: "cover" }} unoptimized />
          </div>
          {element.data.caption && <figcaption className="mt-2 text-center text-sm opacity-60">{element.data.caption}</figcaption>}
        </figure>
      );
    }
    case "gallery": {
      const images = element.data.images.filter((img) => mediaSrc(img));
      if (images.length === 0) return null;
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <MediaImage key={img.id} refImage={img} className="aspect-square rounded-xl" sizes="33vw" />
          ))}
        </div>
      );
    }
    case "video": {
      if (!element.data.url) return null;
      const embed = resolveEmbed(element.data.url);
      return (
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-2xl" style={{ background: "#000" }}>
            {embed.kind === "iframe" ? (
              <iframe src={embed.src} className="absolute inset-0 h-full w-full" allowFullScreen title="Video" />
            ) : (
              <video src={element.data.url} controls className="absolute inset-0 h-full w-full" />
            )}
          </div>
          {element.data.caption && <figcaption className="mt-2 text-center text-sm opacity-60">{element.data.caption}</figcaption>}
        </figure>
      );
    }
    case "audio":
      if (!element.data.url) return null;
      return (
        <figure>
          <audio src={element.data.url} controls className="w-full" />
          {element.data.caption && <figcaption className="mt-2 text-sm opacity-60">{element.data.caption}</figcaption>}
        </figure>
      );
    case "file":
      if (!element.data.url) return null;
      return (
        <Link
          href={element.data.url}
          className="inline-flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
        >
          <Download size={16} style={{ color: "var(--color-ember)" }} />
          {element.data.label}
        </Link>
      );
    case "cover": {
      const src = mediaSrc(element.data.image);
      return (
        <div className="relative flex min-h-[320px] items-center overflow-hidden rounded-2xl">
          {src && <Image src={src} alt="" fill style={{ objectFit: "cover" }} unoptimized />}
          <div aria-hidden className="absolute inset-0 bg-black/45" />
          <div className="relative mx-auto max-w-lg px-8 py-16 text-center text-white">
            {element.data.heading && (
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{element.data.heading}</h3>
            )}
            {element.data.body && <p className="mt-3 opacity-90">{element.data.body}</p>}
            {element.data.buttonLabel && element.data.buttonHref && (
              <Link
                href={element.data.buttonHref}
                className="font-display mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              >
                {element.data.buttonLabel} <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      );
    }
    case "mediaText": {
      const reversed = element.data.mediaPosition === "right";
      return (
        <div className={`grid items-center gap-8 sm:grid-cols-2 ${reversed ? "sm:[&>*:first-child]:order-2" : ""}`}>
          <MediaImage refImage={element.data.image} className="aspect-[4/3] rounded-2xl" />
          <div>
            {element.data.heading && (
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
                {element.data.heading}
              </h3>
            )}
            {element.data.body && <p className="mt-3 opacity-70">{element.data.body}</p>}
          </div>
        </div>
      );
    }
    case "icon": {
      const Icon = ICONS[element.data.icon];
      return (
        <div className="flex flex-col items-center gap-2 text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(150deg, color-mix(in srgb, var(--color-ember) 35%, transparent) 0%, color-mix(in srgb, var(--color-ember) 12%, transparent) 100%)",
            }}
          >
            <Icon size={28} style={{ color: "var(--color-ember)" }} />
          </span>
          {element.data.label && <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{element.data.label}</p>}
        </div>
      );
    }
    case "buttons":
      return (
        <div className="flex flex-wrap gap-3">
          {element.data.buttons.map((btn, i) =>
            btn.style === "secondary" ? (
              <SecondaryButton key={i} label={btn.label} href={btn.href} />
            ) : (
              <PrimaryButton key={i} label={btn.label} href={btn.href} />
            ),
          )}
        </div>
      );
    case "columns": {
      const colsClass = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }[
        Math.max(1, Math.min(3, element.data.columns.length)) as 1 | 2 | 3
      ];
      return (
        <div className={`grid gap-8 ${colsClass}`}>
          {element.data.columns.map((col, i) => (
            <div key={i} className="flex flex-col gap-6">
              {col.map((child) => (
                <div key={child.id}>{renderSectionElement(child)}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case "separator":
      return <hr style={{ borderColor: "var(--border-soft)" }} />;
    case "spacer": {
      const height = { sm: "1.5rem", md: "3rem", lg: "6rem" }[element.data.height];
      return <div style={{ height }} aria-hidden />;
    }
    case "embed": {
      if (!element.data.url) return null;
      const embed = resolveEmbed(element.data.url);
      return (
        <figure>
          {embed.kind === "iframe" ? (
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: embed.aspect === "video" ? "16/9" : "1/1" }}
            >
              <iframe src={embed.src} className="absolute inset-0 h-full w-full border-0" allowFullScreen title="Embed" />
            </div>
          ) : (
            <Link
              href={element.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border p-4 text-sm font-medium break-all"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--color-ember)" }}
            >
              {element.data.url}
            </Link>
          )}
          {element.data.caption && <figcaption className="mt-2 text-center text-sm opacity-60">{element.data.caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}
