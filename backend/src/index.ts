import express from "express"
import multer from "multer"
import path from "path"
import { runTranscode,genThumbnails } from "./utils"
import crypto from "crypto"
import fs from "fs"
import cors from "cors"
const app=express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
})) 

const uploadsDir = path.join(__dirname, "../../uploads")
fs.mkdirSync(uploadsDir, { recursive: true })
const upload=multer({dest: uploadsDir})
app.use("/streams", express.static(uploadsDir))

app.post("/upload",upload.single("video"),async (req,res)=>{
    if(!req.file){
        return res.status(201).json({message:"no video provided"})
    }
    const id=crypto.randomUUID().slice(0,6)
    const inputPath=req.file.path
    const outputDir=path.join(uploadsDir,id)
    const outputPath=path.join(outputDir,`${id}.m3u8`)
    const segmentPath=path.join(outputDir,`${id}-%03d.ts`)
    fs.mkdirSync(outputDir, { recursive: true })
    const thumbPath=path.join(outputDir,`thum${id}`)
    runTranscode(inputPath,segmentPath,outputPath)
    genThumbnails(outputPath,thumbPath)
    res.json({ msg:"transcoding started",playlist:`/vid/${id}` })
})
app.get("/vid/:vidId",(req,res)=>{
    const vidId=req.params.vidId
    if(!vidId){
        return res.status(404).end()
    }
    const vidPath=path.join(__dirname,`../../uploads/${vidId}/${vidId}.m3u8`)
    
    res.sendFile(vidPath)
})
// we would need to use express.static here

app.listen(4000)

//multer used so that we can parse the multipart http request without any headache
//multer is a I/O operation so that can run concurrently but if lets say the req res callback has some expensive operationt then requests would have to wait
