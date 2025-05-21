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

//Meal model
const Meal = require("../models/Meal");

//GET
router.get("/", (req, res) => {
    res.json({ message: "Välkommen till API:et" });
})

router.get("/meals", async (req, res) => {
    try{
        const allMeals = await Meal.find();
        res.json(allMeals);
    } catch(err) {
        res.status(500).json({ message: "Fel vid hämtning av alla måltider..."})
    }
    res.json({ message: "Välkommen till API:et" });
})

router.post("/meals", async (req, res) => {
    try{
        const {mealname, ingredients, category} = req.body;

        //Validera input
        if(!mealname || !ingredients || !category){
            return res.status(400).json({ error: "Ogiltig input, skicka med namn, ingredienser och kategori!" });
        }
        //Korrekt input - spara måltid
        const meal = new Meal({ mealname, ingredients, category });
        await meal.save();
        res.status(201).json({ message: "Måltid sparad!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//Returnera till anropet
module.exports = router;