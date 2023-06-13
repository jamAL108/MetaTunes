import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favourites:{
        type:[]
    },
    playlist:{
        type:[]
    }
})

const user = mongoose.model("user",User);

export default user;