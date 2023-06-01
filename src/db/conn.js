// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://Abhiraj:KIQfPWnYMpohAdpM@helloapi.tfkr8kt.mongodb.net/HELLOAPI?retryWrites=true&w=majority").then(()=>{
//     console.log("The connection is sucessfully")
// }).catch(()=>{
//     console.log(Error);
// })

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/abhisekh",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("The connection is sucessfully")}).catch((error)=>{
    console.log(Error);
})