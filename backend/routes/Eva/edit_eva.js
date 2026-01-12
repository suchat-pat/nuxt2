const express = require('express')
const router = express.Router()
const db = require('../../db')
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

module.exports = router