const express = require('express');
const {Genre, validate} = require('../models/genre')
const router = express.Router();

router.get('/', async (req, res) => {
    // this part finds all the genres from the database
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) =>{
    try {
        const genre  = await Genre.findById(req.params.id);
        res.send(genre);
    } catch(ex) {
        return res.status(404).send('The genre with the given ID was not found');
    } 
});


router.post('/', async (req, res) => {
    // vaidate request body
    const { error } = validate(req.body); //equivalent to result.error
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
    const { error } = validate(req.body); //equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);

    // look up genre and update
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true
        });
        res.send(genre);
    } catch(ex) {
        return res.status(404).send('The genre with the given ID was not found');
    }
});

router.delete('/:id', async (req, res)  => {
    try {
        const genre  = await Genre.findByIdAndRemove(req.params.id);
        res.send(genre);
    } catch(ex) {
        return res.status(404).send('The genre with the given ID was not found');
    }


});

module.exports = router;