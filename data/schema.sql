DROP TABLE IF EXISTS users, media, savedMedia;

CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) UNIQUE
  );

CREATE TABLE IF NOT EXISTS media ( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(255), 
    descr VARCHAR(1000),
    content TEXT,
    media_type VARCHAR(255),
    created_at TimeStamp DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS savedMedia (
    id SERIAL PRIMARY KEY,
    media_id INTEGER NOT NULL REFERENCES media(id),
    users_id INTEGER NOT NULL REFERENCES users(id)
);