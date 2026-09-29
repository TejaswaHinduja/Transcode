import express from "express"
import multer from "multer"
import path from "path"
const app=express()
app.use(express.json())
const upload=multer({dest:"../uploads/"})

app.post("/upload",upload.single("video"),(req,res)=>{
    const vid=req.file
    //@ts-ignore
    console.log(vid.filename)
    res.json({ filename: vid?.filename })
})
app.get("/vid/:vidId",(req,res)=>{
    const vidId=req.params.vidId
    if(!vidId){
        return res.status(404)
    }
    const vidPath=path.join(__dirname,"../../uploads",vidId)
    
    res.sendFile(vidPath)
})
app.listen(4000)

//multer used so that we can parse the multipart http request without any headache
//multer is a I/O operation so that can run concurrently but if lets say the req res callback has some expensive operationt then requests would have to wait
