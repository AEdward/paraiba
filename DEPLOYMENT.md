# Deployment / Cutover Runbook

This covers what's left after the build: running the real data migration and
cutting over from the old Next.js app to this Laravel app on Yegara. Everything
up to this point has been built and verified locally (see git log for the
phase-by-phase history) — these are the steps that need your actual server
access and credentials, which weren't available in the build environment.

## 1. Set up the Laravel app on Yegara

1. In cPanel, create a new subdomain (e.g. `staging.paraibatech.com`) for the
   initial build-out, or point directly at the production domain if you're
   doing a hard cutover in one step.
2. Create a MySQL database + user via cPanel's **MySQL Databases** tool.
3. Upload this repo (or `git clone` it, matching how the Next.js app's
   `~/repositories/paraiba` was set up) to a path **outside** `public_html`,
   e.g. `~/repositories/paraiba-laravel`.
4. Point the domain/subdomain's document root at
   `~/repositories/paraiba-laravel/public` (cPanel's "Domains" page — no
   custom entrypoint file needed, unlike the old `server.js` bridge).
5. Check cPanel's **MultiPHP Manager** for the available PHP version — this
   app needs PHP 8.3+. Set the domain to use it.
6. Copy `.env.example` to `.env` and fill in:
   - `APP_KEY` — generate via `php artisan key:generate` after composer install
   - `APP_URL`, `ROOT_DOMAIN` — your real domain
   - `DB_*` — the MySQL credentials from step 2
   - `ADMIN_EMAIL` / `ADMIN_NAME` / `ADMIN_PASSWORD` — for the first admin seed
   - `QUEUE_CONNECTION=sync` (keep this — avoids needing a queue worker/
     persistent process on this host)
7. If Yegara's cPanel has a Composer/Terminal feature:
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan db:seed --class=AdminUserSeeder
   php artisan storage:link
   php artisan config:cache && php artisan route:cache && php artisan view:cache
   ```
   If there's no Composer access on the host, run `composer install` locally
   and upload the `vendor/` directory instead.

## 2. Run the real data migration

This is the step that needs your actual Supabase Postgres credentials — the
build environment didn't have access to the live database.

1. In `.env`, set `LEGACY_DATABASE_URL` to the old app's `DATABASE_URL`
   (same Supabase connection string the Next.js app uses).
2. **Dry run first, against a copy of the data if at all possible** — don't
   point the first attempt at production:
   ```bash
   php artisan migrate:from-legacy --dry-run
   ```
   This reports row counts per table without writing anything. Confirm the
   counts look right (compare against what you see in the old app's admin).
3. Run it for real:
   ```bash
   php artisan migrate:from-legacy
   ```
   It's safe to re-run if it fails partway — already-migrated rows (tracked
   in the `legacy_id_map` table) are skipped automatically.
4. Spot-check the migrated content, especially:
   - `richText` blocks — the Tiptap-to-HTML conversion is a best-effort
     walker covering the old editor's restricted toolbar (H3/bold/italic/
     lists); skim a few converted pages for anything that looks off.
   - Uploaded images/logos/screenshots — confirm they actually render
     (`php artisan storage:link` must have been run first).
   - Job application documents — these go to the **private** disk; confirm
     a document download works from `/documents/{id}` while logged into
     the admin.

Note: per your 2026-11-02 decision, product-site content (Yeneta/Tena/Mead/
Kinin/Enegeda) is **not** migrated — you'll re-add any product sites you want
to keep from the admin's "Product Sites" area.

## 3. Staging verification (do this before cutover)

With real migrated data in place, walk through and compare against the live
Next.js site side by side:

- [ ] All public pages (home, about, services, solutions, work, team,
      resources, partners, products, careers, contact, 3 legal pages)
- [ ] Every admin area (Pages incl. every block on every page, Product
      Sites, Menu, Products, Partners, Careers, Applicants, Messages,
      Settings, Users)
- [ ] Submit a real job application with a file upload end to end
- [ ] Submit the contact form
- [ ] Any subdomains you've re-created under Product Sites

## 4. Cutover

Pick a low-traffic window.

1. Final `migrate:from-legacy` run against production MySQL, for the
   freshest possible snapshot.
2. In cPanel, update the main domain's (and each product subdomain's)
   document root to point at this Laravel app's `public/` directory.
3. If `portal.paraibatech.com` and the product subdomains
   (`yeneta.`, `tena.`, etc.) aren't already DNS-pointed at this same
   server/IP, update DNS. (If they already point here for the Next.js app,
   no DNS change is needed — this is purely a document-root switch per
   domain.)
4. Remove the old Next.js app's entry from cPanel's **Setup Node.js App** —
   this is also what finally, permanently resolves the NPROC/process-limit
   crashes, since there's no persistent Node process left on the account at
   all.
5. Smoke-test immediately: homepage, careers, portal login, one real job
   application, one real contact submission, each product subdomain.
6. Keep the old Next.js codebase and its Supabase database **read-only and
   untouched** for 1–2 weeks before decommissioning — this migration moved
   primary keys and file storage, so it's not a trivial redo if something
   surfaces days later.

## Why this fixes the original problem

PHP-FPM is cPanel/CloudLinux's native app model — each request gets a
short-lived process that exits when the response is sent, instead of one
persistent Node.js process (plus whatever it spawns) sitting resident
against the account's 100-process ceiling. There's also no native/compiled
binary dependency anywhere in this app (no Prisma WASM engine, no `sharp`) —
MySQL access goes through PHP's standard `pdo_mysql` extension, which is
part of every cPanel PHP build and isn't sandboxed by CageFS the way
vendored Node native addons were.
