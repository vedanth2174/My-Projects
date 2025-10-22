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

const networkSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  admin: String,
  memberCount: Number,
  suggestionCount: Number,
});

const Network = mongoose.model("network", networkSchema);

const suggestionSchema = new mongoose.Schema({
  id: Number,
  author: String,
  date: String,
  title: String,
  description: String,
  status: String,
  votes: Number,
  network_id: Number,
});

const Suggestion = mongoose.model("suggestion", suggestionSchema);

const connectionSchema = new mongoose.Schema({
  email: String,
  connections: Array,
});

const Connection = mongoose.model("connection", connectionSchema);

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
    res.json({
      token,
      user: { name: existingUser.name, email: existingUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add suggestion
app.post("/add-suggestion", async (req, res) => {
  try {
    const { id, author, date, title, description, status, votes, network_id } =
      req.body;
    const newSuggestion = new Suggestion({
      id,
      author,
      date,
      title,
      description,
      status,
      votes,
      network_id,
    });
    //save suggestion
    await newSuggestion.save();
    res.json(newSuggestion);
  } catch (err) {
    console.error("Error adding suggestion: ", err);
  }
});

//fetch networks
app.get("/fetch-networks", async (req, res) => {
  try {
    const networks = await Network.find();
    res.status(200).json(networks);
  } catch (err) {
    console.error("Error fetching networks: ", err);
    res
      .status(500)
      .json({ message: "Error fetching networks", error: err.message });
  }
});

//particular network details
app.get("/network-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const network = await Network.findOne({ id });
    res.status(200).json(network);
  } catch (err) {
    console.error("Error fetching network details: ", err);
  }
});

//admin network details
app.get("/admin-networks/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const adminNetworks = await Network.find({ admin: email });
    res.status(200).json(adminNetworks);
  } catch (err) {
    console.error("Error fetching your networks: ", err);
  }
});

//fetch suggestions
app.get("/fetch-suggestions", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.status(200).json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions: ", err);
    res
      .status(500)
      .json({ message: "Error fetching suggestions", error: err.message });
  }
});

//fetch network specific suggestions
app.get("/network-suggestions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const suggestions = await Suggestion.find({ network_id: id });
    res.status(200).json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions: ", err);
  }
});

//fetch network of particular user
app.get("/fetch-user-networks/:email", async (req, res) => {
  try {
    const { email } = req.params;
    //find user's network list
    const networks = await Connection.findOne({ email });

    if (!networks) {
      return res.status(404).json({ message: "User not found" });
    }
    //Fetch networks
    const network_ids = networks.connections;
    const networks_list = await Network.find({ id: { $in: network_ids } });

    res.json({ networks_list });
  } catch (err) {
    console.log("Error loading networks: ", err);
  }
});

app.listen(PORT, () => {
  console.log(`Server live on port number ${PORT}`);
});
