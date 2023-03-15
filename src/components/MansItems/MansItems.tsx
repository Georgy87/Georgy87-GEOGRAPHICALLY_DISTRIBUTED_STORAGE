import React, { useState, FC, useMemo } from 'react';

type PropsType = {
  src: string;
  alt?: string;
  hoverSrc?: string;
  size: string;
  id: number;
  onHandleFilteredId(idx: number): void;
};
export const MansItem: FC<PropsType> = ({ src, alt = '', hoverSrc, size, id, onHandleFilteredId }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageSize = useMemo(() => {
    let imgSize: string;
    switch (size) {
      case 'small':
        imgSize = '20px';
        break;
      case 'medium':
        imgSize = '30px';
        break;
      case 'large':
        imgSize = '40px';
        break;
      default:
        imgSize = '200px';
    }
    return imgSize;
  }, [size]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() =>  onHandleFilteredId(id)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <img src={isHovered && hoverSrc ? hoverSrc : src} alt={alt} style={{ width: '15px', height: imageSize }} />
    </div>
  );
};
