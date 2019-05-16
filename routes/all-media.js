'use strict';

const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();
const { Client } = require('pg');

let parser = new Parser();
const rssUrl = 'https://hacks.mozilla.org/feed/';


/*START TEST THE ADDITON OF CORS TO ROUTE*/
const cors = require('cors');
const app = express();
let corsOptions = {
  origin: 'https://final-front-end.herokuapp.com',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
/*END TEST THE ADD*/



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

// express route
router.route('/all-media')
  .get((req, res) => {
    // go get posts, create Media object, add to pending db insert array
    parser.parseURL(rssUrl)
      .then(data => {
        let dataArr = data.items.map(el => {
          return new Media(el.title, el.link, el.contentSnippet, el['content:encoded'], 'post');
        });

        Promise.all(insertDB(dataArr))
          .then(resultFromDB => {
            res.send(resultFromDB);
          });
      })
      .catch(err => console.log('error', err));

    // go get podcasts, create Media object, add to pending db insert array

    // go get videos, create Media object, add to pending db insert array

    // Insert all into db
  });

function insertDB(arr) {
  return arr.map(el => {
    const SQL = `INSERT INTO media (title, url, descr, content, media_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [el.title, el.url, el.descr, el.content, el.media_type];

    return client.query(SQL, values)
      .then(result => {
        return result.rows[0];
      })
      .catch(err => console.log(err));
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
