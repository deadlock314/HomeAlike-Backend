const router = require("express").Router();
const Owner = require('../Schema/OwnerDataSchema');

router.route("/").get((req,res)=>{
    const email=req.body.email;
Owner.findOne({email}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

module.exports=router;