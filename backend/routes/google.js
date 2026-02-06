const express = require(`express`)
const router=express.Router()
const { google } = require("../controllers/googlecontroller")


router.post(`/google`,google)

module.exports=router
