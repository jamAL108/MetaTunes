import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const Login = async(req,res)=>{
    try{
       const data = req.body;
       const user = await User.findOne({username:data.username});
       if(!user){
        const usernameError="user doesnt exist";
        return res.status(404).send({error:usernameError});
       }
       const passwordcorrect = await bcrypt.compare(data.password , user.password);
       if(!passwordcorrect){
        const passwordError="Invalid credentials"
        return res.status(404).send({error:passwordError});
       }
       return res.status(200).send({message:"success" , response:user});
    }catch(err){
        console.log(err);
        const backenderror=err;
        return res.status(404).send({error:backenderror})
    }
};


export const Register = async(req,res)=>{
    try{
        const data = req.body;
        const existinguser = await User.findOne({username:data.username});
        if(existinguser){
            const usernameError="user already exists";
            return res.status(404).send({error:usernameError});
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(data.password, 10);
        const newuser = new User({
           username:data.username,
           password:hashedPassword
        })
        await newuser.save();
        return res.status(200).send({message:"success"});
    }catch(err){
        console.log(err);
        const backenderror=err;
        return res.status(404).send({error:backenderror})
    }
};