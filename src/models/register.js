const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]

    
   
});

userSchema.methods.mytoken=async function(){
    try {
        const token = jwt.sign({_id:this.id.toString()},"iamAbhishekandiamafillstackdeveloper")
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send("this is my error"+error)
        console.log("this is my error" + error)
    }
}


// create Collection 

const Register= new mongoose.model("Register",userSchema);

module.exports = Register;
