const mongoose = require("mongoose");

const homeDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  village: { type: String },
  pincode: { type: String, required: true },
  landmark: { type: String, required: true },
  facility: { type: String, required: true },
  homeId: {type: String}
});

const HostSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
  },
  email: {
    required: [true, "e-mail address required"],
    unique: [true, "existing email addresss "],
    type: String,
    lowercase: true,
  },
  homeDetailsArr: {
    type: Array,
    homeDetailsSchema
  },
});
const Host = mongoose.model("Host", HostSchema);

module.exports = { Host, homeDetailsSchema };
