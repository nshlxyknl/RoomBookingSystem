const express= require(`express`)
const router = express.Router()
const { uploadpdf,
        getallpdf,
        payc,
        updateStatus,
 }=require(`../controllers/taskcontrollers`)
const auth=require(`../middlewares/auth`)
const checkRole = require("../middlewares/rolecheck")

router.post(`/upload`,auth, checkRole("staff"),uploadpdf)
router.get(`/all`,auth, getallpdf)
router.post(`/pay`,auth, payc)
router.put(`/update`,auth, updateStatus)

module.exports=router
