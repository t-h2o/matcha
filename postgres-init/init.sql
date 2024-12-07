CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profile_complete BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    age INTEGER DEFAULT NULL CHECK (
        18 <= age AND age <= 120
    ),
    bio TEXT,
    gender CHAR(1),
    sexual_orientation CHAR(1),
    fame_rating INTEGER DEFAULT 0 CHECK (
        fame_rating >= 0 AND fame_rating <= 10
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_fake (
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    fake_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_images (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE users
ADD COLUMN profile_picture_id INTEGER,
ADD CONSTRAINT fk_profile_picture
FOREIGN KEY (profile_picture_id) REFERENCES user_images (id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_interests (
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    interest_id INTEGER REFERENCES interests (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_visits (
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    visited_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT no_self_visits CHECK (visitor_id != visited_id)
);

CREATE TABLE IF NOT EXISTS user_likes (
    id SERIAL PRIMARY KEY,
    liker_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    liked_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    is_mutual BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT unique_like UNIQUE (liker_id, liked_id),
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
       NEW.sexual_orientation IS NOT NULL THEN
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
INSERT INTO users (username, firstname, lastname, email, password, bio, gender, sexual_orientation, age, fame_rating) VALUES
('daphnee', 'Daphnee', 'Lesch', 'Marco.Johnson@yahoo.com', '1234', 'writer, person, traveler 😚', 'f', 'o', 66, 4),
('edythe', 'Edythe', 'Conroy', 'Marques3@yahoo.com', '1234', 'shore lover, veteran', 'm', 'e', 38, 0),
('devin', 'Devin', 'Feeney', 'Bartholome.Jerde41@hotmail.com', '1234', 'revenant enthusiast  👩‍🍼', 'm', 'e', 74, 0),
('foster', 'Foster', 'Marquardt', 'Nettie_Reinger62@gmail.com', '1234', 'ascent junkie', 'f', 'e', 70, 2),
('kiera', 'Kiera', 'Abernathy', 'Ollie_Cremin@gmail.com', '1234', 'photographer, engineer, film lover', 'm', 'o', 110, 0),
('nicklaus', 'Nicklaus', 'Walker', 'Amara1@gmail.com', '1234', 'gamer, teacher, photographer', 'm', 'o', 72, 4),
('raegan', 'Raegan', 'Howell', 'Hertha_Rolfson@hotmail.com', '1234', 'geek', 'f', 'o', 76, 4),
('kristian', 'Kristian', 'Wisozk', 'Amaya49@gmail.com', '1234', 'creator', 'f', 'o', 32, 4),
('dillon', 'Dillon', 'Bergstrom', 'Norris21@yahoo.com', '1234', 'teepee devotee, photographer', 'f', 'o', 96, 2),
('marquise', 'Marquise', 'Kautzer', 'Darrick.Morissette95@hotmail.com', '1234', 'film lover', 'f', 'e', 110, 4),
('unique', 'Unique', 'Shields-Harvey', 'Adrien50@gmail.com', '1234', 'actress junkie, teacher 🦣', 'f', 'o', 34, 2),
('elza', 'Elza', 'Wilderman', 'Laurel_Kerluke31@gmail.com', '1234', 'final devotee', 'm', 'o', 40, 2),
('haylie', 'Haylie', 'Heidenreich', 'Edgar.McGlynn85@hotmail.com', '1234', 'marsh devotee', 'f', 'o', 50, 0),
('doris', 'Doris', 'Altenwerth', 'Everardo_Schmeler90@gmail.com', '1234', 'thaw supporter  🤒', 'f', 'e', 82, 0),
('gayle', 'Gayle', 'Block', 'Davin_Bayer-Davis87@gmail.com', '1234', 'activist, educator, entrepreneur', 'm', 'o', 86, 4),
('clay', 'Clay', 'Kutch', 'Estel.Altenwerth@gmail.com', '1234', 'compensation devotee', 'm', 'e', 28, 2),
('micheal', 'Micheal', 'Hagenes', 'Enrique.Swaniawski53@gmail.com', '1234', 'creator, musician, model 👨🏿‍🎨', 'f', 'o', 28, 0),
('peyton', 'Peyton', 'King', 'Letitia.Bayer@hotmail.com', '1234', 'contagion lover, musician ♓', 'f', 'e', 54, 2),
('saige', 'Saige', 'Pouros', 'Jaycee.Kuhlman55@gmail.com', '1234', 'menopause fan, foodie 🇻🇳', 'm', 'e', 76, 4),
('george', 'George', 'Rohan', 'Paris95@yahoo.com', '1234', 'developer, engineer, educator 👩🏾‍🔧', 'm', 'e', 114, 2),
('eveline', 'Eveline', 'Stamm', 'Drake_Schumm@hotmail.com', '1234', 'leader', 'm', 'o', 104, 0),
('asa', 'Asa', 'Zboncak', 'Grover65@hotmail.com', '1234', 'model', 'f', 'e', 54, 2),
('moses', 'Moses', 'Vandervort', 'Zula.Marvin@gmail.com', '1234', 'outfielder junkie  🤬', 'm', 'o', 118, 0),
('jazmin', 'Jazmin', 'O''Conner', 'Alejandrin88@gmail.com', '1234', 'surge devotee, singer', 'f', 'e', 60, 0),
('shemar', 'Shemar', 'Marvin', 'Rosalinda12@yahoo.com', '1234', 'prevalence devotee', 'f', 'o', 36, 0),
('amely', 'Amely', 'Conn', 'Jess58@gmail.com', '1234', 'entrepreneur, creator, designer', 'm', 'e', 78, 4),
('cassandre', 'Cassandre', 'Muller', 'Marcella98@gmail.com', '1234', 'scientist', 'f', 'o', 50, 0),
('sasha', 'Sasha', 'Hermiston', 'Breanna_Bahringer@hotmail.com', '1234', 'person, leader', 'f', 'e', 76, 2),
('felton', 'Felton', 'Steuber', 'Adella28@hotmail.com', '1234', 'pneumonia junkie, patriot 📙', 'm', 'e', 74, 2),
('bernita', 'Bernita', 'Padberg', 'Maggie23@gmail.com', '1234', 'grad, scientist, filmmaker 🐕', 'f', 'e', 96, 4),
('guiseppe', 'Guiseppe', 'Corkery', 'Ernest64@gmail.com', '1234', 'photodiode junkie, grad 🏝️', 'f', 'o', 70, 4),
('golden', 'Golden', 'Gusikowski', 'Cody.Blick72@hotmail.com', '1234', 'student, model', 'm', 'e', 106, 4),
('marquis', 'Marquis', 'Waelchi', 'Paolo_Dickens@yahoo.com', '1234', 'carrier devotee', 'f', 'e', 58, 0),
('nathan', 'Nathan', 'Wolff-Gottlieb', 'Hassie85@hotmail.com', '1234', 'inventor, friend, developer', 'm', 'o', 70, 4),
('mitchel', 'Mitchel', 'Legros', 'Blaze90@yahoo.com', '1234', 'lunchmeat junkie', 'f', 'e', 18, 2),
('litzy', 'Litzy', 'Terry', 'Kathryn.Kirlin@hotmail.com', '1234', 'engineer, developer', 'f', 'o', 102, 2),
('josh', 'Josh', 'Dickinson', 'Brant_Rice56@gmail.com', '1234', 'coach, founder', 'f', 'e', 52, 4),
('timothy', 'Timothy', 'Tremblay', 'Erin.Frami@hotmail.com', '1234', 'pacemaker junkie, singer', 'f', 'e', 78, 4),
('bud', 'Bud', 'Hahn', 'Celine.Jast-Von52@gmail.com', '1234', 'filmmaker, geek, grad 👂', 'm', 'e', 34, 4),
('eleazar', 'Eleazar', 'Little', 'Sabryna88@hotmail.com', '1234', 'writer, founder', 'm', 'e', 112, 4),
('kareem', 'Kareem', 'Rowe', 'Chandler56@hotmail.com', '1234', 'democracy supporter', 'm', 'e', 68, 4),
('jordane', 'Jordane', 'Terry', 'Ophelia.Wunsch33@yahoo.com', '1234', 'patriot, philosopher, educator 😸', 'f', 'o', 56, 4),
('lula', 'Lula', 'Corwin', 'Janis.Lind@yahoo.com', '1234', 'fiesta lover  👩🏽‍🤝‍👨🏾', 'm', 'e', 36, 4),
('abel', 'Abel', 'Will', 'Eusebio_Schinner@hotmail.com', '1234', 'band lover', 'f', 'e', 22, 4),
('dante', 'Dante', 'Kertzmann', 'Tamara.Baumbach55@hotmail.com', '1234', 'nerd', 'f', 'o', 88, 4),
('camille', 'Camille', 'Hills', 'Myrtie47@hotmail.com', '1234', 'user advocate, photographer ⌚', 'f', 'o', 44, 0),
('philip', 'Philip', 'Dicki', 'Claire.Hayes@gmail.com', '1234', 'protest fan, streamer 🍇', 'f', 'e', 46, 0),
('antoinette', 'Antoinette', 'Krajcik', 'Elinore.Stokes@hotmail.com', '1234', 'engineer, filmmaker, traveler 🥈', 'f', 'e', 38, 2),
('ardella', 'Ardella', 'Swift', 'Angeline48@yahoo.com', '1234', 'dialogue fan, blogger 🔞', 'f', 'e', 62, 0),
('sean', 'Sean', 'Friesen', 'Hipolito.Runte@gmail.com', '1234', 'merchandise devotee', 'm', 'o', 98, 4),
('rosetta', 'Rosetta', 'Fritsch', 'Vance51@yahoo.com', '1234', 'designer', 'm', 'o', 24, 2),
('houston', 'Houston', 'Feil', 'Reynold6@hotmail.com', '1234', 'streamer, engineer, blogger 🛴', 'f', 'e', 84, 2),
('elwyn', 'Elwyn', 'Rohan', 'Anita30@gmail.com', '1234', 'oleo junkie  🍪', 'f', 'e', 46, 4),
('rosalyn', 'Rosalyn', 'Mills', 'Salvatore.Erdman-Hegmann@yahoo.com', '1234', 'key advocate  🚕', 'm', 'e', 24, 4),
('murl', 'Murl', 'Harber', 'Emmie.Casper44@gmail.com', '1234', 'bacterium enthusiast', 'm', 'e', 52, 2),
('lacy', 'Lacy', 'Gislason', 'Jean.Walker8@yahoo.com', '1234', 'wasabi advocate', 'f', 'e', 112, 4),
('lenore', 'Lenore', 'DuBuque', 'Camille_Rowe-Conroy64@hotmail.com', '1234', 'author, founder', 'm', 'o', 48, 2),
('jennyfer', 'Jennyfer', 'Bogisich', 'Cassandra.Gusikowski@yahoo.com', '1234', 'goodness lover', 'f', 'o', 38, 4),
('ambrose', 'Ambrose', 'Kuhn', 'Sasha79@hotmail.com', '1234', 'suffocation lover  🔀', 'm', 'e', 100, 0),
('shane', 'Shane', 'Corwin', 'Ethelyn_Zemlak@hotmail.com', '1234', 'bedroom fan, student', 'm', 'e', 94, 0),
('eric', 'Eric', 'Braun', 'Talon_Bahringer18@hotmail.com', '1234', 'cloves advocate, blogger', 'f', 'o', 18, 0),
('bonnie', 'Bonnie', 'Wuckert', 'Jeromy28@gmail.com', '1234', 'developer, veteran, geek', 'f', 'e', 18, 4),
('eve', 'Eve', 'Schowalter', 'Loyal29@yahoo.com', '1234', 'knowledge advocate, educator', 'f', 'e', 112, 0),
('antone', 'Antone', 'Hermann', 'Rosalinda.Wunsch34@gmail.com', '1234', 'photographer, patriot, educator ❇️', 'm', 'o', 24, 2),
('lolita', 'Lolita', 'Gleichner', 'Guiseppe_Collins@gmail.com', '1234', 'outlay lover', 'm', 'o', 114, 2),
('trey', 'Trey', 'Adams', 'Wilford.Feil@yahoo.com', '1234', 'trash fan', 'm', 'o', 52, 4),
('merle', 'Merle', 'Pfeffer', 'Wilfrid.Kiehn3@yahoo.com', '1234', 'leader enthusiast, business owner 🇬🇹', 'm', 'o', 74, 2),
('lawson', 'Lawson', 'Sipes', 'Nona_Murphy82@hotmail.com', '1234', 'codling advocate', 'm', 'o', 82, 0),
('alexzander', 'Alexzander', 'Paucek', 'Alessia.Torp32@hotmail.com', '1234', 'beam fan, activist 🫁', 'f', 'o', 56, 2),
('myrtle', 'Myrtle', 'Little-Ryan', 'Morton.Mills22@gmail.com', '1234', 'artist, entrepreneur, business owner', 'm', 'e', 66, 0),
('luella', 'Luella', 'Brown', 'Hellen_Kessler1@hotmail.com', '1234', 'shore devotee, traveler 🏯', 'f', 'e', 68, 0),
('wilford', 'Wilford', 'Koss', 'Irving18@hotmail.com', '1234', 'hydrolysis enthusiast, business owner 🇨🇺', 'f', 'o', 88, 2),
('jeremy', 'Jeremy', 'Glover', 'Maynard.Kunze@yahoo.com', '1234', 'monocle enthusiast, streamer', 'm', 'o', 86, 2),
('leta', 'Leta', 'Hyatt', 'Ulises_Kunde64@yahoo.com', '1234', 'coach, creator, traveler', 'f', 'e', 98, 0),
('cade', 'Cade', 'Mraz', 'Anderson_Conn88@yahoo.com', '1234', 'entrance devotee, designer 🎍', 'm', 'o', 104, 0),
('ashly', 'Ashly', 'Strosin', 'Ernie.Nolan14@hotmail.com', '1234', 'paranoia lover, foodie 🧋', 'f', 'o', 98, 0),
('cheyanne', 'Cheyanne', 'Kris', 'Marjorie_Lebsack50@gmail.com', '1234', 'tie fan  ◻️', 'f', 'o', 100, 2),
('berenice', 'Berenice', 'Boehm', 'Margarette.Langworth51@yahoo.com', '1234', 'filmmaker, designer, traveler', 'm', 'o', 110, 2),
('maryjane', 'Maryjane', 'Swift', 'Jarrod_OKon18@gmail.com', '1234', 'composer advocate', 'm', 'o', 100, 0),
('antwon', 'Antwon', 'O''Hara', 'Magnolia.Mayert@hotmail.com', '1234', 'streamer, student, inventor', 'f', 'e', 30, 2),
('maci', 'Maci', 'Skiles', 'Colten.Steuber89@hotmail.com', '1234', 'student, scientist, entrepreneur 🦉', 'f', 'o', 92, 2),
('eleanora', 'Eleanora', 'Veum', 'Lyda.Lindgren@yahoo.com', '1234', 'spirit junkie', 'm', 'o', 34, 2),
('ben', 'Ben', 'D''Amore', 'Maryjane3@hotmail.com', '1234', 'adrenaline lover, friend', 'f', 'e', 46, 4),
('ulises', 'Ulises', 'Leuschke', 'Winona.Bartoletti56@yahoo.com', '1234', 'cheek supporter, parent 🏀', 'm', 'e', 26, 0),
('josiane', 'Josiane', 'Fisher', 'Woodrow.Barrows93@gmail.com', '1234', 'student, environmentalist, veteran', 'f', 'e', 18, 4),
('zoe', 'Zoe', 'Kerluke', 'Jayce98@gmail.com', '1234', 'philosopher, musician', 'm', 'e', 34, 0),
('ansley', 'Ansley', 'Bauch', 'Eunice39@gmail.com', '1234', 'office junkie  🐌', 'f', 'o', 54, 0),
('bernice', 'Bernice', 'Weimann', 'Marilie.Breitenberg75@yahoo.com', '1234', 'designer', 'm', 'o', 34, 2),
('aida', 'Aida', 'Marvin', 'Breanne77@hotmail.com', '1234', 'turf junkie, streamer 🐓', 'f', 'e', 82, 2),
('dustin', 'Dustin', 'Thiel', 'Kade.Lubowitz@yahoo.com', '1234', 'petition devotee, environmentalist 🌾', 'm', 'o', 44, 4),
('benedict', 'Benedict', 'Luettgen', 'Osvaldo25@yahoo.com', '1234', 'educator, grad, nerd', 'f', 'e', 60, 4),
('glenna', 'Glenna', 'Lehner', 'Jessyca14@gmail.com', '1234', 'detention fan  🧗‍♂️', 'f', 'e', 52, 0),
('bethany', 'Bethany', 'Hintz', 'Maeve.Davis60@yahoo.com', '1234', 'filmmaker, business owner, musician 🐃', 'f', 'e', 18, 0),
('wade', 'Wade', 'Ankunding', 'Arely_Roob@gmail.com', '1234', 'writer, gamer', 'm', 'e', 70, 2),
('camren', 'Camren', 'Bechtelar', 'Sylvester.McClure@hotmail.com', '1234', 'hub enthusiast, leader 🇲🇸', 'f', 'e', 18, 2),
('porter', 'Porter', 'Glover', 'Madaline_Toy36@yahoo.com', '1234', 'environmentalist, model, environmentalist 🍡', 'm', 'o', 34, 4),
('mabelle', 'Mabelle', 'Johns', 'Conor.Gibson@yahoo.com', '1234', 'film lover, activist, musician 👩🏿‍❤️‍👩🏼', 'm', 'e', 82, 4),
('madge', 'Madge', 'Daniel', 'Berta.Lemke77@gmail.com', '1234', 'intelligence junkie  🚮', 'm', 'e', 88, 4),
('myles', 'Myles', 'Schinner', 'Braden82@gmail.com', '1234', 'checkroom junkie, grad', 'm', 'o', 26, 0),
('christ', 'Christ', 'Wehner', 'Clovis.Goldner@gmail.com', '1234', 'general junkie, parent ❇️', 'm', 'e', 108, 4);
