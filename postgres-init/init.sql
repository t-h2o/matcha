CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profile_complete BOOLEAN DEFAULT FALSE,
    bio TEXT,
    gender CHAR(1),
    sexual_orientation CHAR(1),
    fame_rating INTEGER DEFAULT 0 CHECK (fame_rating >= 0 AND fame_rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_images (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE users
ADD COLUMN profile_picture_id INTEGER,
ADD CONSTRAINT fk_profile_picture
FOREIGN KEY (profile_picture_id) REFERENCES user_images(id) ON DELETE SET NULL;

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

CREATE OR REPLACE FUNCTION check_profile_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username IS NOT NULL AND
       NEW.firstname IS NOT NULL AND
       NEW.lastname IS NOT NULL AND
       NEW.email IS NOT NULL AND
       NEW.password IS NOT NULL AND
       NEW.bio IS NOT NULL AND
       NEW.gender IS NOT NULL AND
       NEW.sexual_orientation IS NOT NULL AND
       NEW.profile_picture_id IS NOT NULL THEN
        NEW.profile_complete = TRUE;
    ELSE
        NEW.profile_complete = FALSE;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profile_complete ON users;

CREATE TRIGGER update_profile_complete
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION check_profile_completion();

INSERT INTO interests (name) VALUES
    ('travel'),
    ('fitness'),
    ('music'),
    ('photography'),
    ('gaming'),
    ('yoga'),
    ('reading'),
    ('movies'),
    ('cooking'),
    ('hiking'),
    ('technology'),
    ('fashion'),
    ('nature'),
    ('meditation'),
    ('tattoos'),
    ('cats'),
    ('dogs'),
    ('dance')
ON CONFLICT (name) DO NOTHING;