import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const sourcePath = resolve("public/housewarming-preview.svg");
const artworkPath = resolve("public/housewarming-preview-artwork.png");
const amiriPath = resolve("public/fonts/Amiri-Regular.ttf");
const outputPath = resolve("public/housewarming-preview.png");

const [source, artwork, amiri] = await Promise.all([
  readFile(sourcePath, "utf8"),
  readFile(artworkPath),
  readFile(amiriPath),
]);

// Inline local dependencies so librsvg renders identically from a memory buffer
// in local development and CI.
const selfContainedSvg = source
  .replaceAll(
    "housewarming-preview-artwork.png",
    `data:image/png;base64,${artwork.toString("base64")}`,
  )
  .replace(
    "fonts/Amiri-Regular.ttf",
    `data:font/ttf;base64,${amiri.toString("base64")}`,
  );

await sharp(Buffer.from(selfContainedSvg), { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    palette: true,
    quality: 100,
    colours: 256,
  })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
const file = await stat(outputPath);

if (metadata.width !== 1200 || metadata.height !== 630) {
  throw new Error(`Unexpected preview size: ${metadata.width}x${metadata.height}`);
}

if (metadata.format !== "png") {
  throw new Error(`Unexpected preview format: ${metadata.format}`);
}

if (file.size > 1_000_000) {
  throw new Error(`Preview exceeds 1 MB: ${file.size} bytes`);
}

console.log(
  `Generated ${outputPath} (${metadata.width}x${metadata.height}, ${file.size} bytes)`,
);
