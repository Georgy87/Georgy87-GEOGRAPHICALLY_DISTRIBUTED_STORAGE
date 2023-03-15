import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  eastUsaGlobalStorage,
  germanyGlobalStorage,
  singaporeUsaGlobalStorage,
  westUsaGlobalStorage,
} from '@/constants/storageLines';
import { ContinentsSliceState, LocalDistribution } from './types';
import { getObjectsEqual } from '@/utils/getObjectsEqual';

const initialState: ContinentsSliceState = {
  totalRegions: 0,
  totalStorages: 0,
  users: [],
  northAmericaLocalDeviceIds: [],
  southAmericaLocalDeviceIds: [],
  oceaniaAsiaLocalDeviceIds: [],
  europeLocalDeviceIds: [],
  isObjectStorage: { componentName: '' },
  isConnectStorages: false,
  isNext: false,
  isStart: false,
  listOfConnectedContinents: [],
  presenceOfUsersOnContinents: [],
  globalDistributionToContinents: [],
  localDistributionToContinents: [],
  globalDistributionToUsers: [],
  setTimeoutsCounter: { counter: 0, delay: [] },
  rerenderedGlobalDistribution: [],
  biteCloud: [],
};

const continentsSlice = createSlice({
  name: 'continents',
  initialState,
  reducers: {
    setTotalRegions: (state, action: PayloadAction<number>) => {
      state.totalRegions === 4 ? (state.isConnectStorages = true) : null;
      state.totalRegions = state.totalRegions + action.payload;
    },
    setTotalStorages: (state, action: PayloadAction<{ count: number; continent: string }>) => {
      const { count, continent } = action.payload;
      state.listOfConnectedContinents = [...state.listOfConnectedContinents, continent];
      state.totalStorages = state.totalStorages + count;
    },
    setObjectStorage: (state, action: PayloadAction<{ componentName: string }>) => {
      if (
        state.isObjectStorage.componentName !== action.payload.componentName &&
        state.isObjectStorage.componentName.length > 0
      )
        return;
      state.isObjectStorage = action.payload;
    },
    setNordAmericaLocalDeviceIds: (state, action: PayloadAction<string[]>) => {
      state.northAmericaLocalDeviceIds = [...state.northAmericaLocalDeviceIds, ...action.payload];
      state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'north-america'];
      state.users = [...state.users, { continent: 'northAmerica', users: action.payload.length }];
    },
    setSouthAmericaLocalDeviceIds: (state, action: PayloadAction<string[]>) => {
      state.southAmericaLocalDeviceIds = [...state.southAmericaLocalDeviceIds, ...action.payload];
      state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'south-america'];
      state.users = [...state.users, { continent: 'southAmerica', users: action.payload.length }];
    },
    setOceaniaAsiaLocalDeviceIds: (state, action: PayloadAction<{ devices: string[]; continent: string }>) => {
      const { devices, continent } = action.payload;
      state.oceaniaAsiaLocalDeviceIds = [...state.oceaniaAsiaLocalDeviceIds, ...devices];
      state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'asia'];
      state.users = [...state.users, { continent, users: devices.length }];
    },
    setEuropeLocalDeviceIds: (state, action: PayloadAction<string[]>) => {
      state.europeLocalDeviceIds = [...state.europeLocalDeviceIds, ...action.payload];
      state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'europe'];
      state.users = [...state.users, { continent: 'europe', users: action.payload.length }];
    },
    setIsConnectStorages: (state) => {
      state.isConnectStorages = true;
    },
    setIsStart: (state) => {
      state.isStart = true;
    },
    updateLocalDeviceIds: (state, action: PayloadAction<string>) => {
      if (action.payload === 'north-america') {
        state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'north-america'];
        state.northAmericaLocalDeviceIds = [...state.northAmericaLocalDeviceIds, ...state.southAmericaLocalDeviceIds];
      } else {
        state.presenceOfUsersOnContinents = [...state.presenceOfUsersOnContinents, 'south-america'];
        state.southAmericaLocalDeviceIds = [...state.southAmericaLocalDeviceIds, ...state.northAmericaLocalDeviceIds];
      }
    },
    setGlobalDistributionToContinents: (state, action: PayloadAction<Partial<LocalDistribution>[]>) => {
      state.globalDistributionToContinents = action.payload;
    },
    setLocalDistribution: (state, action: PayloadAction<Partial<LocalDistribution>>) => {
      if (state.rerenderedGlobalDistribution.length) return;
      if (state.localDistributionToContinents.some((item) => getObjectsEqual(item, action.payload))) return;
      state.biteCloud = [...state.localDistributionToContinents, action.payload];
      state.localDistributionToContinents = [...state.localDistributionToContinents, action.payload];
    },
    setGlobalDistributionToUsers: (state) => {
      const globalStorageMapping: any = {
        'europe': germanyGlobalStorage,
        'north-america': eastUsaGlobalStorage,
        'south-america': westUsaGlobalStorage,
        'asia': singaporeUsaGlobalStorage,
      };

      const localDeviceIds = [
        ...state.europeLocalDeviceIds,
        ...state.northAmericaLocalDeviceIds,
        ...state.southAmericaLocalDeviceIds,
        ...state.oceaniaAsiaLocalDeviceIds,
      ];

      const globalStorage = globalStorageMapping[state.isObjectStorage.componentName];
      if (!globalStorage) return;
      const result = globalStorage.filter((elem: any) => {
        return localDeviceIds.includes(elem.id);
      });

      state.europeLocalDeviceIds = [];
      state.northAmericaLocalDeviceIds = [];
      state.southAmericaLocalDeviceIds = [];
      state.oceaniaAsiaLocalDeviceIds = [];

      state.globalDistributionToUsers = result;
    },
    setTimeoutsCounter: (state, action: PayloadAction<{ counter: number; delay: number }>) => {
      state.setTimeoutsCounter.counter = state.setTimeoutsCounter.counter + 1;
      state.setTimeoutsCounter.delay = [...state.setTimeoutsCounter.delay, action.payload.delay];
      if (
        state.setTimeoutsCounter.counter > 0 &&
        state.setTimeoutsCounter.counter === state.totalRegions &&
        state.localDistributionToContinents
      ) {
        const globalDistributionToContinents: Partial<LocalDistribution>[] = state.globalDistributionToContinents;
        const localDistributionToContinents: Partial<LocalDistribution>[] = state.localDistributionToContinents;

        const result = globalDistributionToContinents.filter((item: Partial<LocalDistribution>) => {
          const key = Object.keys(item)[0];
          return localDistributionToContinents.some(
            (item2: Partial<LocalDistribution>) => Object.keys(item2)[0] === key
          );
        });

        state.localDistributionToContinents = [];
        state.rerenderedGlobalDistribution = result;
      }
    },
  },
});

export const {
  setTotalRegions,
  setTotalStorages,
  setNordAmericaLocalDeviceIds,
  setSouthAmericaLocalDeviceIds,
  setOceaniaAsiaLocalDeviceIds,
  setEuropeLocalDeviceIds,
  setObjectStorage,
  setIsConnectStorages,
  setIsStart,
  updateLocalDeviceIds,
  setGlobalDistributionToContinents,
  setLocalDistribution,
  setGlobalDistributionToUsers,
  setTimeoutsCounter,
} = continentsSlice.actions;

export default continentsSlice.reducer;
