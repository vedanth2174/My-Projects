import express from "express";
import react from "react";
import path from "path";
import url from "url";

const app  = express();
const PORT = 3500;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, function(err){
    console.log("Server started on PORT "+ PORT);
})