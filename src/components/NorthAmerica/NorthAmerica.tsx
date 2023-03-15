'use-client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { devicesNorthAmerica, northDevicePosition } from '@/constants/devices';
import { Mans } from '@/components/Mans/Mans';
import { GlobalStorage, TDevices } from '@constants/types';
import { Devices } from '@/components/Devices/Devices';
import { AppDispatch } from '@/store/store';
import {
  selectIsConnectStorages,
  selectIsObjectStorage,
  selectIsStart,
  selectNorthAmericaLocalDeviceIds,
  selectTotalRegions,
  selectTotalStorages,
} from '@/selectors/continents';
import {
  setTotalRegions,
  setNordAmericaLocalDeviceIds,
  updateLocalDeviceIds,
  setLocalDistribution,
  setGlobalDistributionToContinents,
} from '@/slices/continentsSlice';
import { eastUsaGlobalStorage } from '@/constants/storageLines';
import { Storage } from '@/components/Storage/Storage';
import { NorthAmericaLoader } from '../Loaders/NorthAmericaLoader';
import { eastAmericaGlobalStorage, eastAmericaLocalStorage } from '@/constants/storages';

import styles from './NorthAmerica.module.scss';

export const NorthAmerica = () => {
  const dispatch = useDispatch<AppDispatch>();

  const totalRegions = useSelector(selectTotalRegions);
  const northAmericaLocalDeviceIds = useSelector(selectNorthAmericaLocalDeviceIds);
  const totalStorages = useSelector(selectTotalStorages);
  const connectStorages = useSelector(selectIsConnectStorages);
  const { start, continents, users, availabilityOfUsersToContinent } = useSelector(selectIsStart);
  const globalDistribution = useSelector(selectIsObjectStorage);

  const [filteredDevices, setFilteredDevices] = useState<TDevices[] | null>(null);
  const [isMans, setIsMans] = useState<boolean>(false);

  const onHandleFiltered = useCallback((idx: number) => {
    setFilteredDevices(devicesNorthAmerica.filter((el: TDevices, id: number) => id <= idx));
    setIsMans(!isMans);
    dispatch(setTotalRegions(1));
  }, []);

  useEffect(() => {
    const deviceIds = filteredDevices?.map((el: TDevices) => el.alt);
    if (!deviceIds) return;
    dispatch(setNordAmericaLocalDeviceIds(deviceIds));
  }, [filteredDevices, dispatch]);

  const eastUsaImages = useMemo(() => {
    const result = eastUsaGlobalStorage.filter((elem: GlobalStorage) => {
      return northAmericaLocalDeviceIds.includes(elem.id);
    });
    return result;
  }, [northAmericaLocalDeviceIds]);

  const isTotalRegions = useMemo(() => totalRegions === 5 && true, [totalRegions]);
  const isTotalStorage = useMemo(() => totalStorages === 4 && true, [totalStorages]);
  const isConnectStorages = useMemo(() => connectStorages, [connectStorages]);
  const continentStorageWithStart = useMemo(
    () => start && !continents.includes('north-america') && true,
    [start, continents]
  );
  const availabilityOfUsers = useMemo(() => availabilityOfUsersToContinent, [availabilityOfUsersToContinent]);
  const continentUsersWithStart = useMemo(() => start && users.includes('north-america'), [start, users]);
  const { isUsersToContinentSouthAmerica, isUsersToContinentNorthAmerica } = useMemo(() => {
    return {
      isUsersToContinentSouthAmerica: availabilityOfUsersToContinent.some(
        (continent) => continent.continent === 'southAmerica'
      ),
      isUsersToContinentNorthAmerica: availabilityOfUsersToContinent.some(
        (continent) => continent.continent === 'northAmerica'
      ),
    };
  }, [availabilityOfUsersToContinent]);

  useEffect(() => {
    if (start && !continents.includes('south-america')) {
      dispatch(updateLocalDeviceIds('north-america'));
    }
  }, [isTotalStorage, start, continents, dispatch]);

  useEffect(() => {
    const isUsersToContinentSouthAmerica = availabilityOfUsers.some(
      (continent) => continent.continent === 'southAmerica'
    );
    
    const isUsersToContinentNorthAmerica = availabilityOfUsers.some(
      (continent) => continent.continent === 'northAmerica'
    );

    if ((isTotalStorage || start) && continents.includes('north-america') && isUsersToContinentNorthAmerica) {
      dispatch(setLocalDistribution({ northAmerica: eastAmericaLocalStorage.northAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('south-america') && isUsersToContinentNorthAmerica) {
      dispatch(setLocalDistribution({ northAmerica: eastAmericaLocalStorage.northAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('south-america') && isUsersToContinentSouthAmerica) {
      dispatch(setLocalDistribution({ southAmerica: eastAmericaLocalStorage.southAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('south-america') && !isUsersToContinentSouthAmerica) {
      return;
    }
  }, [
    isTotalStorage,
    eastUsaImages,
    start,
    continents,
    isUsersToContinentSouthAmerica,
    isUsersToContinentNorthAmerica,
    dispatch,
  ]);

  useEffect(() => {
    globalDistribution === 'north-america'
      ? dispatch(setGlobalDistributionToContinents(eastAmericaGlobalStorage))
      : null;
  }, [globalDistribution, dispatch]);

  const renderContent = () => {
    return (
      <>
      <NorthAmericaLoader />
        {isMans || isConnectStorages ? (
          <Devices filteredDevices={filteredDevices} position={northDevicePosition} />
        ) : (
          <Mans top="40%" left="25%" onHandleFilteredId={onHandleFiltered} />
        )}
      </>
    );
  };

  return (
    <div className={styles.northAmerica}>
      {(isTotalRegions || isConnectStorages) && !continentStorageWithStart && (
        <Storage
          alt={'north-america-storage'}
          stylesCircle={styles.circle}
          stylesStorage={styles.storage}
          continent="north-america"
        />
      )}

      {!continentStorageWithStart &&
        (isTotalStorage || continentUsersWithStart) &&
        eastUsaImages.map((el, id) => {
          return (
            <div key={id.toString()}>
              <img
                src={el.src}
                alt={el.src}
                className={styles.northAmericaImages}
              />
            </div>
          );
        })}

      {renderContent()}
    </div>
  );
};
