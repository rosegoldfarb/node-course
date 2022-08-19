const express = require('express');
const {Customer, validate} = require('../models/customer')
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    try {
        const customer  = await Customer.findById(req.params.id);
        res.send(customer);
    } catch(ex) {
        return res.status(404).send('The customer with the given ID was not found');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    try { 
        customer = await customer.save();
        console.log(customer);
    }
    catch(ex){
        // can iterate through properties to get info about errors for each field
        for (field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
    res.send(customer);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {
            new: true
        });
        console.log(req.body.phone);
        res.send(customer);
    } catch(ex) {
        return res.status(404).send('The customer with the given ID was not found');
    }
});

router.delete('/:id', async (req, res)  => {
    try {
        const customer  = await Customer.findByIdAndRemove(req.params.id)
        res.send(customer);
    }
    catch(ex){
        return res.status(404).send('The customer with the given ID was not found');
    }
});

module.exports = router;