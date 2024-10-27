CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profile_complete BOOLEAN DEFAULT FALSE,
    fame_rating INTEGER DEFAULT 0 CHECK (fame_rating >= 0 AND fame_rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- one-to-one relationship with users: we can use user_id as PRIMARY KEY
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

CREATE TABLE IF NOT EXISTS interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_interests (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    interest_id INTEGER REFERENCES interests(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE IF NOT EXISTS user_visits (
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    visited_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT no_self_visits CHECK (visitor_id != visited_id)
);

CREATE TABLE IF NOT EXISTS user_likes (
    id SERIAL PRIMARY KEY,
    liker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    liked_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    is_mutual BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT unique_like UNIQUE(liker_id, liked_id),
    CONSTRAINT no_self_likes CHECK (liker_id != liked_id)
);




-- populate interests table
INSERT INTO interests (name) VALUES ('travel');
INSERT INTO interests (name) VALUES ('fitness');
INSERT INTO interests (name) VALUES ('music');
INSERT INTO interests (name) VALUES ('photography');
INSERT INTO interests (name) VALUES ('gaming');
INSERT INTO interests (name) VALUES ('yoga');
INSERT INTO interests (name) VALUES ('reading');
INSERT INTO interests (name) VALUES ('movies');
INSERT INTO interests (name) VALUES ('cooking');
INSERT INTO interests (name) VALUES ('hiking');
INSERT INTO interests (name) VALUES ('technology');
INSERT INTO interests (name) VALUES ('fashion');
INSERT INTO interests (name) VALUES ('nature');
INSERT INTO interests (name) VALUES ('meditation');
INSERT INTO interests (name) VALUES ('tattoos');
INSERT INTO interests (name) VALUES ('cats');
INSERT INTO interests (name) VALUES ('dogs');
INSERT INTO interests (name) VALUES ('dance');
