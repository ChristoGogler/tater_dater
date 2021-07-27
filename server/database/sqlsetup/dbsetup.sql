DROP TABLE IF EXISTS chatmessages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS pwdreset;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_url VARCHAR(255),
    bio TEXT,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL, 
    about_me VARCHAR(255),
    city VARCHAR(255),
    likes VARCHAR(255),
    dislikes VARCHAR(255),
    interested_in VARCHAR(255),
    gender VARCHAR(255),
    orientation VARCHAR(255),
    profile_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE potatoes (
     id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    receiver_id INT REFERENCES users(id) NOT NULL,
    potato_count INT
);




CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    photo_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pwdreset (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    secret_code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    friend_status VARCHAR(255) DEFAULT 'pending', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chatmessages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    chatmessage TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
