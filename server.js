// Custom entrypoint for cPanel's Node.js Selector (Phusion Passenger), which
// runs a single JS file directly rather than an npm script — so `next start`
// can't be used as-is. This wraps the built Next.js app (run `next build`
// first) in a plain http server. Passenger sets PORT to the port it expects
// the app to listen on.
//
// Usage in cPanel's "Setup Node.js App": Application startup file = server.js

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
