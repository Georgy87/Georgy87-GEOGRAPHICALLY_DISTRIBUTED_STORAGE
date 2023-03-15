import { useContinentLoader } from '@/hooks/useContinentLoader';

import style from './Loader.module.scss';

export const NorthAmericaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'northAmerica' });
  return (
    <div className={style.northAmericaLoader}>
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};
