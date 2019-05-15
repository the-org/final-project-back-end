//route for /article

'user strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();

//connection to psql
const dbUrl = 'postgres://localhost:5432/devhubdb';
const client = new Client({
  connectionString: dbUrl,
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
    //grab request parameter
    let id = req.params.mediaId;
    // let id = 1;
    let values = [id];
    let sql = 'SELECT content FROM media WHERE id = $1 ;';
    console.log(id);
    client.query(sql, values)
      .then(result => {
        let queryRes = result.rows;
        console.log('queryRes: ', queryRes);
        res.send(queryRes);
      })
      .catch(err => console.log('error', err));

  });

module.exports = router;
