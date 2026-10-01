import {execFile } from "child_process"
import path from "path"
import crypto from "crypto"
const id=crypto.randomUUID().slice(0,6)
const outputPath=path.join(__dirname,`../../uploads/${id}.mp4`)
const inputPath=path.join(__dirname,"../../uploads/429d62b61210669ea27526d698e61d18.mp4")
export const runTranscode=execFile("ffmpeg", [
  "-i", inputPath,"-vf"," scale=-2:720",
  "-c:v", "libx264",
  outputPath
],(error)=>{
    console.log("start",Date.now())
    if(error){
        console.error(error)
        return ;
    }
    console.log("transcoding complete",Date.now())
}
);
