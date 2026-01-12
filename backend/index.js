require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')

app.use(cors ({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join('uploads')))


// API

app.use( (req,res) => res.status(404).json({ message:'ปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log("Server Running On Port 3001"))