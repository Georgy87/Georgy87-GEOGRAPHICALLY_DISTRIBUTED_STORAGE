import circleEmpty from '../assets/circle_empty.png';
import circleFilled from '../assets/circle_filled.png';

export type Circles = {
  emptySrc: string;
  filledSrc: string;
};

export const circles: Circles = {
  emptySrc: circleEmpty.src,
  filledSrc: circleFilled.src,
};
