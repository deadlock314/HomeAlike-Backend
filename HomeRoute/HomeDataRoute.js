const router = require("express").Router();
const {HomeVar}=require("../Schema/homeRouteSchema");

router.route("/").get((req,res)=>{
   HomeVar.find({}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

module.exports=router;