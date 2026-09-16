# Meskeday Technologies Group

Marketing site for Meskeday Technologies Group — home, about, projects, careers, contact,
and an admin dashboard backed by a real database.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Prisma (SQLite locally).
Brand palette, type, and the Adey Circuit mark come from the internal brand guide.

## Getting started

```bash
npm install                 # also runs `prisma generate` via postinstall
cp .env.example .env        # fill in AUTH_SECRET, ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD
npm run db:migrate          # creates the local SQLite database + tables
npm run db:seed             # creates your first admin user + placeholder projects
npm run dev
```

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
  back together — importing Prisma/libsql into a client bundle breaks the build.
- `prisma/schema.prisma` — `User`, `Project`, `JobPosting`, `ContactSubmission` models.
- `prisma/seed.ts` — creates the first admin user and seeds placeholder projects.

## Admin dashboard

Anyone with an account has full access — there are no permission tiers, since the only
requirement so far is "me + a few teammates." Add teammates from `/admin/users` once
you're logged in.

- **Projects** (`/admin/projects`) — replaces manually editing `src/lib/projects.ts`.
  Set a project's status to `archived` to show it as "Built · not published" (still
  visible, no live link) instead of `live`. Each project's device mockup can show, in
  priority order: (1) a **GitHub repo** (`owner/repo`) — boots and renders the app live
  from source via StackBlitz, no deployment needed, best for JS/web-stack projects; (2) a
  **live link** rendered in an iframe, if the target site allows framing; (3) a static
  **screenshot URL**; (4) a placeholder if none of the above are set.
  - Mark one project **featured** to show it in a large showcase hero above the grid on
    `/projects`.
  - **What We Built** and **Case Study** are optional free-text fields using one shared
    lightweight convention (no markdown library — parsed by `src/lib/richText.ts` into
    real React elements, not `dangerouslySetInnerHTML`):
    ```
    ## Heading
    - bullet item
    - bullet item

    ## Another Heading
    A paragraph instead of bullets.
    ```
    "What We Built" renders each block as a grouped card (`src/components/DeliverablesGrid.tsx`);
    "Case Study" renders them as numbered sections, 01/02/03/… (`src/components/CaseStudySections.tsx`).
- **Careers** (`/admin/careers`) — open/closed job postings. The public `/careers` page
  shows real postings when any exist, or an honest "no open roles right now" state when
  it's empty.
- **Messages** (`/admin/messages`) — contact form submissions, mark read/unread.
- **Users** (`/admin/users`) — add or remove teammate accounts. You can't delete your own
  account while logged in as it.
- **Overview** (`/admin`) — live counts pulled from the database. This is not visitor
  analytics (page views, traffic sources, etc.) — that would need a separate integration
  (e.g. Vercel Analytics) and hasn't been added.

## Deploying

The local database is SQLite (a `dev.db` file, gitignored). That works great for
development but **will not persist on serverless hosting** (e.g. Vercel) — the filesystem
there is ephemeral. Before deploying to production:

1. Provision a hosted Postgres database (Neon, Supabase, or Vercel Postgres all work).
2. Update `prisma/schema.prisma`'s `datasource` to `provider = "postgresql"`.
3. Swap the driver adapter in `src/lib/db.ts` and `prisma/seed.ts` from
   `@prisma/adapter-libsql` to `@prisma/adapter-pg` (`npm install @prisma/adapter-pg pg`).
4. Set `DATABASE_URL` to the hosted connection string, run `npm run db:deploy` to apply
   migrations, then `npm run db:seed` once to create the first admin user.

The schema itself doesn't need to change — this is a config swap, not a rewrite.

## Notes

- Contact form submissions are stored, not emailed — check `/admin/messages` for now.
  Wiring up email notifications (e.g. via Resend) is a reasonable next step.
- Footer social links (`src/lib/social.ts`) point at placeholder handles
  (`facebook.com/meskeday`, etc.) — update them once real profiles exist.
- No partner-bank trust bar, awards section, or team photo yet — those would represent
  credibility Meskeday doesn't actually have. Add them once they're real.
