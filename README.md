# Paraiba Technology PLC

Marketing site for Paraiba Technology PLC — home, about, products, solutions, services,
work, team, resources, careers, contact, and an admin dashboard backed by a real
database. Every page is a drag-and-drop CMS: its content is an ordered list of blocks
(hero, rich text, card grids, …) managed from `/admin/pages`, not hardcoded JSX.
Work/Resources/Team start out as a simple "coming soon" hero (matching their old
static copy) but, like every other page, are fully editable from the admin — add,
remove, or reorder blocks any time to give them real content.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Prisma backed by
Supabase Postgres. Brand palette, type, and the crystalline P mark come from the internal
brand guide (Midnight Navy, Paraiba Cyan, Electric Blue, Aqua Teal; Montserrat + Inter).

## Getting started

1. Create a [Supabase](https://supabase.com) project (or use an existing one).
2. From Project Settings → Database → Connection string, grab both the transaction-mode
   pooler URI (`DATABASE_URL`, port 6543) and the session-mode pooler or direct URI
   (`DIRECT_URL`, port 5432) — Prisma Migrate needs the direct connection, the app uses
   the pooled one.

```bash
npm install                 # also runs `prisma generate` via postinstall
cp .env.example .env        # fill in DATABASE_URL, DIRECT_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD
npm run db:deploy           # applies the committed migrations to your Supabase database
npm run db:seed             # creates your first admin user, the product catalog, and all page/block content
npm run dev
```

If your database was seeded before the product catalog/homepage were last updated, `db:seed`
won't touch it (it skips anything that already exists) — run these once instead:

```bash
npm run db:republish-products      # replaces old placeholder products with the real catalog
npm run db:republish-home          # replaces the Home page's blocks with the current composition
npm run db:republish-product-sites # creates/updates the branded Product Sites (name + theme colors)
npm run db:republish-kinin-home    # replaces Kinin's home-page blocks with its redesigned content
npm run db:republish-yeneta-home   # replaces Yeneta's home-page blocks with its redesigned content
npm run db:republish-tena-home     # replaces Tena's home-page blocks with its redesigned content
npm run db:republish-mead-home     # replaces Mead's home-page blocks with its redesigned content
npm run db:republish-product-logos # sets each product site's real logo from public/product-logos/
npm run db:republish-products-page # replaces the Products page's blocks with the current composition
```

All are safe to re-run and only touch what they name — `db:republish-products` upserts
by slug (never duplicates, never touches products you've added by hand), `db:republish-home`
only replaces the Home page's blocks, `db:republish-product-sites` upserts by subdomain
without ever touching a site's logo, so uploading a real logo file afterward is never
overwritten by a later re-run, `db:republish-kinin-home` / `db:republish-yeneta-home` /
`db:republish-tena-home` / `db:republish-mead-home` each only replace that one product's
own "home" `ProductPage` blocks — every other product site is untouched —
`db:republish-product-logos` only sets `logoData`/`logoMimeType` for the four named
products from their files in `public/product-logos/`, leaving name/subdomain/theme/pages
alone, and `db:republish-products-page` only replaces the Products page's own blocks.

The header/footer menu is seeded once by the regular `npm run db:seed` (it creates the
default `NavItem` rows only if none exist yet — same skip-if-present rule as everything
else `db:seed` does) — no separate republish script needed for it.

Use `db:deploy` (`prisma migrate deploy`), not `db:migrate` (`prisma migrate dev`), against Supabase.
`migrate dev` needs a temporary "shadow database" to validate new migrations, and Supabase
doesn't allow creating extra databases — it'll fail with a shadow-database error. `db:deploy`
just applies the migration files already committed in `prisma/migrations/`, no shadow database
needed. Only reach for `migrate dev` if you're changing `schema.prisma` yourself and need to
generate a *new* migration — and even then, expect the shadow-database step to fail on Supabase.

Open [http://localhost:3000](http://localhost:3000) for the site, and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) to sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

Generate a real `AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Structure

- `src/app/(site)` — public pages: home, `/about`, `/products`, `/products/[slug]`,
  `/careers`, `/contact`, `/partners` (real, from the Partner catalog), `/solutions`,
  `/services`, `/work`, `/resources`, `/team`, plus `/legal/*`, which is static (terms,
  privacy, cookies) rather than CMS-backed. Every CMS-backed page is a thin wrapper:
  fetch that page's blocks, render them in order. There's no page-specific layout code
  to touch when the content changes — only when a genuinely new kind of section is
  needed (see "Page builder / CMS" below).
- `src/components/Navbar.tsx` / `Footer.tsx` — the mega-menu nav and multi-column footer.
  The Products dropdown is always populated live from the product catalog; every other
  link (Solutions/Services/Work/Resources, the Company dropdown/column, the footer's
  Resources column) comes from the admin-managed `NavItem` table — see "Menu" below.
- `src/app/admin` — the admin dashboard (`/admin/login`, then Overview, Pages, Products,
  Product Sites, Partners, Careers, Applicants, Messages, Users). Protected by
  `src/proxy.ts` (session cookie check) plus a server-side session check in the dashboard
  layout as a second line of defense.
- `src/app/api/contact` — saves contact form submissions to the database
  (`ContactSubmission`), viewable/manageable at `/admin/messages`.
- `src/lib/db.ts` — Prisma client singleton.
- `src/lib/auth.ts` — signed session cookie helpers (no third-party auth library).
- `src/lib/projects.ts` vs `src/lib/projects-data.ts` — deliberately split. `projects.ts`
  has only types and pure presentation helpers (client-safe — imported by `ProjectCard`
  and other client components). `projects-data.ts` has the actual Prisma-backed
  `getProjects`/`getProject` and is guarded with `import "server-only"`. Don't merge these
  back together — importing Prisma/pg into a client bundle breaks the build. (The model
  and these files are still named "project" internally — only the public-facing URL, nav
  label, and admin section are "Products.")
- `prisma/schema.prisma` — `User`, `Project`, `ProductSite`, `JobPosting`,
  `JobApplication`, `Partner`, `Page`, `Block`, `ProductPage`, `ProductBlock`,
  `ContactSubmission` models.
- `prisma/seed.ts` / `prisma/seedPages.ts` / `prisma/productCatalog.ts` — creates the
  first admin user, seeds the real product catalog, and seeds every page's block content
  (see below). Safe to re-run: it skips anything that already exists (see the
  `db:republish-*` scripts above for updating a database that's already been seeded).

## Page builder / CMS

Every page's content lives in the database as an ordered list of **blocks**, not in JSX:

- `Page` (`home` / `about` / `careers` / `contact` / `products` / `solutions` / `services`)
  has many `Block`s, each with a `type` (`hero`, `richText`, `cardGrid`,
  `industriesShowcase`, `statsBar`, `statsQuote`, `quote`, `cta`, `productsPreview`,
  `partnersTrustBar`, `openPositions`, `contactPanel`, `productsGrid`, `section`,
  `techStack`) and a schemaless `data` JSON column shaped by that type — see
  `src/lib/blocks/types.ts` for every type's exact fields. `cardGrid` also supports an
  optional "View all" link next to its heading (`viewAllLabel`/`viewAllHref`) — reused for
  the homepage's Services section instead of building a near-duplicate block type for
  what's really the same icon-grid pattern. `industriesShowcase` is a shorter, 3-column
  alternative (text + button | small icon grid | photo card) used for the homepage's
  Industries section, where a tall one-card-per-industry `cardGrid` read as too long.
- **`section`** is different from the other block types above: instead of one fixed
  shape, it's a blank container an admin fills freely with an ordered list of small
  **elements** — WordPress/Strapi-style, rather than picking a whole preset template.
  Text: heading, paragraph, list, quote, pullquote, code, preformatted, details, table.
  Media: image, gallery, video, audio, file, cover, media & text, icon. Design: buttons,
  columns (2–3 side-by-side, each holding its own nested elements, capped at one level
  deep), separator, spacer. Plus a generic embed (paste a YouTube/Vimeo/Instagram/
  Spotify/SoundCloud URL). The other block types above still exist and stay useful as
  one-click starting presets — `section` is for when none of them fit. Its elements live
  in `src/lib/blocks/types.ts` (`SectionElementDataMap`), render via
  `src/components/blocks/SectionElements.tsx` (`renderSectionElement`, called
  recursively for `columns`), and are edited via
  `src/app/admin/(dashboard)/pages/SectionEditor.tsx` — a nested version of the same
  add/reorder/delete pattern the outer page builder uses, serialized into one hidden
  `elementsJson` field on save (mirroring how `cardGrid`'s item list already works).
- **Uploaded images** in a `section` (image/gallery/cover/media & text) are stored as
  their own `MediaAsset` row (`Bytes` + `mimeType`, same pattern as a Partner/ProductSite
  logo) and served from `/api/media/[id]`, cached forever since a re-upload creates a new
  row rather than replacing one. Each image slot carries its own stable id so a
  `<input type="file" name="file-<id>">` can target it even when several images live in
  one element (a gallery); `src/lib/blocks/formData.ts`'s `resolveMediaRef()` uploads
  whatever file arrives at save time and leaves already-saved images alone otherwise.
  Video/audio/file elements are link-only (paste an already-hosted URL) rather than
  another upload path — kept deliberately out of scope for now.
- **`techStack`** shows a grid of programming languages, frameworks, and tools, each with
  its real brand logo — not the generic `IconKey` set (`ICONS` in `blocks/types.ts`, used
  by `cardGrid`/`statsBar`), which only has abstract UI glyphs. Logos come from
  `src/lib/techIcons.ts` (`TECH_ICONS`, mostly [Simple Icons](https://simpleicons.org) via
  `react-icons/si`, plus `react-icons/di` for the couple Simple Icons omits for trademark
  reasons, like AWS) — every key was verified to exist in the installed `react-icons`
  version before use. Used on `/services`; add more logos by adding a key there.
- `/admin/pages` lists all ten pages; `/admin/pages/[slug]` is the builder — drag blocks
  to reorder (`@dnd-kit`), click one to expand its edit form, "Add block" to insert a new
  one, or delete one. Saving, adding, deleting, and reordering all go through
  `src/app/admin/(dashboard)/pages/actions.ts` and take effect immediately on the live
  site (`revalidatePath`).
- **Publish / Unpublish**: every `Page` has a `published` flag (`true` by default) —
  toggle it from the "Publish"/"Unpublish" button in `/admin/pages/[slug]`, or see its
  status at a glance as an "Unpublished" badge in the `/admin/pages` list. Unpublishing
  makes the public route (`getPageBlocks()` in `src/lib/blocks/data.ts`) return a real
  404 to visitors; the admin builder reads the `Page` row directly and stays fully
  editable regardless, so you can build a page out before it's ready to go live.
- `src/components/blocks/*.tsx` render each block type on the public site;
  `BlockRenderer.tsx` is the switch that dispatches `type` → component. A handful of
  block types (`productsPreview`, `partnersTrustBar`, `openPositions`, `productsGrid`)
  pull their content live from the database instead of storing it in `data` — e.g. the
  partners trust bar always reflects `/admin/partners`, not a stale copy.
- Rich prose (currently only the `richText` block's body) reuses the same TipTap editor
  and JSON document format as a product's "What We Built"/"Case Study" fields — see
  `src/lib/blocks/renderRichDoc.tsx` for the flowing (non-grouped) renderer used here,
  as opposed to `src/lib/richDoc.ts`'s heading-grouped one.
- Adding a genuinely new block type means: add its data shape to `blocks/types.ts`, a
  default in `blocks/defaults.ts`, a renderer in `components/blocks/`, a case in
  `BlockRenderer.tsx`, form fields in `admin/(dashboard)/pages/BlockFields.tsx`, and a
  parser case in `admin/(dashboard)/pages/actions.ts`. Everything else (add/reorder/
  delete, the builder UI) already works for it.

## Product sites

Most products in the catalog are real, industry-specific applications that live in
their own GitHub repo and aren't deployed yet — there's no live link to point to. To
still promote and show off a product before it ships, it can get its own standalone,
custom-themed marketing site on its own subdomain — completely independent of the
Products catalog (`/admin/products`) entirely. A product site has no tagline,
description, status, or GitHub link; it's just a name, a subdomain, a logo, and a
couple of theme colors, with its own drag-and-drop-built pages.

- **Catalog linkage**: `Project` (the catalog) and `ProductSite` are unrelated models —
  they're only connected by convention when a product's catalog `slug` matches a
  product site's `subdomain`. When that match exists, visiting that product's catalog
  page (`/products/<slug>`) redirects straight to its bespoke site
  (`<subdomain>.<ROOT_DOMAIN>`, via `getProductSiteUrl()` in `src/lib/subdomain.ts`) —
  the catalog page is effectively superseded once a product has its own site. A product
  without a matching site still shows its normal catalog page.
- Manage them from **`/admin/product-sites`** — a standalone admin section, not part of
  editing a product. Create a site with a **name**, a **subdomain** (e.g. `temari`,
  reachable at `temari.<ROOT_DOMAIN>`), and optionally a **logo** (upload a file — same
  2MB-limit, `Bytes`-column pattern as Partners — or paste a URL) and a **theme color** /
  **secondary color** (hex).
- A product site is a **single scrolling page**, not a multi-page site — there's one
  `"home"` `ProductPageSlug` (`src/lib/blocks/types.ts`), built from
  **`/admin/product-sites/[id]/pages/home`** with the exact same drag-and-drop block
  builder as the main site (`src/app/admin/(dashboard)/pages/PageBuilder.tsx`), just
  stored in `ProductPage`/`ProductBlock` rows keyed by `productSiteId` instead of
  `Page`/`Block`. "Features," "Pricing," etc. are sections on that one page, not separate
  routes — use `cardGrid`'s `anchorId` (e.g. `"features"`) so a hero button can link to
  `#features` and scroll to it. The "Add block" menu there only offers
  `MICROSITE_BLOCK_TYPES` — a product site has no products catalog, partners, or job
  postings of its own, so those live-data blocks (products preview, partners trust bar,
  open positions, products grid) are hidden.
- The theme color and secondary color override `--color-ember`/`--color-teal` and
  `--color-amber` for that site's pages only (see `src/app/sites/[subdomain]/layout.tsx`)
  — the same CSS-custom-property trick `.paraiba-light-section`/`.paraiba-dark-section`
  already use, so every existing block renders correctly re-themed with zero
  per-component changes. Leave them unset to use Paraiba's own brand colors.
- **Nav**: since a product site is a single page, its nav has nothing to link to except
  back to Paraiba's own site — `ProductNavbar`/`ShellNavbar` render just the product's
  logo and a "Back to Paraiba" link, no page links, no mobile menu. The link target is
  computed per-request in `src/app/sites/[subdomain]/layout.tsx` via `getRootSiteUrl()`
  (`src/lib/subdomain.ts`) — it uses `ROOT_DOMAIN` if set, or falls back to the current
  request's own host (stripping the subdomain) so it still resolves correctly in local dev.
- **Bespoke shells**: a product with real brand direction (logo concept, color palette)
  can get its own hand-coded nav + hero instead of the generic shared ones — see
  `src/components/product-shells/`. Each product gets its own file (e.g.
  `YenetaShell.tsx`) exporting a `Navbar` and a `Hero`, registered by subdomain in
  `registry.ts`; `src/app/sites/[subdomain]/layout.tsx` and `page.tsx` look up that
  registry and fall back to the generic `ProductNavbar`/block-based hero when a subdomain
  isn't registered. This is a deliberate split: the hero is what makes a product's site
  feel like its own website, so it's hand-coded (editing it means editing code, not
  admin) — everything else on the page stays in the drag-and-drop block builder exactly
  as before. `ShellNavbar.tsx` holds the shared nav structure so each product's file only
  supplies its own logo mark.
- **Routing**: `src/proxy.ts` inspects the request's `Host` header
  (`src/lib/subdomain.ts`, pure string logic — no database access from the proxy, since
  the `pg` driver adapter this app uses isn't Edge-compatible) and rewrites
  `<subdomain>.<ROOT_DOMAIN>/*` to `/sites/<subdomain>/*` internally. Set `ROOT_DOMAIN`
  (e.g. `paraiba.com`) in your environment and point a wildcard DNS record
  (`*.paraiba.com`) at this deployment. In local dev, `<subdomain>.localhost:3000`
  always works with no configuration — Chromium and most browsers resolve `*.localhost`
  to `127.0.0.1` automatically. A site's pages are also reachable directly at
  `/sites/<subdomain>` on the main domain/host, without any subdomain at all — handy for
  previewing a site before its DNS is live.
- Contact forms on a product site's own Contact page still post to the same
  `/api/contact` → `ContactSubmission` table as the corporate site — there's no
  per-site inbox yet. Add one (e.g. a `productSiteId` column) if that becomes worth
  telling apart.

## Admin dashboard

Anyone with an account has full access — there are no permission tiers, since the only
requirement so far is "me + a few teammates." Add teammates from `/admin/users` once
you're logged in.

- **Pages** (`/admin/pages`) — the drag-and-drop builder for every page's content. See
  "Page builder / CMS" above for how it works. This includes `/products` itself — its
  live product grid is just one block among any others you add (hero, rich text, a
  freeform "Section" with images/galleries, a closing CTA, …), exactly like Solutions
  or Services.
- **Menu** (`/admin/menu`) — every header/footer nav link except the Products dropdown
  (always live from the catalog) and the Footer's Contact block (from Settings). Each
  link picks where it shows (header only / footer only / both), an optional `order`, and
  an optional `group` — links sharing a group name combine into one dropdown (header) or
  column (footer), e.g. the built-in "Company" and "Resources" groups. A link pointing at
  an unpublished CMS page (see Pages' publish toggle) hides itself automatically — no
  manual cleanup needed when you unpublish something.
- **Products** (`/admin/products`) — replaces manually editing `src/lib/projects.ts`.
  Paraiba only publishes its own products now (no client-project section) — set a
  product's status to `archived` to show it as "Built · not published" (still visible, no
  live link) instead of `live`. Each product's device mockup can show, in priority order:
  (1) a **GitHub repo** (`owner/repo`) — boots and renders the app live from source via
  StackBlitz, no deployment needed, best for JS/web-stack projects; (2) a **live link**
  rendered in an iframe, if the target site allows framing; (3) an uploaded **screenshot**
  image (stored the same way as a Partner logo — bytes in Postgres, served through
  `/api/products/[id]/screenshot`) or a pasted URL as a fallback; (4) a placeholder if
  none of the above are set.
  - Mark one product **featured** to show it in a large showcase hero above the grid on
    `/products`.
  - **What We Built** and **Case Study** are optional fields edited with a small WYSIWYG
    editor (`src/components/admin/RichTextEditor.tsx`, built on TipTap) — use the toolbar's
    heading button to start a new group/section, then write paragraphs and/or a bullet
    list under it. It saves as a TipTap JSON document, walked into real React elements by
    `src/lib/richDoc.ts` (still no `dangerouslySetInnerHTML`). "What We Built" renders each
    heading's content as a grouped card (`src/components/DeliverablesGrid.tsx`); "Case
    Study" renders them as numbered sections, 01/02/03/… (`src/components/CaseStudySections.tsx`).
    Projects saved before the editor existed used a plain-text "## Heading" / "- bullet"
    convention (`src/lib/richText.ts`) — still rendered and edited correctly; opening one
    in the editor converts it to the new format on next save.
- **Product Sites** (`/admin/product-sites`) — standalone, custom-themed marketing sites
  for products that don't have a live link yet. See "Product sites" above.
- **Partners** (`/admin/partners`) — logos shown in the "Trusted by" marquee on the
  homepage, right under the hero. Each partner has a name, a logo, an optional website
  link, and a display order (lower first). A partner without a logo falls back to a text
  badge instead of an image. The whole section — heading and marquee — is only rendered
  when at least one partner exists, so the homepage doesn't imply credibility that isn't
  real yet.
  - **Logo**: upload an image file directly from the form (PNG/JPG/SVG, up to 2MB) — it's
    stored in the database (`Partner.logoData`/`logoMimeType`, a Postgres `bytea` column)
    and served back through `/api/partners/[id]/logo`, cache-busted by `updatedAt` so a
    re-upload is never served stale. No third-party storage/env vars needed. A plain
    `Partner.logoUrl` text field still exists as a fallback for pasting an
    already-hosted link — it's only used when no file has been uploaded.
- **Careers** (`/admin/careers`) — open/closed job postings. The public `/careers` page
  shows real postings when any exist, or an honest "no open roles right now" state when
  it's empty. Each posting shows its applicant count, linking into Applicants pre-filtered
  to that job.
- **Applicants** (`/admin/applicants`) — applications submitted from a job's inline "Apply"
  form on `/careers` (name, email, phone, cover letter, uploaded documents — all optional
  except name/email). Filter by job, status, or search name/email; change an applicant's
  status (`new` / `reviewed` / `shortlisted` / `rejected` / `hired`) inline.
  - **Documents**: applicants can upload multiple files (resume/CV, portfolio,
    certificates — PDF, Word, or image, up to 8MB each), stored as `ApplicationDocument`
    rows (`Bytes` + `mimeType` + original `fileName`). Each shows as a download pill on
    the applicant's card, served through `/api/admin/documents/[id]` — unlike the public
    `/api/media` route, this always requires an admin session, since these files can
    contain personal data.
- **Messages** (`/admin/messages`) — contact form submissions, mark read/unread.
- **Settings** (`/admin/settings`) — the site's office location, phone, email, a Google
  Maps embed URL, and social links (Facebook, Instagram, TikTok, Telegram, YouTube,
  LinkedIn) — one place that feeds both the Contact page and the Footer, stored as a
  single-row `SiteSettings` table (`id: "singleton"`). Leaving a social field empty hides
  that platform's icon everywhere rather than showing a dead link.
- **Users** (`/admin/users`) — add or remove teammate accounts. You can't delete your own
  account while logged in as it.
- **Overview** (`/admin`) — live counts pulled from the database. This is not visitor
  analytics (page views, traffic sources, etc.) — that would need a separate integration
  (e.g. Vercel Analytics) and hasn't been added.

## Deploying

Local dev and production both point at the same Supabase Postgres database via
`DATABASE_URL` / `DIRECT_URL` — there's no separate local database to worry about. To
deploy (e.g. to Vercel):

1. Set `DATABASE_URL`, `DIRECT_URL` (and `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD`)
   in your host's environment variables.
2. Run `npm run db:deploy` to apply migrations against Supabase, then `npm run db:seed`
   once to create the first admin user.

If you'd rather give production its own database, create a second Supabase project (or
branch) and point its `DATABASE_URL` there instead.

To use product sites (see "Product sites" above), also set `ROOT_DOMAIN`
(e.g. `paraiba.com`) and add a wildcard DNS record (`*.paraiba.com`) pointing at this
deployment, alongside your apex/`www` records.

## Notes

- Contact form submissions are stored, not emailed — check `/admin/messages` for now.
  Wiring up email notifications (e.g. via Resend) is a reasonable next step.
- Footer social links (`src/lib/social.ts`) point at placeholder handles
  (`facebook.com/paraiba`, etc.) — update them once real profiles exist.
- No awards section or team photo yet — those would represent credibility Paraiba
  doesn't actually have. Add them once they're real. The homepage "Trusted by" partner
  bar is admin-manageable and already wired up (see Partners above) — it just stays
  hidden until real partners are added.
