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
const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

<<<<<<< HEAD
// Staff
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)
=======
//eva
const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)
>>>>>>> 4dd5d70ae92a4597795907490ac459a359123be9

app.use( (req,res) => res.status(404).json({ message:'ปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log("Server Running On Port 3001"))