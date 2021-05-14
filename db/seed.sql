CREATE TABLE helo_users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    profile_pic text
);

CREATE TABLE helo_posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content text,
    img text,
    author_id INT REFERENCES helo_users(id),
    date_created TIMESTAMP
);