import express from "express"
import multer from "multer"

const app=express()
app.use(express.json())
const upload=multer({dest:"../uploads/"})

app.post("/upload",upload.single("video"),(req,res)=>{
    const vid=req.file
    //@ts-ignore
    console.log(vid.filename)
    res.json({ filename: vid?.filename })
})
app.listen(4000)