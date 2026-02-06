const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },
   email: {
      type: String,
      unique: true,
      sparse: true, // allows null for local users
    },
    role: {
      type: String,
      enum: ["staff","user"],
       default:"user",
      // required: true,
    },
     provider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    },

    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function () {

  if (!this.password || !this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  //  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
