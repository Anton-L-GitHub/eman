const express = require("express");
const router = express.Router();
const Joi = require("joi");

let genres = [
    { id: 1, genre: "Drama" },
    { id: 2, genre: "Adventure" },
    { id: 3, genre: "Horror" },
    { id: 4, genre: "Action" },
]


function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required(),
    };
    return Joi.validate(genre, schema);
}


router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find((g) => g.id == req.params.id)
    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre,
    };

    genres.push(genre);
    res.send(genre);
})


router.put("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given id was not found!");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;

    res.send(genre);
});

router.delete("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given id was not found!");

    genres.splice(genres.indexOf(genre), 1);

    res.send(genre);
});


module.exports = router;
