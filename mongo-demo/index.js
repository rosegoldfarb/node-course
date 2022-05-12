const mongoose = require('mongoose');
// can configure it so that this is different if in dev vs prod
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB: ', err));

//defines shape of data
const courseSchema = new mongoose.Schema({
    name: { type: String, 
        required: true,
    maxlength: 255},
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true,
    },
    author: String,
    // tags: [ String ],  --one way of doing this without validator
    tags: {
        type: Array,
        // see async video - didn't work since callback wasn't defined
        validate: {
            validator: ((v) => {
                return v && v.length > 0;
            }),
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        //get will round a value if it has been added before the setter was added
        get = v => Math.round(v),
        set = v => Math.round(v),
    }
});

//need to compile schema to a course so we can use the schema
// Makes a class Course
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // object of class
    const course = new Course({
        name: 'some course',
        author: 'Rose',
        tags: [],
        isPublished: true,
        category: 'WEB',
    });

    try { 
         // save it to mongodb
    const result = await course.save();
    //unique identifer mongo assigns it
    console.log(result);
    }
    catch(ex){
// can iterate through properties to get info about errors for each field
        for (field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
}

const pageNumber = 2;
const pageSize = 10;

async function getCourses() {
    // optional arguemnts in find to filter

    const courses = await Course
    .find({ author: 'Mosh', isPublished: true})
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, });

    console.log(courses);
}
async function updateCourseQueryFirst(id) {
    const course = await Course.findById(id);
    console.log(course);
    if (!course) return;

    course.isPublished = true;
    course.author = 'some author';

    const result = await course.save();
    console.log(result);
}

async function updateCourseUpdateFirst(id){
    // can use findByIdAndUpdate
    const result = await Course.updateOne({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
    console.log(result);
};

async function removeCourse(id){
    // can use findByIdandRemvoe
  const result = await Course.deleteOne({ _id: id});
  console.log(result);
};

// think something like this would be needed for the callback in the async example
function test (message, callback = (message) => {
    console.log(message)
}) {
    callback(message)
}

createCourse();