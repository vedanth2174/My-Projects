import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const jwt_secret = process.env.jwt;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user ", err);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //match password
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: existingUser.email }, jwt_secret, {
      expiresIn: "1h",
    });
    res.json({ token, user: { name: existingUser.name, email: existingUser.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server live on port number ${PORT}`);
});
