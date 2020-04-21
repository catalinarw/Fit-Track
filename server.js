
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
// const path = require("path")
const db = require("./models/workout")
const PORT = process.env.PORT || 8080;
const app = express();


// Sets up the Express App
// =============================================================
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./public"));

// Connecting to either our remote Mongo db or our local db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
	useNewUrlParser: true,
	useFindAndModify: false
});


// Sets up request logging
app.use(logger("dev"));



// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Starting our Express app
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on https://localhost:${PORT}`);
});
