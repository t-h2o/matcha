import { UserData } from './data-to-api/user';

export const emptyUser: UserData = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  age: '',
  selectedGender: '',
  sexualPreference: '',
  bio: '',
  pictures: [],
  urlProfile: '',
  emailVerified: false,
  profile_complete: false,
  fameRating: 0,
};

export const emptyOtherUser = {
  username: '',
  firstname: '',
  lastname: '',
  age: '',
  selectedGender: '',
  sexualPreference: '',
  bio: '',
  pictures: [],
  urlProfile: '',
  fameRating: 0,
  interests: [],
};
