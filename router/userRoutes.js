import express, { response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/model.js';

export const router = express.Router();


router.get('/login', (req, res) => {
  res.render("signIn");
});

router.get('/register', (req, res) => {
  res.render("signUp");
});

router.post('/register', async(req,res)=>{
  try{
    const{name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({email});
    if(existingUser){
      res.send("User Already Registered!!");
      return;
    }

    let userData = await User({name, email, password: hashedPassword});
    await userData.save();
    res.send(`User Registered by name: ${name}`)
  }catch(err){
    res.send(err);
  }
});

router.post('/login', async(req,res)=>{
  try{
    const{email, password}= req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
      res.send("Please register yourself first!!")
      return
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
      res.send("Incorrect Password");
      return 
    }
    res.redirect("/tasks")

  }catch(err){
    res.send(err);
  }
});