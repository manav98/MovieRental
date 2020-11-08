const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Comedy" },
  { id: 3, genre: "Romance" },
  { id: 4, genre: "Noir" },
];

app.get("/", (request, response) => {
  response.send("Welcome to Vidly");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Listening on port 8000"));
