const express = require('express')
const router =  express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')
const bc = require('bcryptjs')

// ===================================== DEMO ==========================================
// Get API
// router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({ message: 'Error Get' })
//     }
// })
// ===================================== DEMO ==========================================


// GET API
router.get('/eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select id_member,first_name,last_name,email,username,role from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error get'})
    }
})

// GET API
router.get('/commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select id_member,first_name,last_name,email,username,role from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error get'})
    }
})

// GET API
router.get('/all',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select id_member,first_name,last_name,email,username,role from tb_member order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error get'})
    }
})

// GET API By Params
router.get('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`select * from tb_member where id_member='${id_member}'`)
        if(rows.length === 0) return res.status(403).json({ message:'ไม่พบข้อมูล' })
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error get'})
    }
})

// pUT API
router.put('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        if(password && password.trim()){
            const hash = await bc.hash(password, 10)
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? WHERE id_member='${id_member}'`,[first_name,last_name,email,username,hash,role])
        }else{
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=? WHERE id_member='${id_member}'`,[first_name,last_name,email,username,role])
        }
        res.json({message:'Update Success!'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({ message: 'Error Update' })
    }
})

// Delete API
router.delete('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`delete from tb_member WHERE id_member='${id_member}'`)
        res.json({rows,message:'Delete Success!'})
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({ message: 'Error Delete' })
    }
})

module.exports = router