const express = require('express')
const router = express.Router()
const db = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
// Package
const bc = require('bcryptjs')

router.post('/login',async (req,res) => {
    try{
        const {username,password,role} = req.body
        const [rows] = await db.query(`select * from tb_member where username='${username}' and role='${role}'`)
    }catch(err){}
})

module.exports = router