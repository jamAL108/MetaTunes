import artist from "../models/artist.js";
import song from '../models/song.js';
import User from "../models/user.js";
import playlist from "../models/playlist.js";

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
           artistId:artistId,
           like:false,
           totallikes:0,
           totalstream:0
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
     console.log("heryyy");
     return res.status(200).send({response:artists});
   }catch(err){
    console.log(err);
    return res.status(404).send({error:err});
   }
};

export const commonplaylist = async(req,res)=>{
  try{
    const playlists = await playlist.find({Type:false});
    console.log("heryyy");
    return res.status(200).send({response:playlists});
  }catch(err){
   console.log(err);
   return res.status(404).send({error:err});
  }
};


export const getartist = async(req,res)=>{
  try{
    console.log(req.params);
    const { id } = req.params;
    const getartist = await artist.findOne({_id:id});
    const {username} = req.body;
    let songs=[];
    console.log(username);
    if(!username){
     songs = await song.find({artistId: {$in:id}});
     for(var k=0;k<songs.length;k++){
      songs[k].like=false;
    }
    }else{
      const user=await User.findOne({username: username});
      songs = await song.find({artistId: {$in:id}});
      if(user.favourites.length!==0){
          for(var i=0;i<user.favourites.length;i++){
            for(var j=0;j<songs.length;j++){
                if(user.favourites[i].equals(songs[j]._id)){
                  songs[j].like=true;
                  console.log("heeey");
                }
            }
          }
      }else{
        songs = await song.find({artistId: {$in:id}});
        for(var k=0;k<songs.length;k++){
          songs[k].like=false;
        }
      }
    }
    const artiste={
      artist:getartist,
      songs:songs
    }
    console.log(artiste);
    return res.status(200).send({response:artiste});
  }catch(err){
   console.log(err);
   return res.status(404).send({error:err});
  }
};


export const getallsong = async(req,res)=>{
  try{
    console.log(req.body);
    const {username} = req.body;
    let songs=[];
    console.log(username);
    if(!username){
     songs = await song.find({});
     for(var k=0;k<songs.length;k++){
      songs[k].like=false;
    }
    }else{
      const user=await User.findOne({username: username});
      songs = await song.find({});
      if(user.favourites.length!==0){
          for(var i=0;i<user.favourites.length;i++){
            for(var j=0;j<songs.length;j++){
                if(user.favourites[i].equals(songs[j]._id)){
                  songs[j].like=true;
                  console.log("heeey");
                }
            }
          }
      }else{
        songs = await song.find({});
        for(var k=0;k<songs.length;k++){
          songs[k].like=false;
        }
      }
    }
    console.log("nuhvbkeuvnkesvv");
    return res.status(200).send({response:songs});
  }catch(err){
   console.log(err);
   return res.status(404).send({error:err});
  }
}




export const getplaylist = async(req,res)=>{
  try{
      const { id } = req.params;
      const playlistey = await playlist.findOne({_id:id});
      return res.status(200).send({response:playlistey});
  }catch{
    console.log(err);
    return res.status(404).send({error:err});
  }
}


export const categories = async(req,res)=>{
  try{
      const { id } = req.params;
      const songs = await song.find({language:id});
      const artistey = await artist.find({language:id});
      const playlistey = await playlist.find({Type:false});
      let play=[];
      for(var i=0;i<playlistey.length;i++){
        let count=0;
        for(var j=0;j<playlistey[i].songs.length;j++){
        const songey = await song.findOne({_id:playlistey[i].songs[j]})
        if(songey.language===id){
           count++;
        }
        }
        if(count>=playlistey[i].songs.length/2){
          play.push(playlistey[i]);
        }
      }
      const obj ={
        song:songs,
        artist:artistey,
        playlist:play
      }
      return res.status(200).send({response:obj});
  }catch{
    console.log(err);
    return res.status(404).send({error:err});
  }
}