
import fs from "node:fs/promises";
import path from "node:path";

const INTERVAL = 5; 
const TILE_W = 160;
const TILE_H = 90;

const COLS = 10;
const ROWS = 10;
const PER_SHEET = COLS * ROWS;

function formatTimestamp(seconds: number): string {
  const totalMs = Math.round(seconds * 1000);

  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;

  return (
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(secs).padStart(2, "0")}.` +
    `${String(ms).padStart(3, "0")}`
  );
}

export function makeVtt(
  durationSec: number,
  sheetName = `thumb{id}.png`
): string {
  if (!Number.isFinite(durationSec) || durationSec <= 0) {
    throw new Error("Invalid video duration");
  }

  const count = Math.ceil(durationSec / INTERVAL);

  let output = "WEBVTT\n\n";

  for (let i = 0; i < count; i++) {
    const start = i * INTERVAL;
    const end = Math.min(start + INTERVAL, durationSec);

    const indexInSheet = i % PER_SHEET;
    const sheetIndex = Math.floor(i / PER_SHEET);

    const col = indexInSheet % COLS;
    const row = Math.floor(indexInSheet / COLS);

    const x = col * TILE_W;
    const y = row * TILE_H;

    const image = `${sheetName}-${sheetIndex}.jpg`;

    output +=
      `${formatTimestamp(start)} --> ${formatTimestamp(end)}\n` +
      `${image}#xywh=${x},${y},${TILE_W},${TILE_H}\n\n`;
  }

  return output;
}

export async function generateVtt(
  durationSec: number,
  outputDir: string,
  sheetName = "storyboard"
): Promise<void> {
  const vttContent = makeVtt(durationSec, sheetName);

  const outputPath = path.join(outputDir, "thumbnails.vtt");

  await fs.writeFile(outputPath, vttContent, "utf-8");

  console.log("VTT generated:", outputPath);
}
