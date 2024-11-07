export type UserRegister = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

export type ModifiedUserGeneral = {
  firstname: string;
  lastname: string;
  selectedGender: string;
  sexualPreference: string;
  bio: string;
  age: string;
  email_verified: boolean;
};

export type ModifiedUserEmail = {
  email: string;
};

export type ModifiedUserPassword = {
  currentPassword: string;
  newPassword: string;
};

export type UserInterests = {
  interests: string[];
};

export type UserData = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  selectedGender: string;
  sexualPreference: string;
  bio: string;
  age: string;
  emailVerified: boolean;
  profile_complete: boolean;
  fameRating: number;
  urlProfile: string;
  pictures: string[];
};

export type PossibleMatchesUserData = {
  username: string;
  firstname: string;
  lastname: string;
  age: string;
  selectedGender: string;
  sexualPreference: string;
};

export type chatContact = {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};
