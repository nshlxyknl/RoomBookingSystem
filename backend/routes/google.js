const express = require(`express`)
const router=express.Router()
const { google } = require("../controllers/googlecontrollers")


router.post(`/google`,google)

module.exports=router
