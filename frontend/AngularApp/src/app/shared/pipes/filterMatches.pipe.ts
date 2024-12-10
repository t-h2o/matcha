import { Pipe, PipeTransform } from '@angular/core';
import { PossibleMatchesUserData, UserData } from '../models/data-to-api/user';

@Pipe({
  name: 'filterMatches',
  standalone: true,
})
export class FilterMatchesPipe implements PipeTransform {
  transform(
    matches: PossibleMatchesUserData[],
    filterType: string,
    currentUser: UserData | null
  ): PossibleMatchesUserData[] {
    if (!matches || !currentUser) {
      return matches;
    }

    switch (filterType) {
      case 'all':
        return matches;

      case 'age':
        const userAge = parseInt(currentUser.age);
        return matches.sort((a, b) => {
          const ageA = parseInt(a.age);
          const ageB = parseInt(b.age);
          const diffA = Math.abs(ageA - userAge);
          const diffB = Math.abs(ageB - userAge);
          return diffA - diffB;
        });

      case 'fame':
        const userFame = currentUser.fameRating;
        return matches.sort((a, b) => {
          const diffA = Math.abs(a.fameRating - userFame);
          const diffB = Math.abs(b.fameRating - userFame);
          return diffA - diffB;
        });

      case 'interests':
        if (!currentUser.interests) {
          return matches;
        }
        return matches.sort((a, b) => {
          // Count common interests for user A
          const commonInterestsA = a.interests
            ? currentUser.interests.filter((interest) =>
                a.interests?.includes(interest)
              ).length
            : 0;

          // Count common interests for user B
          const commonInterestsB = b.interests
            ? currentUser.interests.filter((interest) =>
                b.interests?.includes(interest)
              ).length
            : 0;

          // Sort by most common interests first
          return commonInterestsB - commonInterestsA;
        });

      default:
        return matches;
    }
  }
}
