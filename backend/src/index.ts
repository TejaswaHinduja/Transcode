import express from "express"
import multer from "multer"
import path from "path"
import { runTranscode } from "./utils"
import crypto from "crypto"
import { Worker } from "worker_threads"
const app=express()
app.use(express.json())


const upload=multer({dest:"../uploads/"})
const id=crypto.randomUUID().slice(0,6)
const outputPath=path.join(__dirname,`../../uploads/${id}.mp4`)
    

app.post("/upload",upload.single("video"),(req,res)=>{
    const vid=req.file
    if(!vid){
        return res.status(201).json({message:"no video provided"})
    }
    
    runTranscode(outputPath)
    //@ts-ignore
    res.json({message:"transcoding starte", filename: vid?.filename })
})
app.get("/vid/:vidId",(req,res)=>{
    const vidId=req.params.vidId
    if(!vidId){
        return res.status(404)
    }
    
    const vidPath=path.join(__dirname,"../../uploads",`${id}.mp4`)
    
    res.sendFile(vidPath)
})


app.listen(4000)

//multer used so that we can parse the multipart http request without any headache
//multer is a I/O operation so that can run concurrently but if lets say the req res callback has some expensive operationt then requests would have to wait
