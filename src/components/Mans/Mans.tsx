import { FC } from 'react';

import { mans } from '@constants/mans';
import { MansItem } from '@components/MansItems/MansItems';

import styles from './Mans.module.scss';

type PropsType = {
  top: string;
  left?: string;
  right?: string;
  onHandleFilteredId(idx: number): void;
};

export const Mans: FC<PropsType> = ({ top, left, right, onHandleFilteredId }) => {
  return (
    <div className={styles.mansContainer} style={{ top, left, right }}>
      {mans.map((man, id) => {
        const { src, alt, hoverSrc, size } = man;
        return (
          <MansItem
            key={alt}
            id={id}
            src={src}
            alt={alt}
            hoverSrc={hoverSrc}
            size={size}
            onHandleFilteredId={onHandleFilteredId}
          />
        );
      })}
    </div>
  );
};
