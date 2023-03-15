import { useContinentLoader } from '@/hooks/useContinentLoader';

import style from './Loader.module.scss';

type PropsType = {
  latency: number;
};

export const EuropeLoader = () => {
  const { delay, loading, time } = useContinentLoader({ continent: 'europe' });
  return (
      <div className={style.europeLoader}>
        <p>{delay && !loading && `Latency: ${delay}`}</p>
      </div>
  );
};
