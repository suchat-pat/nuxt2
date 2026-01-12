const express = require('express')
const router = express.Router()
const db = require('../../db')
const bc = require('bcryptjs')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

router.get('/user',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select first_name,last_name,email,username,role from tb_member where id_member=?`,[id_member])
        res.json(rows[0])
    }catch(err){
        console.error("Error GET User",err)
        res.status(500).json({ message:'Error GET User' })
    }
})

router.get('/indicate',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate`)
        const result = topics.map((t) =>({
            ...t,
            indicates:indicates.filter((i) => i.id_topic === t.id_indicate)
        }))
        res.json(result)
    }catch(err){
        console.error("Error GET Topic",err)
        res.status(500).json({ message:'Error GET Topic' })
    }
})

module.exports = router