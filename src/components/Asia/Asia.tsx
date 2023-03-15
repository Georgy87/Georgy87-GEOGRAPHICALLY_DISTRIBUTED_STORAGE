import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Mans } from '@components/Mans/Mans';
import { asiaDevicePosition, devicesAsia } from '@constants/devices';
import { GlobalStorage, TDevices } from '@constants/types';
import { Devices } from '@components/Devices/Devices';
import { AppDispatch } from '@/store/store';
import {
  setTotalRegions,
  setOceaniaAsiaLocalDeviceIds,
  setGlobalDistributionToContinents,
  setLocalDistribution,
} from '@/slices/continentsSlice';
import { singaporeUsaGlobalStorage } from '@/constants/storageLines';
import {
  selectIsConnectStorages,
  selectIsObjectStorage,
  selectIsStart,
  selectOceaniaAsiaLocalDeviceIds,
  selectTotalRegions,
  selectTotalStorages,
} from '@/selectors/continents';
import { Storage } from '../Storage/Storage';
import { AsiaLoader } from '../Loaders/AsiaLoader';
import { indonesiaGlobalStorage, indonesiaLocalStorage } from '@/constants/storages';

import styles from './Asia.module.scss';

export const Asia = () => {
  const dispatch = useDispatch<AppDispatch>();

  const totalStorages = useSelector(selectTotalStorages);
  const totalRegions = useSelector(selectTotalRegions);
  const asiaLocalDeviceIds = useSelector(selectOceaniaAsiaLocalDeviceIds);
  const connectStorages = useSelector(selectIsConnectStorages);
  const { start, continents, users, availabilityOfUsersToContinent } = useSelector(selectIsStart);
  const globalDistribution = useSelector(selectIsObjectStorage);

  const [filteredDevices, setFilteredDevices] = useState<TDevices[] | null>(null);
  const [isMans, setIsMans] = useState<boolean>(false);

  const isTotalRegions = useMemo(() => totalRegions === 5 && true, [totalRegions]);
  const isTotalStorage = useMemo(() => totalStorages === 4 && true, [totalStorages]);
  const isConnectStorages = useMemo(() => connectStorages, [connectStorages]);
  const continentStorageWithStart = useMemo(() => start && !continents.includes('asia') && true, [start, continents]);
  const { isUsersToAsia, isUsersToOceania } = useMemo(() => {
    return {
      isUsersToAsia: availabilityOfUsersToContinent.some((continent) => continent.continent === 'asia'),
      isUsersToOceania: availabilityOfUsersToContinent.some((continent) => continent.continent === 'oceania'),
    };
  }, [availabilityOfUsersToContinent]);
  const continentUsersWithStart = useMemo(() => start && users.includes('asia'), [start, users]);

  const singaporeImages = useMemo(() => {
    const result = singaporeUsaGlobalStorage.filter((elem: GlobalStorage) => {
      return asiaLocalDeviceIds.includes(elem.id);
    });
    return result;
  }, [asiaLocalDeviceIds]);

  const onHandleFiltered = useCallback(
    (idx: number) => {
      setFilteredDevices(devicesAsia.filter((el: TDevices, id: number) => id <= idx));
      setIsMans(!isMans);

      dispatch(setTotalRegions(1));
    },
    [continentStorageWithStart, isMans, dispatch]
  );

  useEffect(() => {
    const deviceIds = filteredDevices?.map((el: TDevices) => el.alt);
    if (!deviceIds) return;
    dispatch(setOceaniaAsiaLocalDeviceIds({ devices: deviceIds, continent: 'asia' }));
  }, [filteredDevices, continentStorageWithStart, continents, dispatch]);

  useEffect(() => {
    globalDistribution === 'asia' ? dispatch(setGlobalDistributionToContinents(indonesiaGlobalStorage)) : null;
  }, [globalDistribution, dispatch]);

  useEffect(() => {
    if (continentStorageWithStart) return;
    (isTotalStorage || start) && isUsersToAsia
      ? dispatch(setLocalDistribution({ asia: indonesiaLocalStorage.asia }))
      : null;

    isUsersToOceania && (isTotalStorage || start) && singaporeImages.length && continents.includes('asia')
      ? dispatch(setLocalDistribution({ oceania: indonesiaLocalStorage.oceania }))
      : null;
  }, [
    isTotalStorage,
    singaporeImages,
    isUsersToOceania,
    isUsersToAsia,
    start,
    continentStorageWithStart,
    continents,
    dispatch,
  ]);

  const renderContent = () => {
    if (continentStorageWithStart) return null;
    return (
      <>
        <AsiaLoader />
        {isMans || isConnectStorages ? (
          <Devices filteredDevices={filteredDevices} position={asiaDevicePosition} />
        ) : (
          <Mans top="35%" right="20%" onHandleFilteredId={onHandleFiltered} />
        )}
      </>
    );
  };

  return (
    <div className={styles.asia}>
      {(isTotalRegions || isConnectStorages) && !continentStorageWithStart && (
        <Storage alt={'asia-storage'} stylesCircle={styles.circle} stylesStorage={styles.storage} continent="asia" />
      )}
      {!continentStorageWithStart &&
        (isTotalStorage || continentUsersWithStart) &&
        singaporeImages.map((image, id) => {
          return (
            <div key={id.toString()}>
              <img src={image.src} alt={id.toString()} className={styles.asiaImages} />
            </div>
          );
        })}
      {renderContent()}
    </div>
  );
};
