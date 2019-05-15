'use strict';

const express = require('express');
const router = express.Router();
const { Client } = require('pg');

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

router.route('/save/:userId/:mediaId')
  .post((req, res) => {

    let user = req.params.userId;
    let media = req.params.mediaId;

    let values = [user, media];
    let sql = 'INSERT INTO savedMedia (media_id, users_id)';

    client.query(sql, values)
      .then(result => {
        let data = result.rows;
        console.log('data', data);
      })
      .catch(err => console.log('err', err));
  });

module.exports = router;
