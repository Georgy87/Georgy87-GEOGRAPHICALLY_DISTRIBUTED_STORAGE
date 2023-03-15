import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { devicesEurope, europeDevicePosition } from '@constants/devices';
import { GlobalStorage, TDevices } from '@constants/types';
import { Mans } from '@components/Mans/Mans';
import { Devices } from '@components/Devices/Devices';
import { AppDispatch } from '@/store/store';
import {
  setEuropeLocalDeviceIds,
  setGlobalDistributionToContinents,
  setLocalDistribution,
  setTotalRegions,
} from '@/slices/continentsSlice';
import {
  selectEuropeLocalDeviceIds,
  selectIsConnectStorages,
  selectIsObjectStorage,
  selectIsStart,
  selectTotalRegions,
  selectTotalStorages,
} from '@/selectors/continents';
import { germanyGlobalStorage } from '@/constants/storageLines';
import { Storage } from '../Storage/Storage';
import { europeGlobalStorage, europeLocalStorage } from '@/constants/storages';
import { EuropeLoader } from '../Loaders/EuropeLoader';

import styles from './Europe.module.scss';

export const Europe = () => {
  const dispatch = useDispatch<AppDispatch>();

  const totalStorages = useSelector(selectTotalStorages);
  const totalRegions = useSelector(selectTotalRegions);
  const europeLocalDeviceIds = useSelector(selectEuropeLocalDeviceIds);
  const connectStorages = useSelector(selectIsConnectStorages);
  const { start, continents, users, availabilityOfUsersToContinent } = useSelector(selectIsStart);
  const globalDistribution = useSelector(selectIsObjectStorage);

  const [filteredDevices, setFilteredDevices] = useState<TDevices[] | null>(null);
  const [isMans, setIsMans] = useState<boolean>(false);

  const isTotalRegions = useMemo(() => totalRegions === 5 && true, [totalRegions]);
  const isTotalStorage = useMemo(() => totalStorages === 4 && true, [totalStorages]);
  const isConnectStorages = useMemo(() => connectStorages, [connectStorages]);
  const continentStorageWithStart = useMemo(() => start && !continents.includes('europe') && true, [start, continents]);
  const continentUsersWithStart = useMemo(() => start && users.includes('europe'), [start, users]);
  const isUsersToEurope = useMemo(
    () => availabilityOfUsersToContinent.some((continent) => continent.continent === 'europe'),
    [availabilityOfUsersToContinent]
  );

  const europeImages = useMemo(() => {
    const result = germanyGlobalStorage.filter((elem: GlobalStorage) => {
      return europeLocalDeviceIds.includes(elem.id);
    });
    return result;
  }, [europeLocalDeviceIds]);

  const onHandleFiltered = useCallback(
    (idx: number) => {
      setFilteredDevices(devicesEurope.filter((el: TDevices, id: number) => id <= idx));
      setIsMans(!isMans);

      if (continentStorageWithStart) {
        dispatch(setTotalRegions(1));
      }
    },
    [continentStorageWithStart, isMans, dispatch]
  );

  useEffect(() => {
    const deviceIds = filteredDevices?.map((el: TDevices) => el.alt);

    if (!deviceIds) return;
    if (continents.includes('europe')) {
      dispatch(setEuropeLocalDeviceIds(deviceIds));
    }
  }, [filteredDevices, continents, dispatch]);

  useEffect(() => {
    if (continentStorageWithStart) return;
    (isTotalStorage || start) && europeImages.length && isUsersToEurope
      ? dispatch(setLocalDistribution({ europe: europeLocalStorage.europe }))
      : null;
  }, [isTotalStorage, europeImages, start, continents, isUsersToEurope, continentStorageWithStart, dispatch]);

  useEffect(() => {
    globalDistribution === 'europe' ? dispatch(setGlobalDistributionToContinents(europeGlobalStorage)) : null;
  }, [globalDistribution, dispatch]);

  const renderContent = () => {
    if (continentStorageWithStart) return null;
    return (
      <>
        <EuropeLoader />
        {isMans || isConnectStorages ? (
          <Devices filteredDevices={filteredDevices} position={europeDevicePosition} />
        ) : (
          <Mans top="35%" right="40%" onHandleFilteredId={onHandleFiltered} />
        )}
      </>
    );
  };

  return (
    <div className={styles.europe}>
      {(isTotalRegions || isConnectStorages) && !continentStorageWithStart && (
        <Storage
          alt={'europe-storage'}
          stylesCircle={styles.circle}
          stylesStorage={styles.storage}
          continent="europe"
        />
      )}

      {!continentStorageWithStart &&
        (isTotalStorage || continentUsersWithStart) &&
        europeImages.map((el, id) => {
          return (
            <div key={id.toString()}>
              <img src={el.src} alt={id.toString()} className={styles.europeImages} />
            </div>
          );
        })}
      {renderContent()}
    </div>
  );
};
