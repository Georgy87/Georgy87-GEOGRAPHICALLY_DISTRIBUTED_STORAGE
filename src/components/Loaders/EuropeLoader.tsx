import { useContinentLoader } from '@/hooks/useContinentLoader';
import { Progressbar } from '../ProgressBar/ProgressBar';

import style from './Loader.module.scss';

type PropsType = {
  latency: number;
};

export const EuropeLoader = () => {
  const { delay, loading } = useContinentLoader({ continent: 'europe' });
  return (
    <div className={style.europeLoader}>
      <Progressbar delay={delay} continent="europe" />
      <p>{delay && !loading && `Latency: ${delay}`}</p>
    </div>
  );
};
