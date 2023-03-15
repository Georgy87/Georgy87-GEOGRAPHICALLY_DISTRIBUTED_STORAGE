import { useContinentLoader } from '@/hooks/useContinentLoader';
import { Progressbar } from '../ProgressBar/ProgressBar';

import style from './Loader.module.scss';

export const OceaniaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'oceania' });
  return (
    <div className={style.oceaniaLoader}>
        <Progressbar delay={delay} continent='oceania' />
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};
