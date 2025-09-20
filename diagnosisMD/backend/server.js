import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));  

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  institution: String,
  email: { type: String, unique: true },
  password: String, // In production, passwords should be hashed
  confirmPassword: String,
  agreeToTerms: Boolean,
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  const { firstName, lastName, institution, email, password, confirmPassword, agreeToTerms } = req.body;
  if (!agreeToTerms) {
    return res.status(400).json({ message: 'You must agree to the terms and conditions.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }
  try {
    const user = new User({ firstName, lastName, institution, email, password, confirmPassword, agreeToTerms });
    //Check if user exist
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({message: "User already exists"});
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    await user.save();
    
    res.json({message: 'User registered successfully'});
  }catch(err){
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
