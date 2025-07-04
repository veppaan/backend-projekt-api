const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

//Token-validator as middleware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    //Token
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "You are not authorized for this route - missing token!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Invalid JWT" });

        req.username = username;
        next();
    })
}

//GET
router.get("/", (req, res) => {
    res.json({ message: "Välkommen till API:et" });
})

router.get("/meals", async (req, res) => {
    try{
        const allMeals = await Meal.find({});
        res.json(allMeals);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla måltider..."})
    }
})

//GET starters
router.get("/starters", async (req, res) => {
    try{
        const allMeals = await Meal.find({ category: "Förrätt" });
        res.json(allMeals);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla förrätter..."})
    }
})

//GET main courses
router.get("/main-courses", async (req, res) => {
    try{
        const allMeals = await Meal.find({ category: "Huvudrätt" });
        res.json(allMeals);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla huvudrätter..."})
    }
})

//GET desserts
router.get("/desserts", async (req, res) => {
    try{
        const allMeals = await Meal.find({ category: "Efterrätt" });
        res.json(allMeals);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla efterrätter..."})
    }
})

//POST
router.post("/meals", authenticateToken, async (req, res) => {
    try{
        const {mealname, ingredients, category} = req.body;

        //Validera input
        if(!mealname || !ingredients || !category){
            return res.status(400).json({ error: "Ogiltig input, skicka med namn, ingredienser och kategori!" });
        }
        if(category !== "Förrätt" && category !== "Huvudrätt" && category !== "Efterrätt"){
            return res.status(400).json({ error: "Endast Förrätt, Huvudrätt och Efterrätt är giltiga kategorier!" });
        }
        //Korrekt input - spara måltid
        const meal = new Meal({ mealname, ingredients, category });
        await meal.save();
        res.status(201).json({ message: "Måltid sparad: " + meal.mealname});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})
//DELETE
router.delete("/meals/:id", authenticateToken, async(req, res) => {
    try{
        //För att kunna få ut namnet till utskriften
        const deleteMeal = await Meal.findById(req.params.id);
        //Kollar om måltiden finns med i databas
        if(!deleteMeal){
            return res.status(404).json({message: "Måltiden finns inte i databasen"});
        }
        //Ta bort måltiden
        await Meal.findByIdAndDelete(req.params.id, req.body, {new: true});
        //Skriv ut meddelande
        res.json({message: "Måltid raderad: " + deleteMeal.mealname });
    } catch(error){
        //Serverfel
        res.status(500).json(error);
    }
})

//UPDATE
router.put("/meals/:id", authenticateToken, async(req, res) => {
    try{
        //Uppdatera
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {new: true});
        //Skriv ut meddelande
        res.json({ message: "Måltid uppdaterad: " + updatedMeal.mealname });
    } catch(error){
        //Serverfel
        return res.status(500).json(error);
    }
})
router.get("/meals/:id", async(req, res) => {
    try{
        //Hitta
        const foundMeal = await Meal.findById(req.params.id);
        const foundedMeal = {
            mealname: foundMeal.mealname,
            ingredients: foundMeal.ingredients,
            category: foundMeal.category
        }
        //Skriv ut meddelande
        res.json({ message: foundedMeal});
    } catch(error){
        //Serverfel
        return res.status(500).json(error);
    }
})

//Returnera till anropet
module.exports = router;