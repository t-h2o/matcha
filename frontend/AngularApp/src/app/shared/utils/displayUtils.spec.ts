import { PossibleMatchesUserData, UserData } from '../models/data-to-api/user';
import {
  getSexualPreference,
  getGender,
  getFameRatingStars,
  getAge,
  getBio,
} from './displayUtils';

describe('DisplayUtils', () => {
  let userWithUserDataType: UserData = {
    username: 'test',
    firstname: 'test',
    lastname: 'test',
    selectedGender: 'm',
    sexualPreference: 'e',
    bio: 'test',
    age: 'test',
    emailVerified: true,
    profile_complete: true,
    fameRating: 5,
    urlProfile: 'test',
    pictures: ['test'],
  };
  let userWithPossibleMatchesDataType: PossibleMatchesUserData = {
    username: 'test',
    firstname: 'test',
    lastname: 'test',
    age: 'test',
    gender: 'm',
    sexualPreference: 'e',
    fameRating: 5,
    urlProfile: 'test',
  };

  describe('getSexualPreference', () => {
    describe('when user is of type UserData', () => {
      it('should return Heterosexual when user sexual preference is e', () => {
        expect(getSexualPreference(userWithUserDataType)).toEqual(
          'Heterosexual',
        );
      });
      it('should return Homosexual when user sexual preference is o', () => {
        userWithUserDataType.sexualPreference = 'o';
        expect(getSexualPreference(userWithUserDataType)).toEqual('Homosexual');
      });

      it('should return Bisexual when user sexual preference is b', () => {
        userWithUserDataType.sexualPreference = 'b';
        expect(getSexualPreference(userWithUserDataType)).toEqual('Bisexual');
      });

      it('should return NOT SPECIFIED when user sexual preference is not e, o or b', () => {
        userWithUserDataType.sexualPreference = 'a';
        expect(getSexualPreference(userWithUserDataType)).toEqual(
          'NOT SPECIFIED',
        );
      });
    });

    describe('when user is of type PossibleMatchesUserData', () => {
      it('should return Heterosexual when user sexual preference is e', () => {
        expect(getSexualPreference(userWithPossibleMatchesDataType)).toEqual(
          'Heterosexual',
        );
      });
      it('should return Homosexual when user sexual preference is o', () => {
        userWithPossibleMatchesDataType.sexualPreference = 'o';
        expect(getSexualPreference(userWithPossibleMatchesDataType)).toEqual(
          'Homosexual',
        );
      });
      it('should return Bisexual when user sexual preference is b', () => {
        userWithPossibleMatchesDataType.sexualPreference = 'b';
        expect(getSexualPreference(userWithPossibleMatchesDataType)).toEqual(
          'Bisexual',
        );
      });
      it('should return NOT SPECIFIED when user sexual preference is not e, o or b', () => {
        userWithPossibleMatchesDataType.sexualPreference = 'a';
        expect(getSexualPreference(userWithPossibleMatchesDataType)).toEqual(
          'NOT SPECIFIED',
        );
      });
    });
  });

  describe('getGender', () => {
    describe('when user is of type UserData', () => {
      it('should return Male when user gender is m', () => {
        expect(getGender(userWithUserDataType)).toEqual('Male');
      });

      it('should return Female when user gender is f', () => {
        userWithUserDataType.selectedGender = 'f';
        expect(getGender(userWithUserDataType)).toEqual('Female');
      });

      it('should return NOT SPECIFIED when username is not m or f', () => {
        userWithUserDataType.selectedGender = 'a';
        expect(getGender(userWithUserDataType)).toEqual('NOT SPECIFIED');
      });
    });

    describe('when user is of type PossibleMatchesUserData', () => {
      it('should return Male when user gender is m', () => {
        expect(getGender(userWithPossibleMatchesDataType)).toEqual('Male');
      });

      it('should return Female when user gender is f', () => {
        userWithPossibleMatchesDataType.gender = 'f';
        expect(getGender(userWithPossibleMatchesDataType)).toEqual('Female');
      });

      it('should return NOT SPECIFIED when gender is not m or f', () => {
        userWithPossibleMatchesDataType.gender = 'a';
        expect(getGender(userWithUserDataType)).toEqual('NOT SPECIFIED');
      });
    });
  });

  describe('getFameRatingStars', () => {
    it('should return 5 full stars when fullStars is 5', () => {
      expect(getFameRatingStars(5)).toEqual(
        '<img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" />',
      );
    });
    it('should return 4 full stars and 1 empty star when fullStars is 4', () => {
      expect(getFameRatingStars(4)).toEqual(
        '<img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_full.svg" alt="Star-full" /><img src="/icons/star_border.svg" alt="Star-empty" />',
      );
    });

    it('should return 0 full stars and 5 empty stars when fullStars is 0', () => {
      expect(getFameRatingStars(0)).toEqual(
        '<img src="/icons/star_border.svg" alt="Star-empty" /><img src="/icons/star_border.svg" alt="Star-empty" /><img src="/icons/star_border.svg" alt="Star-empty" /><img src="/icons/star_border.svg" alt="Star-empty" /><img src="/icons/star_border.svg" alt="Star-empty" />',
      );
    });
  });

  describe('getAge', () => {
    it('should return NOT SPECIFIED when age is empty', () => {
      expect(getAge('')).toEqual('NOT SPECIFIED');
    });
    it('should return age when age is not empty', () => {
      expect(getAge('45')).toEqual('45');
    });
  });

  describe('getBio', () => {
    it('should return EMPTY when bio is empty', () => {
      expect(getBio('')).toEqual('EMPTY');
    });
    it('should return bio when bio is not empty', () => {
      expect(getBio('test')).toEqual('test');
    });
  });
});
