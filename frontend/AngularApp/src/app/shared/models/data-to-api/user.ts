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

export type UserModifyGeneral = {
  firstname: string;
  lastname: string;
  selectedGender: string;
  sexualPreference: string;
  bio: string;
};

export type UserModifyEmail = {
  email: string;
};

export type UserModifyPassword = {
  currentPassword: string;
  newPassword: string;
};
