const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomnum: { type: Number, required: true, unique: true, trim: true },
    roomtype: {
      type: String,
      required: true,
      enum: ["single", "deluxe", "double"]
    },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ["available", "booked"], default: "available" },
    expiresAt: {type: Date },
    bookedAt: {type: Date }

  },
  { timestamps: true }
);

roomSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('roomtype')) {
    const priceMap = {
      single: 1000,
      deluxe: 2000,
      double: 1500
    };
    const imageMap = {
      single: "/images/single.jpg",
      double: "/images/double.jpg",
      deluxe: "/images/deluxe.jpg",
    };
    this.price = priceMap[this.roomtype];
    this.image = imageMap[this.roomtype];
  }
  // next();
});

module.exports = mongoose.model("Room", roomSchema);

