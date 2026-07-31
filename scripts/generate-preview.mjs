import { mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const source = resolve("public/housewarming-preview.svg");
const output = resolve("public/housewarming-preview.png");

await mkdir(resolve("public"), { recursive: true });

await sharp(source, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9, palette: true, quality: 100 })
  .toFile(output);

const metadata = await sharp(output).metadata();
const file = await stat(output);

if (metadata.width !== 1200 || metadata.height !== 630) {
  throw new Error(`Unexpected preview size: ${metadata.width}x${metadata.height}`);
}

console.log(
  `Generated ${output} (${metadata.width}x${metadata.height}, ${file.size} bytes)`
);
