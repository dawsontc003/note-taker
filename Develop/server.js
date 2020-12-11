// requireing "express" shipped module
const express = require("express");
// requiring "path" shipped module
const path = require("path");

const fs = require("fs");
// Declaring variable app to store express function output
const app = express();
// declaring variable PORT as desired port number for server
const PORT = 9000;

// Middleware express code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// inherited request response function to send index html file with desired path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// inherited request response function to send notes html file with desired path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// route for get notes
app.get("/api/notes", (req, res) => {
  console.log("get api working");
  res.end();
});

// Create New Characters - takes in JSON input
app.post("/api/notes", (req, res) => {
  const testPost = req.body;

  console.log("testPost");
  res.end();
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
