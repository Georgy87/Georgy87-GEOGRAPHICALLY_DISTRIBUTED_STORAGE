import { useContinentLoader } from '@/hooks/useContinentLoader';

import style from './Loader.module.scss';

export const SouthAmericaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'southAmerica' });
  return (
    <div className={style.southAmericaLoader}>
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};

