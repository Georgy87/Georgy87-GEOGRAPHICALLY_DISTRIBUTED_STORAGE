import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { devicesSouthAmerica, southDevicePosition } from '@constants/devices';
import { GlobalStorage, TDevices } from '@constants/types';
import { Mans } from '@components/Mans/Mans';
import { Devices } from '@components/Devices/Devices';
import {
  setTotalRegions,
  setSouthAmericaLocalDeviceIds,
  updateLocalDeviceIds,
  setLocalDistribution,
  setGlobalDistributionToContinents,
} from '@/slices/continentsSlice';
import { AppDispatch } from '@/store/store';
import {
  selectIsConnectStorages,
  selectIsObjectStorage,
  selectIsStart,
  selectSouthAmericaLocalDeviceIds,
  selectTotalRegions,
  selectTotalStorages,
} from '@/selectors/continents';
import { westUsaGlobalStorage } from '@/constants/storageLines';
import { Storage } from '@components/Storage/Storage';
import { SouthAmericaLoader } from '../Loaders/SouthAmerica';
import { westAmericaGlobalStorage, westAmericaLocalStorage } from '@/constants/storages';

import styles from './SouthAmerica.module.scss';

export const SouthAmerica = () => {
  const dispatch = useDispatch<AppDispatch>();

  const totalStorages = useSelector(selectTotalStorages);
  const totalRegions = useSelector(selectTotalRegions);
  const southAmericaLocalDeviceIds = useSelector(selectSouthAmericaLocalDeviceIds);
  const connectStorages = useSelector(selectIsConnectStorages);
  const { start, continents, users, availabilityOfUsersToContinent } = useSelector(selectIsStart);
  const globalDistribution = useSelector(selectIsObjectStorage);

  const [filteredDevices, setFilteredDevices] = useState<TDevices[] | null>(null);
  const [isMans, setIsMans] = useState<boolean>(false);

  const onHandleFiltered = useCallback((idx: number) => {
    setFilteredDevices(devicesSouthAmerica.filter((el: TDevices, id: number) => id <= idx));
    setIsMans(!isMans);
    dispatch(setTotalRegions(1));
  }, []);

  useEffect(() => {
    const deviceIds = filteredDevices?.map((el: TDevices) => el.alt);
    if (!deviceIds) return;
    dispatch(setSouthAmericaLocalDeviceIds(deviceIds));
  }, [filteredDevices, dispatch]);

  const westUsaImages = useMemo(() => {
    const result = westUsaGlobalStorage.filter((elem: GlobalStorage) => {
      return southAmericaLocalDeviceIds.includes(elem.id);
    });
    return result;
  }, [southAmericaLocalDeviceIds]);

  const isNext = useMemo(() => totalRegions === 5 && true, [totalRegions]);
  const isTotalStorage = useMemo(() => totalStorages === 4 && true, [totalStorages]);
  const isConnectStorages = useMemo(() => connectStorages, [connectStorages]);
  const continentStorageWithStart = useMemo(
    () => start && !continents.includes('south-america') && true,
    [start, continents]
  );
  const continentUsersWithStart = useMemo(() => start && users.includes('south-america'), [start, users]);
  const availabilityOfUsers = useMemo(() => availabilityOfUsersToContinent, [availabilityOfUsersToContinent]);

  useEffect(() => {
    if (start && !continents.includes('north-america')) {
      dispatch(updateLocalDeviceIds('south-america'));
    }
  }, [start, continents, dispatch]);

  useEffect(() => {
    const isUsersToContinentSouthAmerica = availabilityOfUsers.some(
      (continent) => continent.continent === 'southAmerica'
    );
    const isUsersToContinentNorthAmerica = availabilityOfUsers.some(
      (continent) => continent.continent === 'northAmerica'
    );

    if (
      (isTotalStorage || start) &&
      continents.includes('south-america') &&
      !continents.includes('north-america') &&
      isUsersToContinentNorthAmerica
    ) {
      dispatch(setLocalDistribution({ northAmerica: westAmericaLocalStorage.northAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('north-america') && isUsersToContinentNorthAmerica) {
      dispatch(setLocalDistribution({ northAmerica: westAmericaLocalStorage.northAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('north-america') && isUsersToContinentSouthAmerica) {
      dispatch(setLocalDistribution({ southAmerica: westAmericaLocalStorage.southAmerica }));
    }

    if ((isTotalStorage || start) && !continents.includes('north-america') && !isUsersToContinentNorthAmerica) {
      dispatch(setLocalDistribution({ southAmerica: westAmericaLocalStorage.southAmerica }));
    }

    if (
      (isTotalStorage || start) &&
      continents.includes('north-america') &&
      isUsersToContinentNorthAmerica &&
      isUsersToContinentSouthAmerica
    ) {
      dispatch(setLocalDistribution({ southAmerica: westAmericaLocalStorage.southAmerica }));
    }
  }, [isTotalStorage, westUsaImages, start, continents, dispatch]);

  useEffect(() => {
    globalDistribution === 'south-america'
      ? dispatch(setGlobalDistributionToContinents(westAmericaGlobalStorage))
      : null;
  }, [globalDistribution, dispatch]);

  const renderContent = () => {
    return (
      <>
        <SouthAmericaLoader />
        {isMans || isConnectStorages ? (
          <Devices filteredDevices={filteredDevices} position={southDevicePosition} />
        ) : (
          <Mans top="70%" left="32%" onHandleFilteredId={onHandleFiltered} />
        )}
      </>
    );
  };

  return (
    <div className={styles.southAmerica}>
      {(isNext || isConnectStorages) && !continentStorageWithStart && (
        <Storage
          alt={'south-america-storage'}
          stylesCircle={styles.circle}
          stylesStorage={styles.storage}
          continent="south-america"
        />
      )}

      {!continentStorageWithStart &&
        (isTotalStorage || continentUsersWithStart) &&
        westUsaImages.map((el, id) => {
          return (
            <div key={id}>
              <img src={el.src} alt={id.toString()} className={styles.southAmericaImages} />
            </div>
          );
        })}

      {renderContent()}
    </div>
  );
};
