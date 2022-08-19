const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const app = express();
// import fetch from 'node-fetch';

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB: ', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
// PORT is an environment variable
const port  = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Vidly!');
});

// async function test() {
//     const response = await fetch('http://localhost:3000/api/movies/', {
//       method: 'POST',
//       body: {
//         "title": "romance movie",
//         "genreId": "62f41d783011b6ea13910315",
//         "numberInStock": 5,
//         "dailyRentalRate": 5
//       }, // string or object
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     console.log(myJson);
//   }

//   test();

  



