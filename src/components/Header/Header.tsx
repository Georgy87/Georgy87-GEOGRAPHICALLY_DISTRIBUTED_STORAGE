import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTotalRegions, selectTotalStorages } from '@/selectors/continents';
import { setIsConnectStorages, setIsStart } from '@/slices/continentsSlice';
import { AppDispatch } from '@/store/store';

import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const totalRegions = useSelector(selectTotalRegions);
  const totalStorages = useSelector(selectTotalStorages);
  const [isHeaderOff, setIsHeaderOff] = useState<boolean>(false);

  const [nextSubmit, setTotalRegionsSubmit] = useState<boolean>(false);

  const [isNextHeader, isShowBtnNext] = useMemo(() => {
    const next = !nextSubmit && totalRegions !== 5;
    const showBtn = totalRegions >= 1;
    return [next, showBtn];
  }, [totalRegions, nextSubmit]);

  const [isStart, isStartDisabled] = useMemo(() => {
    const start = totalStorages >= 1 && true;
    const startDisabled = totalStorages >= 3 ? false : true;
    return [start, startDisabled];
  }, [totalStorages]);

  const isHeader = useMemo(() => {
    return isHeaderOff;
  }, [isHeaderOff]);

  if (isHeader) return null;

  return (
    <header className={styles.header}>
      <div className={styles.headerBlock}>
        {isNextHeader ? (
          <>
            <h1>Where are your users? Choose the number for every region.</h1>

            {isNextHeader && isShowBtnNext ? (
              <button
                className={styles.headerBtnNext}
                onClick={() => {
                  setTotalRegionsSubmit(true);
                  dispatch(setIsConnectStorages());
                }}
              >
                next
              </button>
            ) : null}
          </>
        ) : (
          <>
            <h1>Where is your data? Choose one spot for Object Storage system</h1>
            {isStart && (
              <button
                disabled={isStartDisabled}
                className={styles.headerBtnStart}
                onClick={() => {
                  dispatch(setIsStart());
                  setIsHeaderOff(true);
                }}
              >
                start
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
