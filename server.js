const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const db = require("./models/workout")


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Connecting to either our remote Mongo db or our local db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contactList", { useNewUrlParser: true });

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up request logging
app.use(logger("dev"));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html" ))
})

app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
})

app.post("/api/workouts", function(req, res) {
    db.find().then(data => {
        console.log(data)
        res.json(data)
    })
})

app.get("/api/workouts", function(req, res) {
    db.find().then(results => {
        res.json(results[results.length - 1])
    })
})

app.get("/api/workouts/range", function(res, req) {
    db.find().then(data => {
        res.json(data)
    })
})

app.put("/api/workouts/:id", function(req, res) {
    console.log(req.body)
    db.update(
        { _id: req.params.id },
        { $push: { exercises: req.body } }
    ).then(response => res.json(response))
})
// Starting our Express app
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
