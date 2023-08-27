const mongoose =require("mongoose");

const PersonSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    providedLocation:{
        type:String,
        required:true
    },
    familyMember:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Person',PersonSchema)