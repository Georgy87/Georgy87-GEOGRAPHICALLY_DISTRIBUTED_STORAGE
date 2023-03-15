import { useContinentLoader } from '@/hooks/useContinentLoader';

import style from './Loader.module.scss';

export const OceaniaLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'oceania' });
  return (
    <div className={style.oceaniaLoader}>
      <p>{delay && !loading ? `Latency: ${delay}` : null}</p>
    </div>
  );
};
