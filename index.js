const express = require('express')
const cors =require('cors')
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const app = express();
require('dotenv').config();


app.use(cors({
     origin: ["http://localhost:3000", "https://home-alike.netlify.app","http://192.168.43.230:3000/"]
    ,
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
                    
   

const GuestloginRoute=require('./authRoute/GuestlogIn');
const GuestSignUpRoute=require('./authRoute/GuestSignUp');
const GuestOtpRoute=require('./authRoute/GuestAuthOtp');
const GuestProfile=require("./UserDataRoute/HostData");

const HostloginRoute=require('./authRoute/HostLogin');
const HostSignUpRoute=require('./authRoute/HostSignUp');
const HostOtpRoute=require('./authRoute/HostAuthOtp');
const HostProfile=require("./UserDataRoute/HostData");

const HomeDataRoute=require("./HomeRoute/HomeDataRoute")


app.use('/guest/login', GuestloginRoute);
app.use('/guest/signup',GuestSignUpRoute);
app.use('/guest/signup/otp',GuestOtpRoute);


app.use('/host/login', HostloginRoute);
app.use('/host/signup',HostSignUpRoute);
app.use('/host/signup/otp',HostOtpRoute);

app.use('/homedata',HomeDataRoute);


