// requireing "express" shipped module
const express = require("express");
// requiring "path" shipped module
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const { stringify } = require("querystring");
const { response } = require("express");
// Declaring variable app to store express function output
const app = express();
// declaring variable PORT as desired port number for server
const PORT = 9000;

// Middleware express code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let notes = [];
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
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    console.log("json.parse: ", data);
    notes = JSON.parse(data);
    console.log(notes);
    res.send(notes);
  });
  console.log("API to get notes");

  // res.end();
});

// Create New Characters - takes in JSON input
app.post("/api/notes", (req, res) => {
  console.log("req.body: ", req.body);
  let note = req.body;
  note.id = uuidv4();
  notes.push(note);

  fs.writeFile(
    "./db/db.json",
    `${JSON.stringify(notes)}`,
    // error handling and success message to advise commandline user of error or succes
    (err) => (err ? console.error(err) : console.log("Success!"))
  );
  //console.log(notes);
  res.end();
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("req.params.id: ", req.params.id);
  let noteID = req.params.id;

  //noteIndex = notes.findIndex((note) => note.id === noteID);
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === noteID) {
      notes.slice(i, 1);
      console.log("i", i);
      console.log("notes: ", notes);
      break;
    }
  }

  fs.writeFile(
    "./db/db.json",
    `${JSON.stringify(notes)}`,
    // error handling and success message to advise commandline user of error or succes
    (err) => (err ? console.error(err) : res.send(notes))
  );
  //console.log(notes);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
