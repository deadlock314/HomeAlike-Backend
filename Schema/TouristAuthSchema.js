const mongoose=require('mongoose');

const TouristAuthSchema=new mongoose.Schema(
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
const tempTouristAuthSchema= new mongoose.Schema(
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
    createdAt: { type: Date, expires: '3m', default: Date.now }
  
    
 } 
 );
 
const tempTouristAuth =mongoose.model('tempTouristAuth',tempTouristAuthSchema);


 
const TouristAuth =mongoose.model('TouristAuth',TouristAuthSchema);

module.exports={TouristAuth,tempTouristAuth};