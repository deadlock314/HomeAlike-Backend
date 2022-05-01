const mongoose=require('mongoose');
const {homeDetailsSchema}=require("./OwnerDataSchema");

const HomeDataSchema= new mongoose.Schema(
homeDetailsSchema
);
const HomeVar = mongoose.model("HomeVar", HomeDataSchema);

module.exports = { HomeVar};