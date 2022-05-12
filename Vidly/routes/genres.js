const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50,
    },
}));

router.get('/', async (req, res) => {
    // this part finds all the genres from the database
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) =>{
    const genre  = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});


router.post('/', async (req, res) => {
    // vaidate request body
    const { error } = validateGenre(req.body); //equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name,
    });

    try { 
         // save it to mongodb
        genre = await genre.save();
        console.log(genre);
    }
    catch(ex){
        // can iterate through properties to get info about errors for each field
        for (field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }

    res.send(genre);
});

router.put('/:id', async (req, res) => {

    // // vaidate request body
    const { error } = validateGenre(req.body); //equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);

    // look up genre and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });

    // return if it doesn't exist
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);

});

router.delete('/:id', async (req, res)  => {
    const genre  = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);

});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result = schema.validate(genre);
}

module.exports = router;