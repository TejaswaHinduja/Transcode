import { execFile } from "child_process"
import path from "path"


export const runTranscode = (inputPath: string, segmentPath: string, outputPath: string) => {
    console.log("trancoding started")
    return execFile("ffmpeg", [
        "-i", path.resolve(inputPath),
        "-vf", "scale=-2:720",
        "-c:v", "libx264",
        "-c:a", "aac",
        "-f", "hls",
        "-hls_time", "6",
        "-hls_playlist_type", "vod",
        "-hls_segment_filename", segmentPath,
        outputPath
    ], (error) => {
        if (error) {
            console.error(error)
            return
        }
        console.log("complete", outputPath)
    }
    )
}
//gpu h264_nvenc","-preset","fast