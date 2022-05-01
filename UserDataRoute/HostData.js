const router = require("express").Router();
const Host = require('../Schema/HostDataSchema');

router.route("/").get((req,res)=>{
    const email=req.body.email;
Host.findOne({email}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

module.exports=router;