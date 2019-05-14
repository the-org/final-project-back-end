const express = require('express');
const cors = require('cors');
const app = express();
const allMedia = require('./routes/all-media.js');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/all-media', allMedia);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
