// Genera iconos PWA reales (192/512) desde la marca SCA usando sharp.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "icons");
mkdirSync(OUT, { recursive: true });

function svg(size) {
  const pad = size * 0.18;
  const inner = size - pad * 2;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f4f4f8"/>
      <stop offset="48%" stop-color="#c0c0c0"/>
      <stop offset="56%" stop-color="#7d7d86"/>
      <stop offset="100%" stop-color="#e8e8ee"/>
    </linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A24"/>
      <stop offset="100%" stop-color="#0A0A0F"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <g transform="translate(${pad},${pad})">
    <circle cx="${inner / 2}" cy="${inner * 0.36}" r="${inner * 0.34}" fill="none" stroke="url(#chrome)" stroke-width="${inner * 0.03}" opacity="0.5"/>
    <path d="M ${inner * 0.55} ${inner * 0.08}
             L ${inner * 0.30} ${inner * 0.42}
             L ${inner * 0.48} ${inner * 0.42}
             L ${inner * 0.42} ${inner * 0.66}
             L ${inner * 0.70} ${inner * 0.30}
             L ${inner * 0.50} ${inner * 0.30} Z"
          fill="#E31E24"/>
    <text x="${inner / 2}" y="${inner * 0.92}" text-anchor="middle"
          font-family="Arial, sans-serif" font-weight="900" font-size="${inner * 0.26}"
          fill="url(#chrome)" letter-spacing="2">SCA</text>
  </g>
</svg>`;
}

for (const size of [192, 512]) {
  const buf = Buffer.from(svg(size));
  await sharp(buf).png().toFile(join(OUT, `icon-${size}.png`));
  console.log(`icon-${size}.png OK`);
}

// favicon 48
await sharp(Buffer.from(svg(48))).png().toFile(join(OUT, "favicon-48.png"));
console.log("favicon-48.png OK");
