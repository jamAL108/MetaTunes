import mongoose from 'mongoose';
const { Schema } = mongoose;
const Song = new mongoose.Schema({
    name:{
        type:String
    },
    imageURL:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/metatunes-2195e.appspot.com/o/musiccoverpic%2Fdefault_cover.jpg?alt=media&token=19ea7923-6e55-41b7-887c-3467f056aadf"
    },
    songURL:{
        type:String
    },
    artist:{
        type:Array,
        default:[]
    },
    language:{
        type:String
    },
    artistId:[
		{
			type: Schema.Types.ObjectId,
			ref: "artists",
		},
    ],
    like:{
        type:Boolean,
        default:false
    },
    totalstream:{
        type:Number
    },
    totallikes:{
        type:Number
    }
});

export default mongoose.model("songs",Song);