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

const client = new Client(databaseUrl);
client.connect(err => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to pg');
});

router.route('/create-user/:username')
//this should be a post?
  .post((req, res)=> {

    let username = req.params.username;
    let values = [username];
    //fix this sql statement to get username
    let sql = 'INSERT INTO users (username) VALUES ($1) ON CONFLICT DO NOTHING';
    client.query(sql, values)
      .then(result => {
        console.log('result', result);
        res.status(200).send('username found.');
      })
      .catch(err => {
        console.log('err', err);
        res.status(500).send('no username');
      });
  });

module.exports = router;
