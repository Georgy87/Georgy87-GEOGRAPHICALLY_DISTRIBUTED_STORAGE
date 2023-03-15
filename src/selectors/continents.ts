import { RootState } from '@/store/store';

export const selectMain = (state: RootState) => state.continents;

export const selectTotalRegions = (state: RootState) => selectMain(state).totalRegions;
export const selectTotalStorages = (state: RootState) => selectMain(state).totalStorages;
export const selectIsObjectStorage = (state: RootState) => selectMain(state).isObjectStorage.componentName;
export const selectIsConnectStorages = (state: RootState) => selectMain(state).isConnectStorages;
export const selectIsStart = (state: RootState) => {
  return {
    start: selectMain(state).isStart,
    continents: selectMain(state).listOfConnectedContinents,
    users: selectMain(state).presenceOfUsersOnContinents,
    availabilityOfUsersToContinent: selectMain(state).users,
  };
};

export const selectNorthAmericaLocalDeviceIds = (state: RootState) => selectMain(state).northAmericaLocalDeviceIds;
export const selectSouthAmericaLocalDeviceIds = (state: RootState) => selectMain(state).southAmericaLocalDeviceIds;
export const selectOceaniaAsiaLocalDeviceIds = (state: RootState) => selectMain(state).oceaniaAsiaLocalDeviceIds;
export const selectEuropeLocalDeviceIds = (state: RootState) => selectMain(state).europeLocalDeviceIds;

export const selectGlobalDistributionToUsers = (state: RootState) => selectMain(state).globalDistributionToUsers;
export const selectLocalsLatensy = (state: RootState) => selectMain(state).localDistributionToContinents;

export const selectSetTimeoutCounter = (state: RootState) => selectMain(state).setTimeoutsCounter;
export const selectUsers = (state: RootState) => selectMain(state).users;
export const selectRerenderedGlobalDistribution = (state: RootState) => selectMain(state).rerenderedGlobalDistribution;
export const selectBiteCloud = (state: RootState) => selectMain(state).biteCloud;
