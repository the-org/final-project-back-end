'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// route callbacks
const allMedia = require('./routes/all-media.js');
const article = require('./routes/article.js');
const save = require('./routes/save.js');
const createUser = require('./routes/create-user.js');
const saved = require('./routes/saved.js');
const deleteEntry = require('./routes/delete.js');

const PORT = process.env.PORT || 3000;

//use upon completion of development
// let corsOptions = {
//   origin: 'https://final-front-end.herokuapp.com',
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));


app.use(cors());

// express middleware to handle routes
app.use(allMedia);
app.use(article);
app.use(save);
app.use(createUser);
app.use(saved);
app.use(deleteEntry);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
