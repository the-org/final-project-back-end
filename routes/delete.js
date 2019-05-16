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
  databaseUrl = process.env.DATABASE_URL;
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
router.route('/saved/:userId/:articleId')
  .delete((req, res) => {
    // grab request parameter
    let userId = req.params.userId;
    let articleId = req.params.articleId;
    let values = [userId, articleId];
    let sql = 'DELETE FROM savedMedia WHERE users_id = $1 AND media_id = $2 ;';

    client.query(sql, values)
      .then(result => {
        let queryRes = result.rows;
        res.status(200).send('Media Deleted from your saved list!');
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).send('Error deleting data.');
      });
  });

module.exports = router;
