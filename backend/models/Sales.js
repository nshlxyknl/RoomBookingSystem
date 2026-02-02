const mongoose = require("mongoose")

const salesItems = new mongoose.Schema({
    roomnum: { type: Number, required: true, unique: true, trim: true },
    roomtype: {
      type: String,
      required: true,
      enum: ["single", "deluxe", "double"]
    },
     status: { type: String, enum: ["available", "booked"], default: "available" },
    expiresAt: {type: Date },
    bookedAt: {type: Date }
},{ timestamps: true }
)

module.exports = mongoose.model("Sales", salesItems);