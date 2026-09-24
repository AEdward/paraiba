import type { RichDoc } from "./blocks/types";

type DocText = { type: "text"; text: string; marks?: { type: string }[] };
type DocNode = { type: string; content?: (DocNode | DocText)[] };

const t = (text: string, bold = false): DocText =>
  bold ? { type: "text", text, marks: [{ type: "bold" }] } : { type: "text", text };
const p = (...content: DocText[]): DocNode => ({ type: "paragraph", content });
const h = (text: string): DocNode => ({ type: "heading", content: [t(text)] });
const li = (...content: DocText[]): DocNode => ({ type: "listItem", content: [{ type: "paragraph", content }] });
const ul = (...items: DocNode[]): DocNode => ({ type: "bulletList", content: items });
const doc = (...content: DocNode[]): RichDoc => ({ type: "doc", content });

export const LEGAL_LAST_UPDATED = "September 24, 2026";

export const privacyPolicy: RichDoc = doc(
  p(t(
    "Paraiba Technology PLC (\"Paraiba\", \"we\", \"us\") builds and operates this website and the product sites linked from it. This policy explains what personal information we collect through them, why, and how you can control it.",
  )),

  h("Information we collect"),
  p(t("We only collect information you choose to give us, through two forms on this site:")),
  ul(
    li(t("Contact form", true), t(" — your name, email address, and message.")),
    li(
      t("Job applications", true),
      t(" — your name, email, phone number, cover letter, and any documents you upload (resume/CV, portfolio, certificates)."),
    ),
  ),
  p(t(
    "We don't use analytics, advertising, or tracking scripts on this site, so we don't collect browsing behavior, device fingerprints, or similar data beyond what your browser and our hosting provider log automatically for security (like IP address and request timestamps).",
  )),

  h("How we use it"),
  ul(
    li(t("To respond to messages sent through the contact form.")),
    li(t("To review job applications and get in touch about a role.")),
    li(t("To operate and secure the admin dashboard our own team uses to manage this site.")),
  ),
  p(t("We don't sell your information, and we don't share it with third parties for their own marketing purposes.")),

  h("Who can see it"),
  p(t(
    "Submitted messages and applications are visible only to authorized Paraiba team members through the admin dashboard. Our infrastructure providers (hosting and database) store this data on our behalf under their own security and confidentiality commitments — they don't use it for anything else.",
  )),

  h("How long we keep it"),
  p(t(
    "We keep contact messages and job applications for as long as reasonably useful for the purpose you submitted them — evaluating a role, following up on an inquiry — and delete them when they're no longer needed, or sooner if you ask us to.",
  )),

  h("Your rights"),
  p(t(
    "You can ask us to show you what we have on file, correct it, or delete it, at any time — just email us (see Contact below) and we'll act on it promptly.",
  )),

  h("Security"),
  p(t(
    "We use reasonable technical and organizational measures to protect the information you share with us, including access controls on the admin dashboard and encrypted connections (HTTPS) across the site.",
  )),

  h("Changes to this policy"),
  p(t(
    "If we change how we handle personal information, we'll update this page and the date below. Continued use of the site after a change means you accept the update.",
  )),

  h("Contact"),
  p(t("Questions about this policy? Reach us through the "), t("Contact page", true), t(" or the email address listed there.")),
);

export const termsAndConditions: RichDoc = doc(
  p(t(
    "These terms govern your use of this website, operated by Paraiba Technology PLC (\"Paraiba\", \"we\", \"us\"). By browsing this site, submitting a form, or applying for a role, you agree to them.",
  )),

  h("Using this site"),
  p(t(
    "You're welcome to browse, read about, and reach out regarding our products and services. You agree not to misuse the site — including attempting to disrupt it, scrape it at scale, or access areas (like the admin dashboard) you're not authorized to use.",
  )),

  h("Our content and products"),
  p(t(
    "The content on this site — text, design, logos, and the Paraiba name and mark — belongs to Paraiba Technology PLC unless otherwise noted. Each product we build (shown under Products) may have its own name, branding, and, once live, its own terms of service that apply to using that product directly.",
  )),

  h("Contact and job applications"),
  p(t(
    "When you submit the contact form or a job application, you confirm the information you provide is accurate and that you have the right to share any documents you upload. Submitting an application doesn't guarantee an interview, response, or offer — we review every application but can't commit to a specific outcome or timeline.",
  )),

  h("No warranty"),
  p(t(
    "This site is provided \"as is.\" We work to keep it accurate and available, but we don't guarantee it will be error-free, uninterrupted, or fit for a particular purpose.",
  )),

  h("Limitation of liability"),
  p(t(
    "To the extent permitted by law, Paraiba isn't liable for indirect, incidental, or consequential damages arising from your use of this site.",
  )),

  h("Governing law"),
  p(t(
    "These terms are governed by the laws of Ethiopia, where Paraiba Technology PLC is based, without regard to conflict-of-law principles.",
  )),

  h("Changes to these terms"),
  p(t(
    "We may update these terms as the site and our products evolve. We'll update the date below when we do — continuing to use the site after a change means you accept the update.",
  )),

  h("Contact"),
  p(t("Questions about these terms? Reach us through the "), t("Contact page", true), t(".")),
);

export const cookiePolicy: RichDoc = doc(
  p(t(
    "Cookies are small pieces of data a website stores in your browser. Here's exactly what this site uses them for — nothing more.",
  )),

  h("What we use"),
  p(t(
    "This public site does not set any cookies for visitors. We don't run analytics, advertising, or tracking scripts of any kind — so browsing this site leaves no cookie behind.",
  )),
  p(t(
    "The only cookie in this system is a strictly necessary session cookie set when a Paraiba team member signs in to the ",
  ), t("/admin", true), t(
    " dashboard. It's used solely to keep that person signed in and secure while managing the site, expires automatically, and is never set for regular visitors.",
  )),

  h("Third-party cookies"),
  p(t("We don't embed third-party trackers, ad networks, or social widgets that would set their own cookies on this site.")),

  h("Managing cookies"),
  p(t(
    "Since this site doesn't set visitor cookies, there's nothing to opt out of. If that ever changes, we'll update this page first. You can always check or clear cookies for any site through your browser's settings.",
  )),

  h("Changes to this policy"),
  p(t("If our cookie usage changes, we'll update this page and the date below.")),

  h("Contact"),
  p(t("Questions about this policy? Reach us through the "), t("Contact page", true), t(".")),
);
