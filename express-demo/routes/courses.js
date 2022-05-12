const express = require('express');
const router = express.Router();

// think this should only be needed in index.js
const Joi = require('joi');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

router.get('/', (req, res) => {
    res.send(courses);
});
router.get('/:id', (req, res) =>{
    const course  = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
})
router.post('/', (req, res) => {
    // vaidate request body
    const { error } = validateCourse(req.body); //equivalent to result.error

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});
router.put('/:id', (req, res) => {
    // look up course
    const course  = courses.find(c => c.id === parseInt(req.params.id));
    // return course if it doesn't exist
    if (!course) return res.status(404).send('The course with the given ID was not found');
    // vaidate request body
    const { error } = validateCourse(req.body); //equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);
    // update course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res)  => {
    const course  = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
}

module.exports = router;