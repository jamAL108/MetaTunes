import mongoose from 'mongoose';

const Artist = new mongoose.Schema({
    name:{
        type:String
    },
    imageURL:{
        type:String
    },
    note:{
        type:String
    }
});

export default mongoose.model("Artist",Artist);
