//route for /saved
'use strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();

// db connection
let databaseUrl;

if (process.env.ENVIRONMENT === 'development') {
  databaseUrl = process.env.DB_DEV_URL;
} else if (process.env.ENVIRONMENT === 'production') {
  databaseUrl = process.env.DB_PROD_URL;
}

const client = new Client({
  connectionString: databaseUrl,
});
client.connect(err => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to pg');
});

//route
router.route('/saved/:userId')
  .get((req, res) => {
    // grab request parameter
    let id = req.params.userId;
    let values = [id];
    let sql = 'SELECT * FROM media JOIN savedMedia on users_id = $1 AND media.id = media_id ;';

    client.query(sql, values)
      .then(result => {
        let queryRes = result.rows;
        res.send(queryRes);
      })
      .catch(err => console.log('error', err));
  });

module.exports = router;
