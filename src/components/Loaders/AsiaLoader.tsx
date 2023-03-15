import { useContinentLoader } from '@/hooks/useContinentLoader';
import { Progressbar } from '../ProgressBar/ProgressBar';

import style from './Loader.module.scss';

export const AsiaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'asia' });
  return (
    <div className={style.asiaLoader}>
      <Progressbar delay={delay} continent='asia' />
      <p>{delay && !loading && `Latency: ${delay}`}</p>
    </div>
  );
};
