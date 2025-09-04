import express from "express";
import path from "path";
import bcrypt from "bcrypt";
// import react from "react";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT  = 4000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());
app.use(cors());

//MongoDB connection
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB connected."))
.catch((err)=>{console.log("Error: "+ err)})

//example schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

const User = mongoose.model("Local", userSchema);

app.post("/signup", async (req, res)=>{
    try{
        const {name, email, pass} = req.body;
        const ifExists = await User.findOne({email});
        if(ifExists){
            return res.status(400).send("User already exists. Try loggin in.");
        }
        const hashedPass = await bcrypt.hash(pass, 10);
        const newUser = new User ({name, email, pass: hashedPass});
        await newUser.save();


        res.status(201).send("User Saved.")
    }catch(err){
        res.status(500).send("Error saving user.");
    }
})
app.post("/login", async (req, res)=>{
    try{
        const {email, pass} = req.body;
        const user = await User.findOne({email});
         if (!user) {
            return res.status(400).send("User not found.");
        }
        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(401).send("Invalid password.");
        }

        //Generate jwt
        const token = jwt.sign(
            {id: user._id, username: user.email },
            JWT_SECRET,
            {expiresIn: "1h"}
       );

        res.json({message: "Login Successful", token});
    }catch(err){
        res.status(500).send("Error loggin in.");
    }
})

app.listen(PORT ,function(err){
})
