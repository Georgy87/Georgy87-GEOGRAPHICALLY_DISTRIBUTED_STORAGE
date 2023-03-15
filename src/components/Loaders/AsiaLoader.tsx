import { useContinentLoader } from '@/hooks/useContinentLoader';

import style from './Loader.module.scss';

export const AsiaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'asia' });
  return (
    <div className={style.asiaLoader}>
      <p>{delay && !loading && `Latency: ${delay}`}</p>
    </div>
  );
};
