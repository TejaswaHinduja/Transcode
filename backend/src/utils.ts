import { execFile } from "child_process"
import path from "path"


export const runTranscode=(inputPath:string,outputPath:string)=>{
    
    const inputPathmp4=path.join(__dirname,`../${inputPath}`)
    console.log("trancoding started")
    return execFile("ffmpeg", [
  "-i", inputPathmp4,"-vf","scale=-2:720",
  "-c:v", "libx264",
  outputPath
],(error)=>{
    if(error){
        console.error(error)
        return ;
    }
    console.log("complete",outputPath)
}
);
}
//todo build a hls playlist 
//gpu h264_nvenc","-preset","fast