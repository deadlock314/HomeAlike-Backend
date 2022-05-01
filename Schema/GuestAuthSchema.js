const mongoose=require('mongoose');

const GuestAuthSchema=new mongoose.Schema(
   {
    
    name:{
        type:String,
        unique:true,
        required:[true, 'name required'],
        minlength:3

    }, 
    email:{
        required:[true, 'e-mail address required'],
        unique:[true,'existing email addresss '],
        type:String,
        lowercase:true
    },
    password:{
        type:String,
        unique:true,
        required:[true, 'hased password required']
       
    }
   
} 
);
const tempGuestAuthSchema= new mongoose.Schema(
    {
     
    email:{
         required:[true, 'e-mail address required'],
         unique:[true,'existing email addresss '],
         type:String,
         lowercase:true
    },
    otp:{
        required:true,
        type:Number,
        unique:[true,'duplicate otp']
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
  
    
 } 
 );
 
const tempGuestAuth =mongoose.model('tempGuestAuth',tempGuestAuthSchema);


 
const GuestAuth =mongoose.model('GuestAuth',GuestAuthSchema);

module.exports={GuestAuth,tempGuestAuth};