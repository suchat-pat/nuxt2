const express = require('express')
const router = express.Router()
const db = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
// Package
const bc = require('bcryptjs')

// Login API
router.post('/login',async (req,res) => {
    try{
        const {username,password,role} = req.body
        const [rows] = await db.query(`select * from tb_member where username='${username}' and role='${role}'`)
        const m = rows[0]
        if(!m || !(await bc.compare(password:m.password))) return res.status(403).json({ message:'Invalid Password' })
        const token = jwt.sign(
            {id_member:m.id_member,username:m.username,role:m.role} , JWT_SECRET , {expiresIn:'2h'}
        )
        res.json({token,role:m.role})
    }catch(err){
        console.error("Error Login",err)
        res.status(500).json({ message:'Error Login' })
    }
})

// Member Register API

router.post('/regis',async (req,res) => {
    try{
        const {first_name,last_name,email,username,password,role} = req.body
        const hash = await bc.hast(password,10)
        const [rows] = await db.query(`insert into tb_member (first_name,last_name,email,username,password,role) values (?,?,?,?,?,?)`,[first_name,last_name,email,username,hash,role])
        res.json({rows,message:'Register Success!'})
    }catch(err){
        console.error("Error Register",err)
        res.status(500).json({ message:'Error Register' })
    }
})

module.exports = router