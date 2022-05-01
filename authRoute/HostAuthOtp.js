const router = require('express').Router();
const bcrypt = require('bcrypt');
const {tempHostAuth,HostAuth} =require('../Schema/HostAuthSchema');
const {Host} =require('../Schema/HostDataSchema');

router.route('/').post( (req,res)=>{
    const HostSideData=req.body;
    
    tempHostAuth.findOne({otp:HostSideData.otp}).then((doc,err)=>{
        if(doc && doc.email==HostSideData.email){  

            const newHostAuth= new HostAuth({name:HostSideData.name,email:HostSideData.email,password:HostSideData.paasword});
            const newHost= new Host({name:HostSideData.name,email:HostSideData.email});

        bcrypt.hash(HostSideData.password, 12, function (error, hashPassword){
            if(error){
            res.status(500).json({isHostSignedUp:false});
            }
            else{   

                newHostAuth.password=hashPassword;
                //anonmoyous  async fun for saving Host data
                (async()=>{
                try{
                    const res1=await newHost.save();
                    const res0=await newHostAuth.save();
                    res.status(201).json({isHostSignedUp:true,isResendOtp:false,isOtpWrong:false})  
                }
                catch(errors){ 
                    console.log(errors);
                    res.status(400).json({isHostSignedUp:false,isResendOtp:true,isOtpWrong:true}); 
                }
                })();
            }
        }); 

    }
    else{
        res.status(400).json({isHostSignedUp:false,isResendOtp:true,isOtpWrong:true});
    }

    })

 
})


module.exports=router;