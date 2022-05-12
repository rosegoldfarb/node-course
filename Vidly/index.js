const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB: ', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
// PORT is an environment variable
const port  = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Vidly!');
});



