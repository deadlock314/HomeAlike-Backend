const express = require('express')
const cors =require('cors')
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const app = express();
require('dotenv').config();


app.use(cors({
    origin:"http://localhost:3000",
credentials:true
}));

app.use(cookieParser())

app.use(express.json());




mongoose.connect(process.env.DB_URI).then(
    app.listen(process.env.PORT|| 8443 ,(err)=>{
        if(err) console.error(err)
        else
           console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);
           
    })
    
).catch(err=>console.error(err));
                    
   

const TouristloginRoute=require('./authRoute/TouristlogIn');
const TouristSignUpRoute=require('./authRoute/TouristSignUp');
const TouristOtpRoute=require('./authRoute/TouristAuthOtp');
const TouristProfile=require("./UserDataRoute/TouristData");

const OwnerloginRoute=require('./authRoute/OwnerlogIn');
const OwnerSignUpRoute=require('./authRoute/OwnerSignUp');
const OwnerOtpRoute=require('./authRoute/OwnerAuthOtp');
const OwnerProfile=require("./UserDataRoute/OwnerData");

const HomeDataRoute=require("./HomeRoute/HomeDataRoute")


app.use('/tourist/login', TouristloginRoute);
app.use('/tourist/signup',TouristSignUpRoute);
app.use('/tourist/signup/otp',TouristOtpRoute);


app.use('/owner/login', OwnerloginRoute);
app.use('/owner/signup',OwnerSignUpRoute);
app.use('/owner/signup/otp',OwnerOtpRoute);

app.use('/homedata',HomeDataRoute);


