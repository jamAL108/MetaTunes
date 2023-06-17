import mongoose from 'mongoose';

const playlists = new mongoose.Schema({
    Type:{
        type:String
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
    songs:{
        type:[]
    }
});


export default  mongoose.model("playlist",playlists);
