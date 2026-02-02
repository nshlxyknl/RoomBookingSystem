const Sales = require("../models/Sales");

exports.savedsales =async (req,res)=>{
    try {
const {roomnum, roomtype, buyerId, status, expiresAt, bookedAt}= req.body;


    const sales=  await Sales.create({
            roomnum,
            roomtype,
            buyerId,
            status,
            expiresAt,
            bookedAt
        })

         res.status(201).json({
      sales,
      message: "Room created successfully",
    });
        
    } catch (error) {
         res.status(500).json({
      message: "Could not save ",
      details: error.message,
    });
    }

}