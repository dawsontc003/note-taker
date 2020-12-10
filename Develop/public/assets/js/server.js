// requireing "express" shipped module
const express = require("express");
// requiring "path" shipped module
const path = require("path");
// requiring "console" shipped module
const { table } = require("console");
// Declaring variable app to store express function output
const app = express();
// declaring variable PORT as desired port number for server
const PORT = 9000;
// inherited request response function to send index html file with desired path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
// inherited request response function to send notes html file with desired path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../notes.html"));
});

app.post("/api/characters", (req, res) => {
  const newCharacter = req.body;

  console.log(newCharacter);
  res.end();

  //   characters.push(newCharacter);

  //   res.json(newCharacter);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
