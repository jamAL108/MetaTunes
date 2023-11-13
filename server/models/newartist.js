import mongoose from 'mongoose';

const Newartist = new mongoose.Schema({
    name:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
		ref: "users",
    },
    image:{
        type:{}
    },
    note:{
        type:String
    },
    language:{
        type:String
    }
});

export default mongoose.model("newartist",Newartist);
