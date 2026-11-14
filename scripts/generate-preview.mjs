import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const sourcePath = resolve("public/housewarming-preview.jpeg");
const outputPath = resolve("public/housewarming-preview.jpeg");

// Read into memory before writing to the same path. Keep the uploaded house
// photograph intact rather than regenerating the previous house image.
await sharp(await readFile(sourcePath))
  .resize(1280, 720, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
const file = await stat(outputPath);

if (metadata.width !== 1280 || metadata.height !== 720) {
  throw new Error(`Unexpected preview size: ${metadata.width}x${metadata.height}`);
}

if (metadata.format !== "jpeg") {
  throw new Error(`Unexpected preview format: ${metadata.format}`);
}

if (file.size > 1_000_000) {
  throw new Error(`Preview exceeds 1 MB: ${file.size} bytes`);
}

console.log(
  `Generated ${outputPath} from ${sourcePath} (${metadata.width}x${metadata.height}, ${file.size} bytes)`,
);
