// Dependencies
const express = require("express");
const mongojs = require("mongojs");

// Initialize Express
const app = express();

// Define Listening PORT
const PORT = process.env.PORT || 3000

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
// const databaseUrl = "testjson1";
const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/testjson1";
const collections = ["jsons"];


// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// All the jsons stored in Mongo will be retrieved
app.get("/", (req, res) => {
  // Query: In our database, go to the animals collection, then "find" everything
  db.jsons.find({}, (error, found) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// json object in the body will be saved in the database
app.post("/", (req, res) => {
  // console.log(req.body);
  db.jsons.insert(req.body, (error, found) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/delete", (req, res) => {
  // Query: In our database, go to the animals collection, then "find" everything
  db.jsons.remove({}, (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(result);
    }
  });
});


// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}! http://localhost:${PORT}`);
});