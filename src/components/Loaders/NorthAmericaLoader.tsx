import { useContinentLoader } from '@/hooks/useContinentLoader';
import { Progressbar } from '../ProgressBar/ProgressBar';

import style from './Loader.module.scss';

export const NorthAmericaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'northAmerica' });
  return (
    <div className={style.northAmericaLoader}>
      <Progressbar delay={delay} continent="northAmerica" />
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};
