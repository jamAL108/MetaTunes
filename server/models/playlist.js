import mongoose from 'mongoose';
const { Schema } = mongoose;
const playlists = new mongoose.Schema({
    Type:{
        type:Boolean
    },
    author:{
        type:String
    },
    name:{
        type:String
    },
    image:{
        type:{}
    },
    description:{
        type:String
    },
    songs:[
		{
			type: Schema.Types.ObjectId,
			ref: "songs",
		},
    ],
    likes:{
        type:Number
    }
});


export default  mongoose.model("playlist",playlists);
