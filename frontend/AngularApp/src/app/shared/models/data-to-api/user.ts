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
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  selectedGender: string;
  sexualPreference: string;
  birthDate: string;
  bio: string;
  pictures: string[];
  profilePicture: string;
  emailVerified: boolean;
};

export type PossibleMatchesUserData = {
  username: string;
  firstname: string;
  lastname: string;
  age: string;
  selectedGender: string;
  sexualPreference: string;
  profilePicture: string;
};
