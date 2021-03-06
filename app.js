const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Mongo Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

// Initialize app variable with express
const app = express();

// Setting up routes
const users = require('./routes/users');
const question = require('./routes/question');
const reading = require('./routes/reading');
const answer = require('./routes/answer');

// Port Number
//const port = 3000;
const port = process.env.PORT || 8080;

// CORES Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/question', question);
app.use('/reading', reading);
app.use('/answer', answer);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// All other routes go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


//Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});