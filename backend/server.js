const express = require('express');
const cors = require('cors');
require('dotenv').config();



const mango= require(`./config/mongo`)
PORT= process.env.PORT;

mango();

const app = express();
app.use(express.json())

app.use(cors({ origin:['http://localhost:5173','https://room-booking-system-omega.vercel.app','https://myroom.nischalkhanal7.com.np' ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control', 'Expires','Pragma']
}))

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use("/images", express.static("public/images"));


app.use(`/authtype`,require(`./routes/auth`))
app.use(`/tasktype`,require(`./routes/task`))


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
  });
