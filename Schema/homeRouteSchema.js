const mongoose=require('mongoose');
const {homeDetailsSchema}=require("./OwnerDataSchema");

const HomeDataSchema= new mongoose.Schema({
type:Array,
homeDetailsSchema
});
const HomeVar = mongoose.model("HomeVar", HomeDataSchema);

module.exports = { HomeVar};