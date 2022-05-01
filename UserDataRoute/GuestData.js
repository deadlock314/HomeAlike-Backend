const Guest = require("../Schema/GuestData");
const router = require("express").Router();


router.route("/").get((req,res)=>{
    const email=req.body.email;
Guest.findOne({email}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

module.exports=router;