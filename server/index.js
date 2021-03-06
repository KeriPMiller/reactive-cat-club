'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./routes');

const db = require('./models').db;
const app = express();

module.exports = app

//body parsing and logging
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRoutes);


//serve up index.html for React!
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html')));


//error handling~! hooray~
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
})
db.sync()
.then(() => {
  console.log('kitten database has synced, yay!')
  app.listen(3000, () => {
  console.log('Server is listening for meowing at port 3000...')
 })
})
.catch(() => {
  console.log('where are the cats? something weird happened!')
})

