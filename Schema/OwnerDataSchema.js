const mongoose = require("mongoose");

const homeDetailsSchema = new mongoose.Schema({
  name: { type: String },
  cntfam: { type: String },
  state:{  type:String},
  city:{  type:String},
  village:{  type:String},
  pincode: { type: String },
  housenum: { type: String },
  landmrk: { type: String },
  facility: { type: String },
  culturalbg: { type: String },
  emaiid: { type: String },
  contact: { type: String },
  no_room: { type: String },
});

const OwnerSchema = new mongoose.Schema({
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
const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = { Owner,homeDetailsSchema };
