const Tourist = require("../Schema/TouristData");
const router = require("express").Router();


router.route("/").get((req,res)=>{
    const email=req.body.email;
Tourist.findOne({email}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

module.exports=router;