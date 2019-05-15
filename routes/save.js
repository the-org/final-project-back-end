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
    let sql = 'INSERT INTO savedMedia (users_id, media_id) VALUES ((SELECT id from users WHERE id=$1), (SELECT id from media WHERE id=$2))';

    client.query(sql, values)
      .then(result => {
        console.log('result', result);
        res.status(200).send('Media saved.');
      })
      .catch(err => {
        console.log('err', err);
        res.status(500).send('Error saving media.');
      });
  });

module.exports = router;
