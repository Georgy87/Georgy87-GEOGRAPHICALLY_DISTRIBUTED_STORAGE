import { GlobalStorage } from '@/constants/types';

export type GlobalDistribution = {
  europe: number;
  northAmerica: number;
  southAmerica: number;
  asia: number;
  oceania: number;
};

export type LocalDistribution = {
  europe: number;
  northAmerica: number;
  southAmerica: number;
  asia: number;
  oceania: number;
};

export type User = {
  continent: string;
  users: number;
};

export type ContinentsSliceState = {
  totalRegions: number;
  totalStorages: number;
  users: User[];
  isObjectStorage: { componentName: string };
  northAmericaLocalDeviceIds: string[];
  southAmericaLocalDeviceIds: string[];
  oceaniaAsiaLocalDeviceIds: string[];
  europeLocalDeviceIds: string[];
  isConnectStorages: boolean;
  isNext: boolean;
  isStart: boolean;
  listOfConnectedContinents: string[];
  presenceOfUsersOnContinents: string[];
  globalDistributionToContinents: Partial<LocalDistribution>[];
  localDistributionToContinents: Partial<LocalDistribution>[];
  globalDistributionToUsers: GlobalStorage[];
  setTimeoutsCounter: { counter: number; delay: number[] };
  rerenderedGlobalDistribution: Partial<LocalDistribution>[];
  biteCloud: Partial<LocalDistribution>[];
};
