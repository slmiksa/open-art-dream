import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const client = join(dist, "client");
const temp = join(root, "dist-static");

if (!existsSync(client)) {
  throw new Error("لم يتم العثور على dist/client بعد البناء");
}

rmSync(temp, { recursive: true, force: true });
mkdirSync(temp, { recursive: true });

for (const entry of readdirSync(client, { withFileTypes: true })) {
  const from = join(client, entry.name);
  const to = join(temp, entry.name);
  if (entry.isDirectory()) {
    mkdirSync(to, { recursive: true });
    for (const child of readdirSync(from)) {
      const childFrom = join(from, child);
      const childTo = join(to, child);
      copyFileSync(childFrom, childTo);
    }
  } else {
    copyFileSync(from, to);
  }
}

const assets = readdirSync(join(temp, "assets"));
const appJs = assets.find((name) => /^static-client-[\w-]+\.js$/.test(name));
const css = assets.find((name) => /^styles-[\w-]+\.css$/.test(name));

if (!appJs) throw new Error("لم يتم العثور على ملف تشغيل التطبيق static-client-*.js");
if (!css) throw new Error("لم يتم العثور على ملف التنسيقات styles-*.css");

writeFileSync(
  join(temp, "index.html"),
  `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LamhaSec for Technical Solutions — لمحة الآمنة للحلول التقنية</title>
    <meta name="description" content="لمحة الآمنة للحلول التقنية: خدمات سيبرانية، حلول تقنية وبرمجية، واستشارات." />
    <meta name="author" content="LamhaSec" />
    <meta property="og:title" content="LamhaSec for Technical Solutions — لمحة الآمنة للحلول التقنية" />
    <meta property="og:description" content="لمحة الآمنة للحلول التقنية: خدمات سيبرانية، حلول تقنية وبرمجية، واستشارات." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@LamhaSec" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/assets/${css}" />
    <script type="module" src="/assets/${appJs}"></script>
  </head>
  <body></body>
</html>
`,
);

copyFileSync(join(root, "public", ".htaccess"), join(temp, ".htaccess"));
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const entry of readdirSync(temp, { withFileTypes: true })) {
  const from = join(temp, entry.name);
  const to = join(dist, entry.name);
  if (entry.isDirectory()) {
    mkdirSync(to, { recursive: true });
    for (const child of readdirSync(from)) copyFileSync(join(from, child), join(to, child));
  } else {
    copyFileSync(from, to);
  }
}

rmSync(temp, { recursive: true, force: true });
console.log("Static dist is ready: dist/index.html");