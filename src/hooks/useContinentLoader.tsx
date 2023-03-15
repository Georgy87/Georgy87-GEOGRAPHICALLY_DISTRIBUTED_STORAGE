import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLocalsLatensy, selectRerenderedGlobalDistribution } from '@/selectors/continents';
import { setTimeoutsCounter } from '@/slices/continentsSlice';
import { AppDispatch } from '@/store/store';

interface Props {
  continent: string;
}

export const useContinentLoader = ({ continent }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const delays = useSelector(selectLocalsLatensy);
  const rerenderedGlobalDistribution = useSelector(selectRerenderedGlobalDistribution);

  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  const delay = useMemo(() => {
    if (rerenderedGlobalDistribution.length) {
      //@ts-ignore
      return rerenderedGlobalDistribution.find((latency: { [key: string]: number }) => continent in latency)?.[
        continent
      ];
    }
    //@ts-ignore
    return delays.find((latency: { [key: string]: number }) => continent in latency)?.[continent];
  }, [continent, delays, rerenderedGlobalDistribution]);

  useEffect(() => {
    if (!delay) return;

    const d: number = delay * 50;

    const timer = setTimeout(() => {
      dispatch(setTimeoutsCounter({ counter: 1, delay: delay }));
      setTime(delay * 1000);
      setLoading(false);
    }, d);

    if (loading === false) {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [delay, loading, dispatch]);

  return {
    loading,
    delay,
    time,
  };
};
