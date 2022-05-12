const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
}));


function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3)
    });
    return result = schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;