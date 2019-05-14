DROP TABLE IF EXISTS users, media, savedMedia;

CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) 
  );

CREATE TABLE IF NOT EXISTS media ( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(255), 
    "desc" VARCHAR(1000),
    created_at TimeStamp DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    media_type VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS savedMedia (
    id SERIAL PRIMARY KEY,
    media_ID INTEGER NOT NULL REFERENCES media(id),
    users_id INTEGER NOT NULL REFERENCES users(id)
);