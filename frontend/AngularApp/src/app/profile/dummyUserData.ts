export let dummyUserData = {
  username: 'JohnnyAppleseed',
  firstName: 'Johnny',
  lastName: 'Appleseed',
  email: 'JohnnyAppleseed@test.com',
  gender: 'male',
  sexualPreference: 'heterosexual',
  birthDate: '1990-01-01',
  bio: 'I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.',
  interests: [
    'hiking',
    'biking',
    'swimming',
    'reading',
    'cooking',
    'traveling',
    'watching movies',
    'playing video games',
    'playing board games',
    'playing sports',
  ],
  pictures: [
    'johnnyAppleseed1.jpg',
    'johnnyAppleseed2.jpg',
    'johnnyAppleseed3.jpg',
    'johnnyAppleseed4.jpg',
    // 'johnnyAppleseed5.jpg',
  ],
  profilePic: 'johnnyAppleseed1',
};

export type UserData = typeof dummyUserData;
