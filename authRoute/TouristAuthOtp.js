const router = require('express').Router();
const bcrypt = require('bcrypt');
const {tempTouristAuth,TouristAuth} =require('../Schema/TouristAuthSchema');
const Tourist =require('../Schema/TouristData');

router.route('/').post( (req,res)=>{
    const TouristSideData=req.body;
    
    tempTouristAuth.findOne({otp:TouristSideData.otp}).then((doc,err)=>{
        if(doc && doc.email==TouristSideData.email){  

            const newTouristAuth= new TouristAuth({name:TouristSideData.name,email:TouristSideData.email,password:TouristSideData.paasword});
            const newTourist= new Tourist({name:TouristSideData.name,email:TouristSideData.email});

        bcrypt.hash(TouristSideData.password, 12, function (error, hashPassword){
            if(error){
            res.status(500).json({isTouristSignedUp:false});
            }
            else{   

                newTouristAuth.password=hashPassword;
                //anonmoyous  async fun for saving Tourist data
                (async()=>{
                try{
                    const res1=await newTourist.save();
                    const res0=await newTouristAuth.save();
                    res.status(201).json({isTouristSignedUp:true,isResendOtp:false,isOtpWrong:false})  
                }
                catch(errors){ 
                    res.status(500).json({isTouristSignedUp:false,isResendOtp:true,isOtpWrong:true}); 
                }
                })();
            }
        }); 

    }
    else{
        res.status(400).json({isTouristSignedUp:false,isResendOtp:true,isOtpWrong:true});
    }

    })

 
})


module.exports=router;