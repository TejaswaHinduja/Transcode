import { execFile } from "child_process";
import path from "path";
import fs from "fs/promises";

const INTERVAL = 5;
const TILE_W = 160;
const TILE_H = 90;
const COLS = 10;
const ROWS = 10;
const PER_SHEET = COLS * ROWS;

function formatTimestamp(seconds: number) {
    const totalMs = Math.round(seconds * 1000);

    const h = Math.floor(totalMs / 3600000);
    const m = Math.floor((totalMs % 3600000) / 60000);
    const s = Math.floor((totalMs % 60000) / 1000);
    const ms = totalMs % 1000;

    return (
        `${String(h).padStart(2, "0")}:` +
        `${String(m).padStart(2, "0")}:` +
        `${String(s).padStart(2, "0")}.` +
        `${String(ms).padStart(3, "0")}`
    );
}

function makeVtt(duration: number, sheetName: string) {
    const count = Math.ceil(duration / INTERVAL);
    let output = "WEBVTT\n\n";

    for (let i = 0; i < count; i++) {
        const start = i * INTERVAL;
        const end = Math.min(start + INTERVAL, duration);

        const index = i % PER_SHEET;
        const sheet = Math.floor(i / PER_SHEET);

        const col = index % COLS;
        const row = Math.floor(index / COLS);

        const x = col * TILE_W;
        const y = row * TILE_H;

        output +=
            `${formatTimestamp(start)} --> ${formatTimestamp(end)}\n` +
            `${sheetName}-${sheet}.jpg#xywh=${x},${y},${TILE_W},${TILE_H}\n\n`;
    }

    return output;
}

export function genThumbnails(
    inputPath: string,
    outputDir: string,
    id: string
) {
    return new Promise<void>((resolve, reject) => {
        const input = path.resolve(inputPath);
        const spritePath = path.join(outputDir, `${id}-0.jpg`);

        console.log("Generating thumbnails...");

        execFile(
            "ffmpeg",
            [
                "-y",
                "-i", input,
                "-vf", `fps=1/${INTERVAL},scale=${TILE_W}:${TILE_H},tile=${COLS}x${ROWS}`,
                "-frames:v", "1",
                spritePath
            ],
            async (error, stdout, stderr) => {
                if (error) {
                    console.error("Thumbnail generation failed:", stderr);
                    return reject(error);
                }

                try {
                    
                    const duration = await new Promise<number>((res, rej) => {
                        execFile(
                            "ffprobe",
                            [
                                "-v", "error",
                                "-show_entries", "format=duration",
                                "-of", "default=noprint_wrappers=1:nokey=1",
                                input
                            ],
                            (err, stdout) => {
                                if (err) return rej(err);
                                res(Number(stdout.trim()));
                            }
                        );
                    });

                    const vtt = makeVtt(duration, id);

                    await fs.writeFile(
                        path.join(outputDir, "thumbnails.vtt"),
                        vtt,
                        "utf-8"
                    );

                    console.log("Sprite and VTT generated!");
                    resolve();
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
}