const router = require('express').Router();
const bcrypt = require('bcrypt');
const {tempOwnerAuth,OwnerAuth} =require('../Schema/OwnerAuthSchema');
const {Owner} =require('../Schema/OwnerDataSchema');

router.route('/').post( (req,res)=>{
    const OwnerSideData=req.body;
    
    tempOwnerAuth.findOne({otp:OwnerSideData.otp}).then((doc,err)=>{
        if(doc && doc.email==OwnerSideData.email){  

            const newOwnerAuth= new OwnerAuth({name:OwnerSideData.name,email:OwnerSideData.email,password:OwnerSideData.paasword});
            const newOwner= new Owner({name:OwnerSideData.name,email:OwnerSideData.email});

        bcrypt.hash(OwnerSideData.password, 12, function (error, hashPassword){
            if(error){
            res.status(500).json({isOwnerSignedUp:false});
            }
            else{   

                newOwnerAuth.password=hashPassword;
                //anonmoyous  async fun for saving Owner data
                (async()=>{
                try{
                    const res1=await newOwner.save();
                    const res0=await newOwnerAuth.save();
                    res.status(201).json({isOwnerSignedUp:true,isResendOtp:false,isOtpWrong:false})  
                }
                catch(errors){ 
                    console.log(errors);
                    res.status(400).json({isOwnerSignedUp:false,isResendOtp:true,isOtpWrong:true}); 
                }
                })();
            }
        }); 

    }
    else{
        res.status(400).json({isOwnerSignedUp:false,isResendOtp:true,isOtpWrong:true});
    }

    })

 
})


module.exports=router;