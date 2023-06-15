import artist from "../models/artist.js";
import song from '../models/song.js';

export const Addsong = async(req,res)=>{
    try{
       const body = req.body;
       let artistId=[];
       console.log(body);
       for(var i=0;i<body.artist.length;i++){
        let artists = await artist.findOne({name:body.artist[i]});
        if(artists){
          artistId.push(artists._id);
        }
       }
       const newsong= new song({
           name:body.name,
           imageURL:body.imageURL,
           songURL:body.songURL,
           artist:body.artist,
           language:body.language,
           artistId:artistId
       })
       await newsong.save();
       return res.status(200).send({response:newsong});
    }catch(eer){
      console.log(eer);
      return res.status(404).send({error:eer});
    }
};


export const getallartist = async(req,res)=>{
   try{
     const artists = await artist.find({});
     console.log(artists);
     return res.status(200).send({response:artists});
   }catch(err){
    console.log(err);
    return res.status(404).send({error:err});
   }
};

export const getallsong = async(req,res)=>{
  try{
    const songs = await song.find({language:"english"});
    console.log(songs);
    return res.status(200).send({response:songs});
  }catch(err){
   console.log(err);
   return res.status(404).send({error:err});
  }
}