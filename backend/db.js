const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Pathsala"

const ConnectMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose");
    })

} 

module.exports=ConnectMongo;