const express = require('express')
const router = express.Router()
const db = require('../../db')
const bc = require('bcryptjs')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

router.get('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select first_name,last_name,email,username,role from tb_member where id_member=?`,[id_member])
        res.json(rows[0],{message:'GET User Success!'})
    }catch(err){
        console.error("Error GET User",err)
        res.status(500).json({ message:'Error GET User' })
    }
})

router.put('/editpass',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username,password} = req.body
        const hashPass = await bc.hash(password,10)
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=? where id_member=?`,[first_name,last_name,email,username,hashPass,id_member])
        res.json({message:'แก้ไขสำเร็จ'})
    }catch(err){
        console.error("Error PUT User",err)
        res.status(500).json({ message:'Error PUT User' })
    }
})

router.put('/editname',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=? where id_member=?`,[first_name,last_name,email,username,id_member])
        res.json({message:'แก้ไขสำเร็จ'})
    }catch(err){
        console.error("Error PUT User",err)
        res.status(500).json({ message:'Error PUT User' })
    }
})

module.exports = router