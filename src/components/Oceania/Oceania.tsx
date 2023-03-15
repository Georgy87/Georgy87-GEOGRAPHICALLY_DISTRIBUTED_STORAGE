import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { devicesOceania, oceaniaPosition } from '@/constants/devices';
import { TDevices } from '@/constants/types';
import { Mans } from '@/components/Mans/Mans';
import { Devices } from '@/components/Devices/Devices';
import { AppDispatch } from '@/store/store';
import { setTotalRegions, setOceaniaAsiaLocalDeviceIds } from '@/slices/continentsSlice';
import { selectIsConnectStorages, selectIsStart, selectLocalsLatensy } from '@/selectors/continents';
import { OceaniaLoader } from '../Loaders/OceaniaLoader';

import styles from './Oceania.module.scss';

export const Oceania = () => {
  const dispatch = useDispatch<AppDispatch>();

  const connectStorages = useSelector(selectIsConnectStorages);
  const { start, continents } = useSelector(selectIsStart);

  const [filteredDevices, setFilteredDevices] = useState<TDevices[] | null>(null);
  const [isMans, setIsMans] = useState<boolean>(false);

  const continentStorageWithStart = useMemo(() => start && !continents.includes('asia') && true, [start, continents]);

  const onHandleFiltered = useCallback((idx: number) => {
    setFilteredDevices(devicesOceania.filter((el: TDevices, id: number) => id <= idx));
    setIsMans(!isMans);
    // if (continentStorageWithStart) {
      dispatch(setTotalRegions(1));
    // }
  }, [continentStorageWithStart, isMans, dispatch]);

  useEffect(() => {
    const deviceIds = filteredDevices?.map((el: TDevices) => el.alt);
    if (!deviceIds) return;
    // if (continents.includes('oceania')) { 
      dispatch(setOceaniaAsiaLocalDeviceIds({ devices: deviceIds, continent: 'oceania' }));
    // }
  }, [filteredDevices, continents, dispatch]);

 
  const isConnectStorages = useMemo(() => connectStorages, [connectStorages]);

  if (continentStorageWithStart) return null;

  return (
    <div className={styles.oceania}>
      <OceaniaLoader />
      {isMans || isConnectStorages ? (
        <Devices filteredDevices={filteredDevices} position={oceaniaPosition} />
      ) : (
        <Mans top="75%" right="18%" onHandleFilteredId={onHandleFiltered} />
      )}
    </div>
  );
};
