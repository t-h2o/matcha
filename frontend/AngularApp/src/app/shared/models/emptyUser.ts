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
  email_verified: false,
  profile_complete: false,
  fameRating: 4,
  interests: [],
  likedBy: [],
  visitedBy: [],
  connected: false,
  lastConnection: 0,
  isFaked: false,
  isBlocked: false,
  localization: { latitude: 999, longitude: 0 },
};

export const testUser: UserData = {
  username: 'testUser',
  firstname: 'test',
  lastname: 'user',
  email: 'test@test.com',
  age: '25',
  selectedGender: 'm',
  sexualPreference: 'e',
  bio: 'test bio',
  pictures: [],
  urlProfile: '',
  email_verified: true,
  profile_complete: true,
  fameRating: 4,
  interests: [],
  likedBy: [],
  visitedBy: [],
  connected: false,
  lastConnection: 0,
  isFaked: false,
  isBlocked: false,
  localization: { latitude: 999, longitude: 0 },
};
