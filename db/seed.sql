CREATE TABLE helo_users (
    id serial PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE helo_posts (
    id serial PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INT REFERENCES helo_users(id),
    date_created TIMESTAMP
);
