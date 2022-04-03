const mongoose=require('mongoose');

const OwnerAuthSchema=new mongoose.Schema(
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
const tempOwnerAuthSchema= new mongoose.Schema(
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
 
const tempOwnerAuth =mongoose.model('tempOwnerAuth',tempOwnerAuthSchema);
const OwnerAuth =mongoose.model('OwnerAuth',OwnerAuthSchema);

module.exports={OwnerAuth,tempOwnerAuth};