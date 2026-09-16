# Paraiba Technology PLC

Marketing site for Paraiba Technology PLC — home, about, projects, careers, contact,
and an admin dashboard backed by a real database.

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
npm run db:seed             # creates your first admin user + placeholder projects
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

- `src/app/(site)` — public pages: home, `/about`, `/projects`, `/projects/[slug]`,
  `/careers`, `/contact`
- `src/app/admin` — the admin dashboard (`/admin/login`, then Overview, Projects, Careers,
  Messages, Users). Protected by `src/proxy.ts` (session cookie check) plus a
  server-side session check in the dashboard layout as a second line of defense.
- `src/app/api/contact` — saves contact form submissions to the database
  (`ContactSubmission`), viewable/manageable at `/admin/messages`.
- `src/lib/db.ts` — Prisma client singleton.
- `src/lib/auth.ts` — signed session cookie helpers (no third-party auth library).
- `src/lib/projects.ts` vs `src/lib/projects-data.ts` — deliberately split. `projects.ts`
  has only types and pure presentation helpers (client-safe — imported by `ProjectCard`
  and other client components). `projects-data.ts` has the actual Prisma-backed
  `getProjects`/`getProject` and is guarded with `import "server-only"`. Don't merge these
  back together — importing Prisma/pg into a client bundle breaks the build.
- `prisma/schema.prisma` — `User`, `Project`, `JobPosting`, `ContactSubmission` models.
- `prisma/seed.ts` — creates the first admin user and seeds placeholder projects.

## Admin dashboard

Anyone with an account has full access — there are no permission tiers, since the only
requirement so far is "me + a few teammates." Add teammates from `/admin/users` once
you're logged in.

- **Projects** (`/admin/projects`) — replaces manually editing `src/lib/projects.ts`.
  Each project's **Kind** (`client` or `product`) decides which section it shows in on
  `/projects` — Paraiba's own products, or client work — each with its own tag filter.
  Set a project's status to `archived` to show it as "Built · not published" (still
  visible, no live link) instead of `live`. Each project's device mockup can show, in
  priority order: (1) a **GitHub repo** (`owner/repo`) — boots and renders the app live
  from source via StackBlitz, no deployment needed, best for JS/web-stack projects; (2) a
  **live link** rendered in an iframe, if the target site allows framing; (3) a static
  **screenshot URL**; (4) a placeholder if none of the above are set.
  - Mark one project **featured** to show it in a large showcase hero above the grid on
    `/projects`.
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

## Notes

- Contact form submissions are stored, not emailed — check `/admin/messages` for now.
  Wiring up email notifications (e.g. via Resend) is a reasonable next step.
- Footer social links (`src/lib/social.ts`) point at placeholder handles
  (`facebook.com/paraiba`, etc.) — update them once real profiles exist.
- No partner-bank trust bar, awards section, or team photo yet — those would represent
  credibility Paraiba doesn't actually have. Add them once they're real.
