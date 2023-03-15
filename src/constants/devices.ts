import laptop from '../assets/small.png';
import tablet from '../assets/medium.png';
import phone from '../assets/large.png';
import { DevicePosition, TDevices } from './types';

export const devicesNorthAmerica = [
  {
    src: laptop.src,
    alt: 'north-america-laptop',
    height: '50px',
    top: '40%',
    left: '27%',
  },
  {
    src: tablet.src,
    alt: 'north-america-tablet',
    height: '50px',
    top: '42%',
    left: '23%',
  },
  {
    src: phone.src,
    alt: 'north-america-phone',
    height: '50px',
    top: '40%',
    left: '20%',
  },
];

export const devicesSouthAmerica = [
  {
    src: laptop.src,
    alt: 'south-america-laptop',
    width: '40px',
    height: '50px',
    bottom: '25%',
    left: '34%',
  },
  {
    src: tablet.src,
    alt: 'south-america-tablet',
    height: '50px',
    bottom: '15%',
    left: '33%',
  },
  {
    src: phone.src,
    alt: 'south-america-phone',
    // width: '40px',
    height: '50px',
    bottom: '29%',
    left: '30%',
  },
];

export const devicesEurope: TDevices[] = [
  {
    src: tablet.src,
    alt: 'europe-tablet',
    height: '40px',
    top: '43%',
    left: '46%',
  },
  {
    src: phone.src,
    alt: 'europe-phone',
    height: '40px',
    top: '34%',
    left: '57%',
  },
  {
    src: laptop.src,
    alt: 'europe-laptop',
    height: '40px',
    top: '38%',
    left: '52%',
  },
];

export const devicesOceania: TDevices[] = [
  {
    src: laptop.src,
    alt: 'oceania-laptop',
    height: '50px',
    bottom: '14%',
    right: '22%',
  },
  {
    src: tablet.src,
    alt: 'oceania-tablet',
    height: '50px',
    bottom: '14%',
    right: '15%',
  },
  {
    src: phone.src,
    alt: 'oceania-phone',
    height: '50px',
    bottom: '14%',
    right: '19%',
  },
];

export const devicesAsia: TDevices[] = [
  {
    src: laptop.src,
    alt: 'asia-laptop',
    height: '50px',
    top: '50%',
    right: '24%',
  },
  {
    src: tablet.src,
    alt: 'asia-tablet',
    height: '50px',
    top: '54%',
    right: '32%',
  },
  {
    src: phone.src,
    alt: 'asia-phone',
    height: '50px',
    top: '42%',
    right: '20%',
  },
];

export const asiaDevicePosition: DevicePosition = {
  top: '35%',
  right: '15%',
};

export const europeDevicePosition: DevicePosition = {
  top: '35%',
  right: '35%',
};

export const northDevicePosition: DevicePosition = {
  top: '37%',
  left: '17%',
};

export const southDevicePosition: DevicePosition = {
  top: '70%',
  left: '32%',
};

export const oceaniaPosition: DevicePosition = {
  top: '75%',
  right: '18%',
};
