import { PossibleMatchesUserData } from '../models/data-to-api/user';

export function getSexualPreference(user: PossibleMatchesUserData): string {
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

export function getGender(user: PossibleMatchesUserData): string {
  if (user.gender === 'm') {
    return 'Male';
  }
  if (user.gender === 'f') {
    return 'Female';
  }
  return 'NOT SPECIFIED';
}

export function getFameRatingStars(fullStars: number = 5): string {
  let starsString = '';
  for (let i = 0; i < fullStars; i++) {
    starsString += `<img src="/icons/star-fat.svg" alt="Star" />`;
  }
  return starsString;
}
