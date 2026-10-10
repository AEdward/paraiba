// Custom entrypoint for cPanel's Node.js Selector (Phusion Passenger), which
// runs a single JS file directly rather than an npm script — so `next start`
// can't be used as-is. This wraps the built Next.js app (run `next build`
// first) in a plain http server. Passenger sets PORT to the port it expects
// the app to listen on.
//
// Usage in cPanel's "Setup Node.js App": Application startup file = server.js

// V8 sizes its background thread pool (JIT/GC) to the host's CPU count by
// default, which on this shared server means ~40 threads for a single Node
// process — and this host's cPanel panel can't save a NODE_OPTIONS
// environment variable (it corrupts the generated export line regardless of
// value), so the usual --v8-pool-size env-var route isn't available. Re-exec
// with the flag passed directly on the command line instead, which the
// panel's env-var UI has no part in.
if (!process.env.__REEXEC_WITH_V8_FLAGS) {
  const { spawn } = require("node:child_process");
  const child = spawn(process.execPath, ["--v8-pool-size=4", __filename], {
    stdio: "inherit",
    env: { ...process.env, __REEXEC_WITH_V8_FLAGS: "1" },
  });
  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
  });
} else {
  const { createServer } = require("node:http");
  const next = require("next");

  const port = process.env.PORT || 3000;
  const app = next({ dev: false });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`Ready on port ${port}`);
    });
  });
}
