const fetchid = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express =require("express");
const mongoose = require("mongoose");
require("./db/conn");
const app = express();
mongoose.set('strictQuery', false);
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");
const { rmSync } = require("fs");
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth");
const cors=require('cors');



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());




//serving public file
const public_path = path.join(__dirname,"../public");
app.use(express.static(public_path));

//serving dynamic file
const dynamic_path = path.join(__dirname,"../templates/views");
app.set("view engine","hbs");
app.set("views", dynamic_path);


//serving dynamic file
const partials_path = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partials_path)



app.get("/",(req,res)=>{
    res.render("home")
});
app.get("/about",(req,res)=>{
    res.render("about")
});
app.get("/job",(req,res)=>{
    res.render("job")
});
app.get("/register",(req,res)=>{
    res.render("register")
});
app.get("/Guidelines",(req,res)=>{
    res.render("Guidelines")
});
app.get("/G1",(req,res)=>{
    res.render("G1")
});
app.get("/G2",(req,res)=>{
    res.render("G2")
});
app.get("/G3",(req,res)=>{
    res.render("G3")
});
app.get("/G4",(req,res)=>{
    res.render("G4")
});
app.get("/G5",(req,res)=>{
    res.render("G5")
});

app.get("/FAQ",(req,res)=>{
    res.render("FAQ")
});
app.get("/know",(req,res)=>{
    res.render("know")
});
app.get("/Contribution",(req,res)=>{
    res.render("Contribution")
});

app.get("/careerpage",(req,res)=>{
    res.render("careerpage")
});
app.get("/secret", auth,(req,res)=>{
    // console.log(`This is my secret page token ${req.cookies.jwt}`)
    res.render("secret")
});
app.get("/login",(req,res)=>{
    res.render("login")
});
app.get("/logout",auth,async(req,res)=>{
   try {

    req.document.tokens=req.document.tokens.filter((currentEle)=>{
        return currentEle .token!==req.token;
    })

    res.clearCookie("jwt");
    await req.document.save();
    res.render("login");
   } catch (error) {
    res.status(500).send(error)
   }
});

// use post request 
app.post("/register",async(req,res)=>{
    try {
          const password = req.body.password;
          const confirmpassword = req.body.password;
          if(password===confirmpassword){
            const userdata = new Register({
                fullname:req.body.fullname,
                email:req.body.email,
                mobile:req.body.mobile,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            });
            const token = await userdata.mytoken();
            console.log("my token is "+ token);
            
            res.cookie("jwt",token,{
                expires:new Date(Date.now() +8939838792),
                httpOnly:true
            });
            const savedata = await userdata.save();
            res.status(201).render("home");
          }
    } catch (error) {
        res.status(400).send(error)
        
    }
});

app.post("/login",async(req,res)=>{
   try {
        const email = req.body.email;
        const password  = req.body.password;
    const useremail = await Register.findOne({email:email});
    const token = await useremail.mytoken();
    console.log("This is my token "+ token);

    res.cookie("jwt",token,{
        expires:new Date(Date.now() +50000),
        httpOnly:true
    });
    if(useremail.password===password){
        res.status(201).render("home")
    }else{
        res.send("invalid login details")
    }
   } catch (error) {
    res.status(400).send("invalid loing detail")
   }
});
app.get('/fetch',function(req,res) {
    const email=req.body.email;
    Register.find(({email:email}),function (_err,val) {
        res.send(val);
    })
})

app.post('/create',async (req,resp)=>{
   
    let data=new Register(req.body);
    let result=await data.save();
    console.log(result)

    resp.send(result);
})

app.delete('/delete/:_id',async (req,resp)=>{
    console.log(req.params)
    let data=await Register.deleteOne(req.params);
    resp.send(data)
})

app.put('/update/:_id',async (req,resp)=>{
    console.log(req.params)
    let data=await Register.updateOne(
        req.params,
        {
         $set: req.body     
        });
    resp.send(data);
})


app.listen(port,()=>{
    console.log(`the server is running port no ${port}`);
});
