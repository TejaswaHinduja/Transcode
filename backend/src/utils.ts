import {execFile } from "child_process"
import path from "path"
const outputPath=path.join(__dirname,"../../uploads/429A720.mp4")
const inputPath=path.join(__dirname,"../../uploads/429d62b61210669ea27526d698e61d18.mp4")
execFile("ffmpeg", [
  "-i", inputPath,"-vf scale=-2:720",
  "-c:v", "libx264",
  outputPath
]);
