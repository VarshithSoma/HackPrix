const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please tell us your email"],
  },
  name: {
    type: String,
    required: [true, "Please tell us your Name"],
  },
  hospitalname: {
    type: String,
    required: [true, "Please tell us your Hospital Name"],
  },
  contactnumber: {
    type: String,
    required: [true, "Please tell us your Contact Number"],
  },
  hospitalimgname: String,
  profileimgname: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  appointments: [],
});
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
