import manEmpty from '../assets/man_empty.png';
import manFilled from '../assets/man_filled.png';
import { Mans } from './types';

export const mans: Readonly<Mans[]> = [
  {
    src: manEmpty.src,
    hoverSrc: manFilled.src,
    size: 'small',
    alt: 'man-sm',
  },
  {
    src: manEmpty.src,
    hoverSrc: manFilled.src,
    size: 'medium',
    alt: 'man-md',
  },
  {
    src: manEmpty.src,
    hoverSrc: manFilled.src,
    size: 'large',
    alt: 'man-lg',
  },
];
