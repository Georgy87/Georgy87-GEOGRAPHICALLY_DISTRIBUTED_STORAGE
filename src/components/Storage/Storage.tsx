import Image from 'next/image';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHover } from '@/hooks/useHover';
import { circles } from '@/constants/circle';
import { storages } from '@/constants/storages';
import { AppDispatch } from '@/store/store';
import { setObjectStorage, setTotalStorages } from '@/slices/continentsSlice';
import { selectIsObjectStorage, selectTotalRegions } from '@/selectors/continents';

type PropsType = {
  stylesCircle: string;
  stylesStorage: string;
  alt: string;
  continent: string;
};

export const Storage: FC<PropsType> = ({ alt, stylesCircle, stylesStorage, continent }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isHovered, isStorage, setIsStorage, handleMouseEnter, handleMouseLeave } = useHover();

  const isObjectStorage = useSelector(selectIsObjectStorage);

  const onStorageSelection = () => {
    dispatch(setObjectStorage({ componentName: continent }));
  };

  const renderStorage = () => {
    return (
      <>
        {isObjectStorage !== continent ? (
          <div className={stylesStorage}>
            <img src={storages.byteCloud.src} alt={alt} />
          </div>
        ) : (
          <div className={stylesStorage}>
            <img src={storages.objectStorage.src} alt={alt} />
          </div>
        )}
      </>
    );
  };

  const renderCircles = () => {
    return (
      <>
        {isHovered ? (
          <div className={stylesCircle}>
            <Image
              src={circles.filledSrc}
              alt="circle-fill"
              width={50}
              height={50}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setIsStorage(true);
                onStorageSelection();
                dispatch(setTotalStorages({ count: 1, continent }));
              }}
            />
          </div>
        ) : (
          <div className={stylesCircle} onMouseEnter={handleMouseEnter}>
            <Image src={circles.emptySrc} alt="circle-empty" width={50} height={50} />
          </div>
        )}
      </>
    );
  };

  return <>{isStorage ? renderStorage() : renderCircles()}</>;
};
