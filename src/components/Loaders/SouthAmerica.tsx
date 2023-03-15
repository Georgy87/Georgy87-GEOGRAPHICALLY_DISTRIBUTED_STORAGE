import { useContinentLoader } from '@/hooks/useContinentLoader';
import { Progressbar } from '../ProgressBar/ProgressBar';

import style from './Loader.module.scss';

export const SouthAmericaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'southAmerica' });
  return (
    <div className={style.southAmericaLoader}>
      <Progressbar delay={delay} continent="southAmerica" />
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};
