const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.json({message: "Välkommen till detta API! För att hämta alla måltider, skriv /api/meals"})
})

//Starta appikation
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})