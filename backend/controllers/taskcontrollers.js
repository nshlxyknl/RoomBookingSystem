const Task = require("../models/Room");
const User = require("../models/User");


exports.uploadpdf = async (req, res) => {
  try {
    const { roomnum, roomtype } = req.body;

    if (!roomnum || !roomtype) {
      return res.status(400).json({ message: "num and type are required" });
    }

    const roomExists = await Task.findOne({ roomnum });
    if (roomExists) {
      return res.status(400).json({
        message: "Room already exists",
        suggestion: "Please choose a different room number",
      });
    }

    const task = await Task.create({
      roomnum,
      roomtype,
    });


    res.status(201).json({
      task,
      message: "Room created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not create room",
      details: error.message,
    });
  }
};


exports.getallpdf = async (req, res) => {
  try {
    const rooms = await Task.find()
      .sort({ createdAt: -1 });

          console.log("Rooms with buyer:", rooms); 


    res.json({
      rooms,
      count: rooms.length,
      message: "Tasks retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch tasks",
      details: error.message,
    });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { roomId, time } = req.body;
    console.log("Bookee data:", {

      roomId,
      time,
            userId: req.user.userId

    });

    const room = await Task.findById(roomId);
    const newStatus = room.status === "available" ? "booked" : "available";



    const update = { status: newStatus };
    if (newStatus === "booked") {

      const days = time === "aday" ? 1 : 7;


      update.buyer = req.user.userId; //new mongoose.Types.ObjectId(req.user.userId);
      update.bookedAt = new Date();
      update.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    } else {
      update.buyer = null;
      update.bookedAt = null;
      update.expiresAt = null;
    }

    const updatedRoom = await Task.findByIdAndUpdate(
      roomId,
      update,
      { new: true }
    );

    const message = newStatus === "booked" ? "Room booked successfully" : "Room is now available";

    console.log("chalexa", update)

    res.json({ message, room: updatedRoom });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const stripe = require("stripe")(process.env.SECRET_KEY)
exports.payc = async (req, res) => {
  try {
    const { roomId, time, roomtype, price, status, roomnum } = req.body;
    const buyerId = req.user.userId;
    console.log("Booking data:", {
      time,
      roomId,
      roomtype,
      buyerId,
      price, status, roomnum
    });

    const clientUrl =
      process.env.CLIENT_URL || 'http://localhost:5173';

    if (!roomId || !time || !buyerId || !roomtype || !price) {
      return res.status(400).json({ message: "Missing booking info" });
    }

    let finalPrice;
    if (time === "aday") {
      finalPrice = price;
    } else if (time === "aweek") {
      finalPrice = price * 6;
    } else {
      return res.status(400).json({ message: "Invalid time option" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${roomtype} room no. ${roomnum} booking`
            },
            unit_amount: finalPrice,
          },
          quantity: 1,
        }
      ],
      success_url: `${clientUrl}/dashboard?payment=success`,
      cancel_url: `${clientUrl}/dashboard?payment=cancel`,
      metadata: {
        buyerId,
        roomId,
        time
      },
    });
    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({
      message: "Could not pay",
      details: error.message,
    })
  }
}