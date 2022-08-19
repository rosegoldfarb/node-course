const express = require('express');
// const {Movie, validate, printGenreSchema} = require('../models/movie')
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});


router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send(movie);
        // printGenreSchema();
    } catch (ex) {
        return res.status(404).send('The movie with the given ID was not found');
    }
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre ID');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        movie = await movie.save();
        console.log(movie);
    } catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    res.send(movie);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: req.body.genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, {
            new: true
        });
        res.send(movie);
    } catch(ex) {
        return res.status(404).send('The movie with the given ID was not found');
    }
});

router.delete('/:id', async (req, res)  => {
    try {
        const movie  = await Movie.findByIdAndRemove(req.params.id)
        res.send(movie);
    }
    catch(ex){
        return res.status(404).send('The movie with the given ID was not found');
    }
});


module.exports = router;