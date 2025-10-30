import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {ethers} from "ethers";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const jwt_secret = process.env.jwt;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL; 
const SuggestionABI = JSON.parse(fs.readFileSync('./contract/SuggestionStorage.json', 'utf8'));

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
  adminWalletAddress: String,
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

//Update Suggestion Count
async function updateSuggestionCounts(changedNetworkIds = null) {
  try {
    // Fetch all suggestions
    const allSuggestions = await Suggestion.find();

    // Map: networkId (as Number) -> count
    const countMap = {};

    allSuggestions.forEach((sugg) => {
      const netId = Number(sugg.network_id); // ensure type consistency
      countMap[netId] = (countMap[netId] || 0) + 1;
    });

    // Determine which network IDs to update
    let idsToUpdate;
    if (changedNetworkIds && changedNetworkIds.length > 0) {
      idsToUpdate = changedNetworkIds.map(Number);
    } else {
      idsToUpdate = await Network.find().then((nets) => nets.map((n) => n.id));
    }

    // Update each network's suggestionCount
    for (const id of idsToUpdate) {
      const newCount = countMap[id] || 0;
      const result = await Network.updateOne(
        { id },
        { $set: { suggestionCount: newCount } }
      );

      if (result.matchedCount === 0) {
        console.warn(`⚠️ No network found with id ${id}, skipped`);
      } else {
        console.log(`Updated network ${id} with suggestionCount = ${newCount}`);
      }
    }

    console.log("✅ Suggestion counts updated:", idsToUpdate);
  } catch (err) {
    console.error("❌ Error updating suggestion counts:", err);
  }
}

// Watch the suggestions collection
Suggestion.watch().on("change", async (change) => {
  try {
    console.log("🔄 Suggestion change detected:", change.operationType);

    // Only handle relevant operations
    if (["insert", "update", "replace", "delete"].includes(change.operationType)) {
      let affectedNetworkIds = null;

      // Insert or replace: get network_id from the new document
      if (change.operationType === "insert" || change.operationType === "replace") {
        affectedNetworkIds = [Number(change.fullDocument?.network_id)];
      }

      // Update: get network_id if changed
      if (change.operationType === "update" && change.updateDescription?.updatedFields?.network_id) {
        affectedNetworkIds = [Number(change.updateDescription.updatedFields.network_id)];
      }

      // Delete: fallback to recalc all networks
      if (change.operationType === "delete") {
        affectedNetworkIds = null; // recalc all suggestion counts
      }

      // Update suggestion counts
      await updateSuggestionCounts(affectedNetworkIds);
    }
  } catch (err) {
    console.error("❌ Error processing suggestion change:", err);
  }
});


//Update Member Count
async function updateMemberCounts(changedNetworkIds = null) {
  try {
    // Fetch all connections
    const allConnections = await Connection.find();

    // Map: networkId (as Number) -> count
    const countMap = {};

    allConnections.forEach((conn) => {
      conn.connections.forEach((netId) => {
        const idNum = Number(netId); // ensure type consistency
        countMap[idNum] = (countMap[idNum] || 0) + 1;
      });
    });

    // Determine which network IDs to update
    let idsToUpdate;
    if (changedNetworkIds && changedNetworkIds.length > 0) {
      idsToUpdate = changedNetworkIds.map(Number); // ensure number type
    } else {
      idsToUpdate = await Network.find().then(nets => nets.map(n => n.id));
    }

    // Update each network's memberCount
    for (const id of idsToUpdate) {
      const newCount = countMap[id] || 0;
      const result = await Network.updateOne({ id }, { $set: { memberCount: newCount } });

      if (result.matchedCount === 0) {
        console.warn(`⚠️ No network found with id ${id}, skipped`);
      } else {
        console.log(`Updated network ${id} with memberCount = ${newCount}`);
      }
    }

    console.log("✅ Member counts updated:", idsToUpdate);
  } catch (err) {
    console.error("❌ Error updating member counts:", err);
  }
}


// --- Watch for real-time changes in connection collection ---
// Make sure your watch includes fullDocumentBeforeChange option
// Watch the connections collection
Connection.watch().on("change", async (change) => {
  try {
    console.log("🔄 Change detected:", change.operationType);

    // Only handle relevant operation types
    if (["insert", "update", "replace", "delete"].includes(change.operationType)) {
      let affectedNetworkIds = null;

      // Insert or replace: get connections from the new document
      if (change.operationType === "insert" || change.operationType === "replace") {
        affectedNetworkIds = change.fullDocument?.connections || null;
      }

      // Update: get connections that were updated
      if (change.operationType === "update" && change.updateDescription?.updatedFields?.connections) {
        affectedNetworkIds = change.updateDescription.updatedFields.connections;
      }

      // Delete: fallback to recalc all member counts
      if (change.operationType === "delete") {
        affectedNetworkIds = null; // null will indicate full recalc
      }

      // Update member counts
      await updateMemberCounts(affectedNetworkIds);
      console.log("✅ Member counts updated", affectedNetworkIds || "All networks");
    }
  } catch (err) {
    console.error("Error processing change stream:", err);
  }
});



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
    res.json(err)
  }
});

//create network
app.post("/create-network", async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      admin,
      memberCount,
      suggestionCount,
      adminWalletAddress,
    } = req.body;
    const existingNetwork = await Network.findOne({ name });
    if (existingNetwork) {
      res.json({ message: "Network name already taken" });
    } else {
      const newNetwork = new Network({
        id,
        name,
        description,
        admin,
        memberCount,
        suggestionCount,
        adminWalletAddress,
      });

      //save new network
      await newNetwork.save();
      res.json({message:"Network created successfully"})
    }
  } catch (err) {
    console.error("Error creating new network: ", err);
  }
});

//Join Network
app.post("/join-network", async (req, res) => {
  try{
    const {email, network_id} = req.body;
    const userExist = await Connection.findOne({email});
    if(!userExist){
      const newConnection = new Connection({
        email,
        connections: [network_id] 
      });

      await newConnection.save();
    }
    const updateConnection = await Connection.findOneAndUpdate(
      {email},
      {$addToSet: {connections: network_id} },
    )
    res.json({message: `Joined network successfully.`})
  }catch(err){
    console.error("Error joining network: ", err)
    res.json({message: "Error joining network."})
  }
})

//add suggestion
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
    res.json({message: "Suggestion added successfully!"})
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

//final suggestion storage on blockchain
app.post("/implement-suggestion", async (req, res) => {
  try {
    const suggestion = req.body;

    // Basic validation
    if (!suggestion || Object.keys(suggestion).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No suggestion data provided",
      });
    }

    // Respond with the contract details
    res.status(200).json({
      success: true,
      message: "Contract info ready for frontend to use",
      contract: {
        address: CONTRACT_ADDRESS,
        abi: SuggestionABI.abi, // frontend will use this to interact with contract
      },
      suggestion,
    });
  } catch (error) {
    console.error("Error in /implement-suggestion:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server live on port number ${PORT}`);
});
