CREATE TABLE users (
  id int
  username varchar
  password varchar
  firstname varchar
  lastname varchar
  email varchar
  created_at timestamp
);
CREATE TABLE usersdata (
  id_user int
  gender varchar(1)
  biography text
);
CREATE TABLE sexualpreference (
  id int
  sexualpreference varchar
);
CREATE TABLE interest (
  id int
  interest varchar
);
CREATE TABLE picture (
  id int
  picture_path varchar
  is_profile_picture boolean
);
CREATE TABLE user_interest (
  id_user int
  id_interest int
);
CREATE TABLE user_picture (
  id_user int
  id_picture int
);
CREATE TABLE user_sexualpreference (
  id_user int
  id_sexualpreference int
);
