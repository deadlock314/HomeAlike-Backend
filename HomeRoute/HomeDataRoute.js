const router = require("express").Router();
const {HomeVar}=require("../Schema/homeRouteSchema");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.route("/").get((req,res)=>{
   HomeVar.find({}).then((response,err)=>{
       (err)?res.json({isError:true}):res.json(response);
   }).catch((err)=>{res.json()})

});

router.route("/").post(upload.single("image"), (req, res)=>{
    console.log(req.body);
    const homeVar = new HomeVar({
        
            name:req.body.name,
            cntfam :req.body.cntfam,
            pincode:req.body.pincode,
            state:req.body.state,
            city:req.body.city,
            "hnum":req.body.hnum,
            landmark:req.body.landmark,
            "facility":req.body.facility,
            "emaiid":req.body.emaiid,
            "contact":req.body.contact,
        "img.data":req.file.buffer,
        "img.contentType": "image/jpg",
    });
    
    homeVar.save((err)=> {
        (err) ?console.log(err):res.json({isDataUploaded:true})
    });
    // res.json({isDataUploaded:false})
});

module.exports=router;