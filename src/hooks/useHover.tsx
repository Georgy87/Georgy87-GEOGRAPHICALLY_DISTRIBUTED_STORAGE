import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { useState } from 'react';

type UseHover = {
  isHovered: boolean;
  isStorage: boolean;
  handleMouseEnter(): void;
  handleMouseLeave(): void;
  setIsStorage: Dispatch<SetStateAction<boolean>>;
};

export const useHover = (): UseHover => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isStorage, setIsStorage] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isHovered,
    isStorage,
    handleMouseEnter,
    handleMouseLeave,
    setIsStorage,
  };
};
