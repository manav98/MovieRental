const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Action-Comedy" },
  { id: 3, genre: "Romance" },
  { id: 4, genre: "Noir" },
  { id: 5, genre: "Comedy" },
];

app.get("/", (request, response) => {
  response.send("Welcome to Vidly");
});

app.get("/api/genres", (request, response) => {
  response.send(genres);
});

app.get("/api/genres/:id", (request, response) => {
  const requiredGenre = genres.find(
    (genre_object) => genre_object.id === request.params.id
  );
  if (!requiredGenre)
    return response.status(404).send("Desired Genre Not Found");
});

app.post("/api/genres", (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(404).send("Requested Genre Not Found");
  const genre = {
    id: genres.length + 1,
    name: request.body.name,
  };
  genres.push(genre);
  response.send(genre);
});

app.put("/api/courses/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Requested Genre Not Found");
  res.send(genre);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

app.delete("/api/genres/:id", (request, response) => {
  const genre = genres.find((c) => c.id === parseInt(request.params.id));
  if (!genre)
    return response.status(404).send("Requested Genre was not found :(");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  response.send(genre);
});

function validateGenre(genre) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Listening on port 8000"));
