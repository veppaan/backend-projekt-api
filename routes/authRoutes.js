const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Ansluter till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database...");
})

//GET
router.get("/", (req, res) => {
    res.json({ message: "Testar" });
})

//Returnera till anropet
module.exports = router;