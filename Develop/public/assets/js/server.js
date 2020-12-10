// requireing "express" shipped module
const express = require("express");
// requiring "path" shipped module
const path = require("path");
// requiring "console" shipped module
const { table, dir } = require("console");
const { dirname } = require("path");
const { Dir } = require("fs");
// Declaring variable app to store express function output
const app = express();
// declaring variable PORT as desired port number for server
const PORT = 9000;

// Middleware express code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// inherited request response function to send index html file with desired path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
// inherited request response function to send notes html file with desired path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../notes.html"));
});

// Create New Characters - takes in JSON input
app.post("/api/notes", (req, res) => {
  const testPost = req.body;

  console.log(testPost);
  res.end();
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
