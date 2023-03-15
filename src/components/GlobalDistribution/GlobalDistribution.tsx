import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBiteCloud,
  selectGlobalDistributionToUsers,
  selectIsStart,
  selectRerenderedGlobalDistribution,
  selectSetTimeoutCounter,
  selectTotalRegions,
  selectTotalStorages,
  selectUsers,
} from '@/selectors/continents';
import { setGlobalDistributionToUsers, setTimeoutsCounter } from '@/slices/continentsSlice';
import { AppDispatch } from '@/store/store';
import { Tables } from '../Tables/Tables';
import map from '../../assets/map.png';

import styles from './GlobalDistribution.module.scss';
import { GlobalStorage } from '@/constants/types';

export const GlobalDistribution = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { start } = useSelector(selectIsStart);
  const totalRegions = useSelector(selectTotalRegions);
  const totalStorages = useSelector(selectTotalStorages);
  const globalDistributionToUsers = useSelector(selectGlobalDistributionToUsers);
  const isGlobalDistribution = useSelector(selectSetTimeoutCounter);
  const rerenderedGlobalDistribution = useSelector(selectRerenderedGlobalDistribution);
  
  const isTotalStorage = useMemo(() => totalStorages === 4 && true, [totalStorages]);

  const isStartGlobalDistribution = useMemo(() => {
    return totalRegions === isGlobalDistribution.counter && true;
  }, [totalRegions, isGlobalDistribution]);

  const isModal = useMemo(() => {
    return (
      isGlobalDistribution.counter === rerenderedGlobalDistribution.length && rerenderedGlobalDistribution.length > 0
    );
  }, [isGlobalDistribution, totalRegions, rerenderedGlobalDistribution]);

  useEffect(() => {
    if ((start || isTotalStorage) && isStartGlobalDistribution) {
      dispatch(setGlobalDistributionToUsers());
    }
  }, [isStartGlobalDistribution, start, isGlobalDistribution, isTotalStorage, dispatch]);

  const globalDistributionToUsersImages = useMemo(() => {
    return globalDistributionToUsers;
  }, [globalDistributionToUsers]);

  return (
    <>
      <img src={map.src} alt="map" className={styles.map} />
      <div className={styles.globalDistribution}>
        {globalDistributionToUsersImages.map((image: GlobalStorage, id) => {
          return (
            <div key={image.src}>
              <img src={image.src} alt={image.src} className={styles.globalImages} />
            </div>
          );
        })}
        {isModal ? <Tables /> : null}
      </div>
    </>
  );
};
