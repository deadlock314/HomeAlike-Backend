const router = require('express').Router();
const bcrypt = require('bcrypt');
const {tempGuestAuth,GuestAuth} =require('../Schema/GuestAuthSchema');
const Guest =require('../Schema/GuestData');

router.route('/').post( (req,res)=>{
    const GuestSideData=req.body;
    
    tempGuestAuth.findOne({otp:GuestSideData.otp}).then((doc,err)=>{
        if(doc && doc.email==GuestSideData.email){  

            const newGuestAuth= new GuestAuth({name:GuestSideData.name,email:GuestSideData.email,password:GuestSideData.paasword});
            const newGuest= new Guest({name:GuestSideData.name,email:GuestSideData.email});

        bcrypt.hash(GuestSideData.password, 12, function (error, hashPassword){
            if(error){
            res.status(500).json({isGuestSignedUp:false});
            }
            else{   

                newGuestAuth.password=hashPassword;
                //anonmoyous  async fun for saving Guest data
                (async()=>{
                try{
                    const res1=await newGuest.save();
                    const res0=await newGuestAuth.save();
                    res.status(201).json({isGuestSignedUp:true,isResendOtp:false,isOtpWrong:false})  
                }
                catch(errors){ 
                    res.status(500).json({isGuestSignedUp:false,isResendOtp:true,isOtpWrong:true}); 
                }
                })();
            }
        }); 

    }
    else{
        res.status(400).json({isGuestSignedUp:false,isResendOtp:true,isOtpWrong:true});
    }

    })

 
})


module.exports=router;