import { PossibleMatchesUserData, UserData } from '../models/data-to-api/user';

export function getSexualPreference(
  user: PossibleMatchesUserData | UserData,
): string {
  if (user.sexualPreference === 'e') {
    return 'Heterosexual';
  }
  if (user.sexualPreference === 'o') {
    return 'Homosexual';
  }
  if (user.sexualPreference === 'b') {
    return 'Bisexual';
  }
  return 'NOT SPECIFIED';
}

export function getGender(user: PossibleMatchesUserData | UserData): string {
  if ('gender' in user) {
    if (user.gender === 'm') {
      return 'Male';
    }
    if (user.gender === 'f') {
      return 'Female';
    }
  } else if ('selectedGender' in user) {
    if (user.selectedGender === 'm') {
      return 'Male';
    }
    if (user.selectedGender === 'f') {
      return 'Female';
    }
  }
  return 'NOT SPECIFIED';
}

export function getFameRatingStars(fullStars: number = 5): string {
  let starsString = '';
  for (let i = 0; i < fullStars; i++) {
    starsString += `<img src="/icons/star_full.svg" alt="Star-full" />`;
  }
  for (let i = 0; i < 5 - fullStars; i++) {
    starsString += `<img src="/icons/star_border.svg" alt="Star-empty" />`;
  }
  return starsString;
}

export function getAge(age: string): string {
  if (!age || age === '') {
    return 'NOT SPECIFIED';
  }
  return age;
}

export function getBio(bio: string): string {
  if (!bio || bio === '') {
    return 'EMPTY';
  }
  return bio;
}
