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

export type ModifyGeneralData = {
  firstname: string;
  lastname: string;
  selectedGender: string;
  sexualPreference: string;
  bio: string;
  age: string;
  email_verified: boolean;
};

export type ModifiedUserGeneral = {
  firstname: string;
  lastname: string;
  selectedGender: string;
  sexualPreference: string;
  bio: string;
  age: string;
  email: string;
  email_verified: boolean;
  fameRating: number;
  profile_complete: boolean;
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
  email?: string;
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
  interests: string[];
  isLiked?: boolean;
  likedBy: string[];
  visitedBy: string[];
  connected: boolean;
};

export type PossibleMatchesUserData = {
  username: string;
  firstname: string;
  lastname: string;
  age: string;
  gender: string;
  sexualPreference: string;
  fameRating: number;
  urlProfile: string;
  isLiked?: boolean;
  interests: string[];
};

export type chatContact = {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export type FilterPotentialMatch = {
  ageGap: number;
  fameGap: number;
  distance: number;
  interests: string[];
};

export type LocationCoordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};
