const { Client } = require('pg');
require('dotenv').config();

let databaseUrl;

if (process.env.ENVIRONMENT === 'development') {
  databaseUrl = process.env.DB_DEV_URL;
} else if (process.env.ENVIRONMENT === 'production') {
  databaseUrl = process.env.DB_PROD_URL;
}

module.exports = {
  newClient: () => {
    return new Client({
      connectionString: databaseUrl,
    });
  },
  connect: (client) => {
    return client.connect(err => {
      if (err) {
        console.log('err', err);
      }
      console.log('Connected to pg');
    });
  }
};
