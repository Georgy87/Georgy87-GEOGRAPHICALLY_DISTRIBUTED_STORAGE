import { LocalDistribution, User } from '@/slices/types';
import { sortArrayByUsers } from './sortArrayByUsers';

export const getDataForTable = (
  usersOnContinents: User[],
  localDistribution: Partial<LocalDistribution>[],
  globalDistribution: Partial<LocalDistribution>[]
) => {
  return {
    byteCloud: sortArrayByUsers(createMerge(usersOnContinents, localDistribution)),
    objectStorage: sortArrayByUsers(createMerge(usersOnContinents, globalDistribution)),
  };
};

const createMerge = (usersOnContinents: User[], distributions: Partial<LocalDistribution>[]) => {
  const result = usersOnContinents.reduce((acc: any, { continent, users }: any) => {
    acc[continent] = { users };
    return acc;
  }, {});

  distributions.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (result[key]) {
        result[key][key] = value;
      }
    });
  });
  return [result];
};
