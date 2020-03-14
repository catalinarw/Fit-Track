const express = require("express");
const mongoose = require("mongoose");

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
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Starting our Express app
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
