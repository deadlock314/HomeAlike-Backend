const mongoose=require('mongoose');

const TouristSchema=new mongoose.Schema(
   {
    
    name:{
        type:String,
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

 
const Tourist =mongoose.model('Tourist',TouristSchema);