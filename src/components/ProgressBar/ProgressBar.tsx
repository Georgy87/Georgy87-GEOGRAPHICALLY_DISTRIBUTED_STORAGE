import React, { useState, useEffect, FC } from 'react';

import styles from './ProgressBar.module.scss';

type PropsType = {
  delay: number;
  continent: string;
};

export const Progressbar: FC<PropsType> = ({ delay, continent }) => {
  const [filled, setFilled] = useState<number>(0);

  useEffect(() => {
    if (filled < 100 && delay) {
      setTimeout(() => setFilled((prev) => (prev += 2)), delay);
    }
  }, [filled, delay]);
  return (
    <div>
      <div className={`${styles.progressPercent} ${styles[continent]}`}>
        <div
          style={{
            height: '7px',
            width: `${filled}%`,
            backgroundColor: '#e89933',
            transition: 'width 0.5s',
            borderRadius: '10px',
          }}
        ></div>
      </div>
    </div>
  );
};
