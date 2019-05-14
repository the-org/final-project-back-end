//route for /all-media
'use strict';
// const superagent = require('superagent');
const express = require('express');
const Parser = require('rss-parser');

const { Client } = require('pg');
// const client = new pg.Client('https://data.heroku.com/datastores/2d50bc32-c651-4c74-bb96-aa0e5287150a');

const router = express.Router();

let parser = new Parser();
const rssUrl = 'https://hacks.mozilla.org/feed/';

// connect to psql
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

// express route
router.route('/')
  .get((req, res) => {
    // go get posts, create Media object, add to pending db insert array
    parser.parseURL(rssUrl)
      .then(data => {
        let dataArr = data.items.map(el => {
          return new Media(el.title, el.link, el.contentSnippet, el['content:encoded'], 'post');
        });
        console.log(dataArr);
        insertDB(dataArr);
        res.send(dataArr);
      })
      .catch(err => console.log('error', err));

    // go get podcasts, create Media object, add to pending db insert array

    // go get videos, create Media object, add to pending db insert array

    // Insert all into db
  });

function insertDB(arr) {
  arr.forEach(el => {
    const SQL = `INSERT INTO media (title, url, descr, content, media_type) VALUES ($1, $2, $3, $4, $5)`;
    const values = [el.title, el.url, el.descr, el.content, el.media_type];

    return client.query(SQL, values)
      .then(result => {
        console.log(result);
        return;
      });
  });
}

function Media(title, url, descr, content, media_type) {
  this.title = title,
  this.url = url,
  this.descr = descr,
  this.content = content,
  this.media_type = media_type;
}

module.exports = router;
