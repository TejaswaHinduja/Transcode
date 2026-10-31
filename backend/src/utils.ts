import { execFile } from "child_process"
import { error } from "console"
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

export function genThumbnails(inputPath:string,outputPath:string){
    return execFile("ffmpeg",[
        "-i" , path.resolve(inputPath) 
  ,"-vf" ,"fps=1/5,scale=160:90","tile=10x10" ,
  "-frames:v" ,"1" ,
  outputPath
    ],(error)=>{
        console.error(error)
        return
    })
}