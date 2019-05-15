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
router.route('/article/:mediaId')
  .get((req, res) => {
    // grab request parameter
    let id = req.params.mediaId;
    // let id = 1;
    let values = [id];
    let sql = 'SELECT content FROM media WHERE id = $1 ;';

    client.query(sql, values)
      .then(result => {
        let queryRes = result.rows;
        console.log('queryRes: ', queryRes);
        res.send(queryRes);
      })
      .catch(err => console.log('error', err));
  });

module.exports = router;
