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
    favourites:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "songs",
		},
    ],
    playlist:{
        type:[]
    }
})

const user = mongoose.model("user",User);

export default user;