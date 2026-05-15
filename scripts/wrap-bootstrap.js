const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
);
const dest = path.join(__dirname, "../shared/styles/bootstrap-wrapped.css");

const css = fs.readFileSync(src, "utf8");
fs.writeFileSync(dest, `@layer bootstrap {\n${css}\n}\n`);

console.log("✓ Bootstrap CSS wrapped in @layer bootstrap");
