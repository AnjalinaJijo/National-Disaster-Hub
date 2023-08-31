
const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex: true
        });
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDB;
