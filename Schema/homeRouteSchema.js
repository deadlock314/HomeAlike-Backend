const mongoose=require('mongoose');
const {homeDetailsSchema}=require("./HostDataSchema");

const HomeDataSchema= new mongoose.Schema(
homeDetailsSchema
);
const HomeVar = mongoose.model("HomeVar", HomeDataSchema);

module.exports = { HomeVar};