# Paraiba Technology PLC

Marketing site for Paraiba Technology PLC — home, about, products, careers, contact,
and an admin dashboard backed by a real database. Every page is a drag-and-drop CMS:
its content is an ordered list of blocks (hero, rich text, card grids, …) managed from
`/admin/pages`, not hardcoded JSX.

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
npm run db:seed             # creates your first admin user, placeholder products, and all page/block content
npm run dev
```

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
  `/careers`, `/contact`. Every one of these except the product detail page is just a
  thin wrapper: fetch that page's blocks, render them in order. There's no page-specific
  layout code to touch when the content changes — only when a genuinely new kind of
  section is needed (see "Page builder / CMS" below).
- `src/app/admin` — the admin dashboard (`/admin/login`, then Overview, Pages, Products,
  Partners, Careers, Applicants, Messages, Users). Protected by `src/proxy.ts` (session
  cookie check) plus a server-side session check in the dashboard layout as a second line
  of defense.
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
- `prisma/schema.prisma` — `User`, `Project`, `JobPosting`, `JobApplication`, `Partner`,
  `Page`, `Block`, `ProductPage`, `ProductBlock`, `ContactSubmission` models.
- `prisma/seed.ts` / `prisma/seedPages.ts` — creates the first admin user, seeds
  placeholder products, and seeds every page's block content (see below). Safe to re-run:
  it skips anything that already exists.

## Page builder / CMS

Every page's content lives in the database as an ordered list of **blocks**, not in JSX:

- `Page` (`home` / `about` / `careers` / `contact` / `products`) has many `Block`s, each
  with a `type` (`hero`, `richText`, `cardGrid`, `statsQuote`, `quote`, `cta`,
  `productsPreview`, `partnersTrustBar`, `openPositions`, `contactPanel`, `productsGrid`)
  and a schemaless `data` JSON column shaped by that type — see
  `src/lib/blocks/types.ts` for every type's exact fields.
- `/admin/pages` lists the five pages; `/admin/pages/[slug]` is the builder — drag blocks
  to reorder (`@dnd-kit`), click one to expand its edit form, "Add block" to insert a new
  one, or delete one. Saving, adding, deleting, and reordering all go through
  `src/app/admin/(dashboard)/pages/actions.ts` and take effect immediately on the live
  site (`revalidatePath`).
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

## Product mini-sites

Since most products (industry-specific ERP systems, each in their own GitHub repo) are
real standalone products, not just portfolio entries, any product can get its own
subdomain with its own multi-page site and its own accent colors — instead of only a
single `/products/[slug]` detail page on the corporate site.

- Set a **subdomain** on a product (`/admin/products/[id]` → "Mini-site") — e.g.
  `temari` — and it becomes reachable at `temari.<ROOT_DOMAIN>`, with its own Home,
  Features, Pricing, About, Contact, and Demo pages (`ProductPageSlug` in
  `src/lib/blocks/types.ts`), built with the exact same drag-and-drop block builder as
  the main site (`/admin/products/[id]/pages`, reusing
  `src/app/admin/(dashboard)/pages/PageBuilder.tsx`) — just stored in `ProductPage`/
  `ProductBlock` instead of `Page`/`Block`.
- A product can also set its own **theme color** and **secondary color** (hex) and its
  own **mini-site logo** — these override `--color-ember`/`--color-teal` and
  `--color-amber` for that product's pages only (see `src/app/sites/[subdomain]/layout.tsx`),
  the same CSS-custom-property trick `.paraiba-light-section`/`.paraiba-dark-section`
  already use, so every existing block renders correctly re-themed with zero
  per-component changes. Leave them unset to use Paraiba's own brand colors.
- A dedicated **`liveDemo`** block type (Demo page's natural choice, though usable
  anywhere on a product's pages) renders that product's own GitHub repo/live link — the
  same StackBlitz/iframe preview already used on its corporate `/products/[slug]` page,
  just automatically scoped to whichever product's pages it's on.
- **Routing**: `src/proxy.ts` inspects the request's `Host` header
  (`src/lib/subdomain.ts`, pure string logic — no database access from the proxy, since
  the `pg` driver adapter this app uses isn't Edge-compatible) and rewrites
  `<subdomain>.<ROOT_DOMAIN>/*` to `/sites/<subdomain>/*` internally. Set `ROOT_DOMAIN`
  (e.g. `paraiba.com`) in your environment and point a wildcard DNS record
  (`*.paraiba.com`) at this deployment. In local dev, `<subdomain>.localhost:3000`
  always works with no configuration — Chromium and most browsers resolve `*.localhost`
  to `127.0.0.1` automatically. A product's pages are also reachable directly at
  `/sites/<subdomain>` on the main domain/host, without any subdomain at all — handy for
  previewing a mini-site before its DNS is live.
- Contact forms on a product's own Contact page still post to the same
  `/api/contact` → `ContactSubmission` table as the corporate site — there's no
  per-product inbox yet. Add one (e.g. a `productId` column) if that becomes worth
  telling apart.

## Admin dashboard

Anyone with an account has full access — there are no permission tiers, since the only
requirement so far is "me + a few teammates." Add teammates from `/admin/users` once
you're logged in.

- **Pages** (`/admin/pages`) — the drag-and-drop builder for every page's content. See
  "Page builder / CMS" above for how it works.
- **Products** (`/admin/products`) — replaces manually editing `src/lib/projects.ts`.
  Paraiba only publishes its own products now (no client-project section) — set a
  product's status to `archived` to show it as "Built · not published" (still visible, no
  live link) instead of `live`. Each product's device mockup can show, in priority order:
  (1) a **GitHub repo** (`owner/repo`) — boots and renders the app live from source via
  StackBlitz, no deployment needed, best for JS/web-stack projects; (2) a **live link**
  rendered in an iframe, if the target site allows framing; (3) a static **screenshot
  URL**; (4) a placeholder if none of the above are set.
  - Mark one product **featured** to show it in a large showcase hero above the grid on
    `/products`.
  - A product can optionally get its own standalone multi-page mini-site (its own
    subdomain, pages, and theme colors) — see "Product mini-sites" below.
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
  form on `/careers` (name, email, phone, cover letter, resume link — all optional except
  name/email). Filter by job, status, or search name/email; change an applicant's status
  (`new` / `reviewed` / `shortlisted` / `rejected` / `hired`) inline.
- **Messages** (`/admin/messages`) — contact form submissions, mark read/unread.
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

To use product mini-sites (see "Product mini-sites" above), also set `ROOT_DOMAIN`
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
