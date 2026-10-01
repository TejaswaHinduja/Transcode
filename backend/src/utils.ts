import {execFile } from "child_process"
import path from "path"


export const runTranscode=(outputPath:string)=>{
    
    const inputPath=path.join(__dirname,"../../uploads/884f1dadd32cdab17c894928cd4ab794.mp4")
    return execFile("ffmpeg", [
  "-i", inputPath,"-vf","scale=-2:720",
  "-c:v", "libx264",
  outputPath
],(error)=>{
    if(error){
        console.error(error)
        return ;
    }
}
);
}

//gpu h264_nvenc","-preset","fast