const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const Joi = require('joi');
const helmet = require('helmet'); 
const morgan = require('morgan');
const express = require('express');
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');
const logger = require('./middleware/logger');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/courses', courses);
app.use('/', homepage);

// configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail server password: ' + config.get('mail.password'));

console.log(`app: ${app.get('env')}`)
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
}

// PORT is an environment variable
const port  = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));