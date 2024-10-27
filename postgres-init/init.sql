CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profile_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- one-to-one relationship with users: no need for id PRIMARY KEY
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    gender CHAR(1),
    sexual_orientation CHAR(1),
    profile_picture_id INTEGER REFERENCES user_images(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- one-to-many relationship with users: need id PRIMARY KEY
CREATE TABLE IF NOT EXISTS user_images (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
