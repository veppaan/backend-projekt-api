const mongoose = require("mongoose");

//Meal Schema
const mealSchema = new mongoose.Schema({
    mealname: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;