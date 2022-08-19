const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: genreSchema
    },
    numberInStock:{
        type: Number
    },
    dailyRentalRate: {
        type: Number
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
        genreId: Joi.string()
    });

    return result = schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
