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
    street_name VARCHAR DEFAULT NULL,
    street_number VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    country VARCHAR DEFAULT NULL,
    latitude DOUBLE PRECISION DEFAULT NULL,
    longitude DOUBLE PRECISION DEFAULT NULL,
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

INSERT INTO users (username, firstname, lastname, email, password, bio, gender, sexual_orientation, age, fame_rating, latitude, longitude) VALUES
('daphnee', 'Daphnee', 'Lesch', 'Marco.Johnson@yahoo.com', '1234', 'writer, person, traveler 😚', 'f', 'o', 66, 4, 46.22420445200373, 6.746658572039193),
('edythe', 'Edythe', 'Conroy', 'Marques3@yahoo.com', '1234', 'shore lover, veteran', 'm', 'e', 38, 0, 47.48971551806431, 9.872249508507503),
('devin', 'Devin', 'Feeney', 'Bartholome.Jerde41@hotmail.com', '1234', 'revenant enthusiast  👩‍🍼', 'm', 'e', 74, 0, 47.13223041964272, 8.989323856164352),
('foster', 'Foster', 'Marquardt', 'Nettie_Reinger62@gmail.com', '1234', 'ascent junkie', 'f', 'e', 70, 2, 46.47360290005482, 7.362629107345782),
('kiera', 'Kiera', 'Abernathy', 'Ollie_Cremin@gmail.com', '1234', 'photographer, engineer, film lover', 'm', 'o', 110, 0, 47.04190117756134, 8.766226431005945),
('nicklaus', 'Nicklaus', 'Walker', 'Amara1@gmail.com', '1234', 'gamer, teacher, photographer', 'm', 'o', 72, 4, 47.625414418782064, 10.207402053235887),
('raegan', 'Raegan', 'Howell', 'Hertha_Rolfson@hotmail.com', '1234', 'geek', 'f', 'o', 76, 4, 46.48635045103412, 7.394113328125523),
('kristian', 'Kristian', 'Wisozk', 'Amaya49@gmail.com', '1234', 'creator', 'f', 'o', 32, 4, 47.478345737454475, 9.844168139504268),
('dillon', 'Dillon', 'Bergstrom', 'Norris21@yahoo.com', '1234', 'teepee devotee, photographer', 'f', 'o', 96, 2, 46.16675747366582, 6.604774585690962),
('marquise', 'Marquise', 'Kautzer', 'Darrick.Morissette95@hotmail.com', '1234', 'film lover', 'f', 'e', 110, 4, 46.232860609694896, 6.768037767172083),
('unique', 'Unique', 'Shields-Harvey', 'Adrien50@gmail.com', '1234', 'actress junkie, teacher 🦣', 'f', 'o', 34, 2, 47.202655808851034, 9.163262246835231),
('elza', 'Elza', 'Wilderman', 'Laurel_Kerluke31@gmail.com', '1234', 'final devotee', 'm', 'o', 40, 2, 47.21163289296017, 9.18543407407557),
('haylie', 'Haylie', 'Heidenreich', 'Edgar.McGlynn85@hotmail.com', '1234', 'marsh devotee', 'f', 'o', 50, 0, 47.170502937015414, 9.083850278432873),
('doris', 'Doris', 'Altenwerth', 'Everardo_Schmeler90@gmail.com', '1234', 'thaw supporter  🤒', 'f', 'e', 82, 0, 46.73551193052583, 8.009498592547276),
('gayle', 'Gayle', 'Block', 'Davin_Bayer-Davis87@gmail.com', '1234', 'activist, educator, entrepreneur', 'm', 'o', 86, 4, 46.96394596118066, 8.57369068453605),
('clay', 'Clay', 'Kutch', 'Estel.Altenwerth@gmail.com', '1234', 'compensation devotee', 'm', 'e', 28, 2, 46.79472453011022, 8.155743354485079),
('micheal', 'Micheal', 'Hagenes', 'Enrique.Swaniawski53@gmail.com', '1234', 'creator, musician, model 👨🏿‍🎨', 'f', 'o', 28, 0, 46.90681034457817, 8.432575707202673),
('peyton', 'Peyton', 'King', 'Letitia.Bayer@hotmail.com', '1234', 'contagion lover, musician ♓', 'f', 'e', 54, 2, 46.48259894175304, 7.38484775651459),
('saige', 'Saige', 'Pouros', 'Jaycee.Kuhlman55@gmail.com', '1234', 'menopause fan, foodie 🇻🇳', 'm', 'e', 76, 4, 47.491140844680785, 9.875769815894339),
('george', 'George', 'Rohan', 'Paris95@yahoo.com', '1234', 'developer, engineer, educator 👩🏾‍🔧', 'm', 'e', 114, 2, 46.31974903277641, 6.982636971359998),
('eveline', 'Eveline', 'Stamm', 'Drake_Schumm@hotmail.com', '1234', 'leader', 'm', 'o', 104, 0, 47.08400889267229, 8.870225120733595),
('asa', 'Asa', 'Zboncak', 'Grover65@hotmail.com', '1234', 'model', 'f', 'e', 54, 2, 46.108241185504944, 6.460249591152004),
('moses', 'Moses', 'Vandervort', 'Zula.Marvin@gmail.com', '1234', 'outfielder junkie  🤬', 'm', 'o', 118, 0, 47.33050017317985, 9.479015460806396),
('jazmin', 'Jazmin', 'O''Conner', 'Alejandrin88@gmail.com', '1234', 'surge devotee, singer', 'f', 'e', 60, 0, 46.80100332929702, 8.171250890022685),
('shemar', 'Shemar', 'Marvin', 'Rosalinda12@yahoo.com', '1234', 'prevalence devotee', 'f', 'o', 36, 0, 46.27094857627743, 6.8621083812754184),
('amely', 'Amely', 'Conn', 'Jess58@gmail.com', '1234', 'entrepreneur, creator, designer', 'm', 'e', 78, 4, 47.50234620843855, 9.90344510403712),
('cassandre', 'Cassandre', 'Muller', 'Marcella98@gmail.com', '1234', 'scientist', 'f', 'o', 50, 0, 46.694666896596225, 7.908618504435888),
('sasha', 'Sasha', 'Hermiston', 'Breanna_Bahringer@hotmail.com', '1234', 'person, leader', 'f', 'e', 76, 2, 46.10887535425177, 6.461815877011084),
('felton', 'Felton', 'Steuber', 'Adella28@hotmail.com', '1234', 'pneumonia junkie, patriot 📙', 'm', 'e', 74, 2, 46.32635955605039, 6.998963807358988),
('bernita', 'Bernita', 'Padberg', 'Maggie23@gmail.com', '1234', 'grad, scientist, filmmaker 🐕', 'f', 'e', 96, 4, 46.87028001686141, 8.342352188594365),
('guiseppe', 'Guiseppe', 'Corkery', 'Ernest64@gmail.com', '1234', 'photodiode junkie, grad 🏝️', 'f', 'o', 70, 4, 47.352675534012604, 9.533784722562064),
('golden', 'Golden', 'Gusikowski', 'Cody.Blick72@hotmail.com', '1234', 'student, model', 'm', 'e', 106, 4, 46.697938794560656, 7.916699520001017),
('marquis', 'Marquis', 'Waelchi', 'Paolo_Dickens@yahoo.com', '1234', 'carrier devotee', 'f', 'e', 58, 0, 46.1471144498238, 6.556259753278977),
('nathan', 'Nathan', 'Wolff-Gottlieb', 'Hassie85@hotmail.com', '1234', 'inventor, friend, developer', 'm', 'o', 70, 4, 47.237784212850414, 9.250023259123225),
('mitchel', 'Mitchel', 'Legros', 'Blaze90@yahoo.com', '1234', 'lunchmeat junkie', 'f', 'e', 18, 2, 46.77643740183717, 8.110577346919303),
('litzy', 'Litzy', 'Terry', 'Kathryn.Kirlin@hotmail.com', '1234', 'engineer, developer', 'f', 'o', 102, 2, 47.42757400245276, 9.71877083638615),
('josh', 'Josh', 'Dickinson', 'Brant_Rice56@gmail.com', '1234', 'coach, founder', 'f', 'e', 52, 4, 47.42566086472984, 9.714045720907244),
('timothy', 'Timothy', 'Tremblay', 'Erin.Frami@hotmail.com', '1234', 'pacemaker junkie, singer', 'f', 'e', 78, 4, 46.99650678019716, 8.654110211106252),
('bud', 'Bud', 'Hahn', 'Celine.Jast-Von52@gmail.com', '1234', 'filmmaker, geek, grad 👂', 'm', 'e', 34, 4, 46.419798709446304, 7.2297421693962844),
('eleazar', 'Eleazar', 'Little', 'Sabryna88@hotmail.com', '1234', 'writer, founder', 'm', 'e', 112, 4, 47.40055470876696, 9.652037907912439),
('kareem', 'Kareem', 'Rowe', 'Chandler56@hotmail.com', '1234', 'democracy supporter', 'm', 'e', 68, 4, 47.02632170215189, 8.727747852318906),
('jordane', 'Jordane', 'Terry', 'Ophelia.Wunsch33@yahoo.com', '1234', 'patriot, philosopher, educator 😸', 'f', 'o', 56, 4, 46.16564562077279, 6.602028503559925),
('lula', 'Lula', 'Corwin', 'Janis.Lind@yahoo.com', '1234', 'fiesta lover  👩🏽‍🤝‍👨🏾', 'm', 'e', 36, 4, 46.9488523510764, 8.536412108152406),
('abel', 'Abel', 'Will', 'Eusebio_Schinner@hotmail.com', '1234', 'band lover', 'f', 'e', 22, 4, 46.36312815089362, 7.089775804085672),
('dante', 'Dante', 'Kertzmann', 'Tamara.Baumbach55@hotmail.com', '1234', 'nerd', 'f', 'o', 88, 4, 47.26190466696242, 9.309596560991437),
('camille', 'Camille', 'Hills', 'Myrtie47@hotmail.com', '1234', 'user advocate, photographer ⌚', 'f', 'o', 44, 0, 46.88350026228477, 8.375003881954726),
('philip', 'Philip', 'Dicki', 'Claire.Hayes@gmail.com', '1234', 'protest fan, streamer 🍇', 'f', 'e', 46, 0, 46.528269007584264, 7.49764482930063),
('antoinette', 'Antoinette', 'Krajcik', 'Elinore.Stokes@hotmail.com', '1234', 'engineer, filmmaker, traveler 🥈', 'f', 'e', 38, 2, 46.665667453163685, 7.836994952507958),
('ardella', 'Ardella', 'Swift', 'Angeline48@yahoo.com', '1234', 'dialogue fan, blogger 🔞', 'f', 'e', 62, 0, 46.45036168355031, 7.30522736854857),
('sean', 'Sean', 'Friesen', 'Hipolito.Runte@gmail.com', '1234', 'merchandise devotee', 'm', 'o', 98, 4, 46.12288740068017, 6.496423180331077),
('rosetta', 'Rosetta', 'Fritsch', 'Vance51@yahoo.com', '1234', 'designer', 'm', 'o', 24, 2, 46.58197829920777, 7.630297383359401),
('houston', 'Houston', 'Feil', 'Reynold6@hotmail.com', '1234', 'streamer, engineer, blogger 🛴', 'f', 'e', 84, 2, 46.99144893328779, 8.6416182140926),
('elwyn', 'Elwyn', 'Rohan', 'Anita30@gmail.com', '1234', 'oleo junkie  🍪', 'f', 'e', 46, 4, 47.31833072414875, 9.448959050701804),
('rosalyn', 'Rosalyn', 'Mills', 'Salvatore.Erdman-Hegmann@yahoo.com', '1234', 'key advocate  🚕', 'm', 'e', 24, 4, 46.89252509155728, 8.397293631395755),
('murl', 'Murl', 'Harber', 'Emmie.Casper44@gmail.com', '1234', 'bacterium enthusiast', 'm', 'e', 52, 2, 47.40753333575537, 9.6692738956876),
('lacy', 'Lacy', 'Gislason', 'Jean.Walker8@yahoo.com', '1234', 'wasabi advocate', 'f', 'e', 112, 4, 47.020782024997025, 8.714065818893392),
('lenore', 'Lenore', 'DuBuque', 'Camille_Rowe-Conroy64@hotmail.com', '1234', 'author, founder', 'm', 'o', 48, 2, 46.18992029062602, 6.661982691329461),
('jennyfer', 'Jennyfer', 'Bogisich', 'Cassandra.Gusikowski@yahoo.com', '1234', 'goodness lover', 'f', 'o', 38, 4, 46.682109990170716, 7.877605142351403),
('ambrose', 'Ambrose', 'Kuhn', 'Sasha79@hotmail.com', '1234', 'suffocation lover  🔀', 'm', 'e', 100, 0, 47.346257775105364, 9.517933980825502),
('shane', 'Shane', 'Corwin', 'Ethelyn_Zemlak@hotmail.com', '1234', 'bedroom fan, student', 'm', 'e', 94, 0, 46.73744879606909, 8.01428231159131),
('eric', 'Eric', 'Braun', 'Talon_Bahringer18@hotmail.com', '1234', 'cloves advocate, blogger', 'f', 'o', 18, 0, 47.45515271325266, 9.786885427263627),
('bonnie', 'Bonnie', 'Wuckert', 'Jeromy28@gmail.com', '1234', 'developer, veteran, geek', 'f', 'e', 18, 4, 46.526495478306394, 7.493264522257003),
('eve', 'Eve', 'Schowalter', 'Loyal29@yahoo.com', '1234', 'knowledge advocate, educator', 'f', 'e', 112, 0, 46.64327076992141, 7.781679063120329),
('antone', 'Antone', 'Hermann', 'Rosalinda.Wunsch34@gmail.com', '1234', 'photographer, patriot, educator ❇️', 'm', 'o', 24, 2, 46.57281119542204, 7.60765624076115),
('lolita', 'Lolita', 'Gleichner', 'Guiseppe_Collins@gmail.com', '1234', 'outlay lover', 'm', 'o', 114, 2, 46.25599979273402, 6.825187501160189),
('trey', 'Trey', 'Adams', 'Wilford.Feil@yahoo.com', '1234', 'trash fan', 'm', 'o', 52, 4, 46.24448032180544, 6.796736423257444),
('merle', 'Merle', 'Pfeffer', 'Wilfrid.Kiehn3@yahoo.com', '1234', 'leader enthusiast, business owner 🇬🇹', 'm', 'o', 74, 2, 46.35081479119203, 7.059363959801627),
('lawson', 'Lawson', 'Sipes', 'Nona_Murphy82@hotmail.com', '1234', 'codling advocate', 'm', 'o', 82, 0, 47.03610442436476, 8.751909464731915),
('alexzander', 'Alexzander', 'Paucek', 'Alessia.Torp32@hotmail.com', '1234', 'beam fan, activist 🫁', 'f', 'o', 56, 2, 47.24838775913598, 9.276212163395517),
('myrtle', 'Myrtle', 'Little-Ryan', 'Morton.Mills22@gmail.com', '1234', 'artist, entrepreneur, business owner', 'm', 'e', 66, 0, 46.57468784210551, 7.6122912297566),
('luella', 'Luella', 'Brown', 'Hellen_Kessler1@hotmail.com', '1234', 'shore devotee, traveler 🏯', 'f', 'e', 68, 0, 46.5182586135836, 7.4729209074021465),
('wilford', 'Wilford', 'Koss', 'Irving18@hotmail.com', '1234', 'hydrolysis enthusiast, business owner 🇨🇺', 'f', 'o', 88, 2, 47.01307015250512, 8.695018843003307),
('jeremy', 'Jeremy', 'Glover', 'Maynard.Kunze@yahoo.com', '1234', 'monocle enthusiast, streamer', 'm', 'o', 86, 2, 46.36654565195085, 7.09821643381726),
('leta', 'Leta', 'Hyatt', 'Ulises_Kunde64@yahoo.com', '1234', 'coach, creator, traveler', 'f', 'e', 98, 0, 47.012979145867845, 8.694794072530527),
('cade', 'Cade', 'Mraz', 'Anderson_Conn88@yahoo.com', '1234', 'entrance devotee, designer 🎍', 'm', 'o', 104, 0, 46.71354913264344, 7.95525432409186),
('ashly', 'Ashly', 'Strosin', 'Ernie.Nolan14@hotmail.com', '1234', 'paranoia lover, foodie 🧋', 'f', 'o', 98, 0, 46.799005554436356, 8.166316735620523),
('cheyanne', 'Cheyanne', 'Kris', 'Marjorie_Lebsack50@gmail.com', '1234', 'tie fan  ◻️', 'f', 'o', 100, 2, 46.17073694872879, 6.614603192901361),
('berenice', 'Berenice', 'Boehm', 'Margarette.Langworth51@yahoo.com', '1234', 'filmmaker, designer, traveler', 'm', 'o', 110, 2, 46.98285039508653, 8.620381329019443),
('maryjane', 'Maryjane', 'Swift', 'Jarrod_OKon18@gmail.com', '1234', 'composer advocate', 'm', 'o', 100, 0, 47.07364269985852, 8.844622438012493),
('antwon', 'Antwon', 'O''Hara', 'Magnolia.Mayert@hotmail.com', '1234', 'streamer, student, inventor', 'f', 'e', 30, 2, 46.15375229032897, 6.572654058059932),
('maci', 'Maci', 'Skiles', 'Colten.Steuber89@hotmail.com', '1234', 'student, scientist, entrepreneur 🦉', 'f', 'o', 92, 2, 46.77315408691558, 8.102468133467344),
('eleanora', 'Eleanora', 'Veum', 'Lyda.Lindgren@yahoo.com', '1234', 'spirit junkie', 'm', 'o', 34, 2, 46.696712520207534, 7.913670836881186),
('ben', 'Ben', 'D''Amore', 'Maryjane3@hotmail.com', '1234', 'adrenaline lover, friend', 'f', 'e', 46, 4, 47.435151553176766, 9.737486061008655),
('ulises', 'Ulises', 'Leuschke', 'Winona.Bartoletti56@yahoo.com', '1234', 'cheek supporter, parent 🏀', 'm', 'e', 26, 0, 47.274474323565485, 9.340641413783873),
('josiane', 'Josiane', 'Fisher', 'Woodrow.Barrows93@gmail.com', '1234', 'student, environmentalist, veteran', 'f', 'e', 18, 4, 46.37193769413735, 7.111533834699133),
('zoe', 'Zoe', 'Kerluke', 'Jayce98@gmail.com', '1234', 'philosopher, musician', 'm', 'e', 34, 0, 46.86145078756413, 8.320545536872643),
('ansley', 'Ansley', 'Bauch', 'Eunice39@gmail.com', '1234', 'office junkie  🐌', 'f', 'o', 54, 0, 47.04670210679083, 8.778083886297122),
('bernice', 'Bernice', 'Weimann', 'Marilie.Breitenberg75@yahoo.com', '1234', 'designer', 'm', 'o', 34, 2, 46.67879457362727, 7.86941664350955),
('aida', 'Aida', 'Marvin', 'Breanne77@hotmail.com', '1234', 'turf junkie, streamer 🐓', 'f', 'e', 82, 2, 47.0478714480129, 8.7809719545435),
('dustin', 'Dustin', 'Thiel', 'Kade.Lubowitz@yahoo.com', '1234', 'petition devotee, environmentalist 🌾', 'm', 'o', 44, 4, 47.14220615103111, 9.013962167474634),
('benedict', 'Benedict', 'Luettgen', 'Osvaldo25@yahoo.com', '1234', 'educator, grad, nerd', 'f', 'e', 60, 4, 46.507465680696185, 7.446264251355812),
('glenna', 'Glenna', 'Lehner', 'Jessyca14@gmail.com', '1234', 'detention fan  🧗‍♂️', 'f', 'e', 52, 0, 46.61380981350859, 7.708915654871179),
('bethany', 'Bethany', 'Hintz', 'Maeve.Davis60@yahoo.com', '1234', 'filmmaker, business owner, musician 🐃', 'f', 'e', 18, 0, 46.75027236259491, 8.045954277472326),
('wade', 'Wade', 'Ankunding', 'Arely_Roob@gmail.com', '1234', 'writer, gamer', 'm', 'e', 70, 2, 46.93324839814302, 8.497873074263547),
('camren', 'Camren', 'Bechtelar', 'Sylvester.McClure@hotmail.com', '1234', 'hub enthusiast, leader 🇲🇸', 'f', 'e', 18, 2, 46.25745279764668, 6.828776169096364),
('porter', 'Porter', 'Glover', 'Madaline_Toy36@yahoo.com', '1234', 'environmentalist, model, environmentalist 🍡', 'm', 'o', 34, 4, 47.40418997151431, 9.66101637092199),
('mabelle', 'Mabelle', 'Johns', 'Conor.Gibson@yahoo.com', '1234', 'film lover, activist, musician 👩🏿‍❤️‍👩🏼', 'm', 'e', 82, 4, 46.67124725697324, 7.85077609175054),
('madge', 'Madge', 'Daniel', 'Berta.Lemke77@gmail.com', '1234', 'intelligence junkie  🚮', 'm', 'e', 88, 4, 46.72198142742854, 7.976080617010789),
('myles', 'Myles', 'Schinner', 'Braden82@gmail.com', '1234', 'checkroom junkie, grad', 'm', 'o', 26, 0, 47.09269905866185, 8.891688310413913),
('christ', 'Christ', 'Wehner', 'Clovis.Goldner@gmail.com', '1234', 'general junkie, parent ❇️', 'm', 'e', 108, 4, 46.112385455252706, 6.470485212403577);
