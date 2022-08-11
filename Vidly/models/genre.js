const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50,
    },
}));

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result = schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;

