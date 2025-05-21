const mongoose = require("mongoose");

//Meal Schema
const mealSchema = new mongoose.Schema({
    mealname: {
        type: String,
        required: [true, "Du måste skicka med måltidens namn"],
        trim: true
    },
    ingredients: {
        type: [String],
        required: [true, "Du måste skicka med måltidens ingredienser"],
    },
    category: {
        type: String,
        required: [true, "Du måste skicka med måltidens kategori"],
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;