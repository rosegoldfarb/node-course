const mongoose = require('mongoose');
// can configure it so that this is different if in dev vs prod
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses1() {
    return await Course
    .find({ tags: 'backend', isPublished: true})
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1});

}

async function getCourses2() {
    return await Course
    .find({ isPublished: true, tags: {$in : ['frontend', 'backend'] }})
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function getCourses3() {
    return await Course
    .find({ isPublished: true})
    .or([
        { name: /.*by.*/i }, 
        { price: { $gte: 15} }
    ]);
}

async function displayCourses() {
    const courses = await getCourses3();
    console.log(courses);
}


displayCourses();

