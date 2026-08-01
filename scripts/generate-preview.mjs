import { stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const sourcePath = resolve("src/images/house_img_1.jpeg");
const outputPath = resolve("public/housewarming-preview.jpg");

await sharp(sourcePath)
  // Remove the source render's bottom footer strip while preserving the
  // complete house and matching the Open Graph aspect ratio.
  .extract({ left: 21, top: 0, width: 1238, height: 650 })
  .resize(1200, 630, { fit: "fill" })
  .modulate({ brightness: 1.03, saturation: 0.96 })
  .sharpen({ sigma: 0.45 })
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
const file = await stat(outputPath);

if (metadata.width !== 1200 || metadata.height !== 630) {
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
