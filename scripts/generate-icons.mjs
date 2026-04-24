/**
 * Rasterises the source SVG icons to PNGs at PWA-required sizes.
 * Run after editing public/icons/source-*.svg:  node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(here, "..", "public", "icons");

const TARGETS = [
  { src: "source-any.svg",      out: "icon-192.png",           size: 192 },
  { src: "source-any.svg",      out: "icon-512.png",           size: 512 },
  { src: "source-any.svg",      out: "apple-touch-icon.png",   size: 180 },
  { src: "source-maskable.svg", out: "icon-maskable-192.png",  size: 192 },
  { src: "source-maskable.svg", out: "icon-maskable-512.png",  size: 512 },
];

for (const { src, out, size } of TARGETS) {
  const svg = readFileSync(resolve(iconsDir, src));
  const buf = await sharp(svg).resize(size, size).png().toBuffer();
  writeFileSync(resolve(iconsDir, out), buf);
  console.log(`✓ ${out} (${size}x${size})`);
}
