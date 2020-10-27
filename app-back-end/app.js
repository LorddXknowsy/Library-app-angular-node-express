// Requiring and using express framework and body-parser
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Using middleware for the whole app
// for cross-origin-resource-sharing,
// in the case of, browser to get a response.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Post method for posting data and returning status code
// from the server
// Using body-parser.
app.post("/api/books", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

// Using strongly typed dummy data for returning by our front-end
// Pointing on status code and sending data to server as an object
// containing message and body
app.use("/api/books", (req, res, next) => {
  const books = [
    {
      title: "War and Peace",
      genre: "Historical Fiction",
      author: "Lev Nikolayevich Tolstoy",
      read: false,
    },
    {
      title: "Les Misérables",
      genre: "Historical Fiction",
      author: "Victor Hugo",
      read: false,
    },
  ];
  res.status(200).json({
    message: "Books fetched succesfully!",
    books: books,
  });
});
// Exporting the app to be accessible globaly
module.exports = app;
