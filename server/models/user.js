import mongoose from 'mongoose';
const { Schema } = mongoose;
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
			type: Schema.Types.ObjectId,
			ref: "songs",
		},
    ],
    playlist:[
		{
			type: Schema.Types.ObjectId,
			ref: "playlists",
		},
    ]
})

const user = mongoose.model("user",User);

export default user;