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
};

export type ModifiedUserEmail = {
  email: string;
};

export type ModifiedUserPassword = {
  currentPassword: string;
  newPassword: string;
};
