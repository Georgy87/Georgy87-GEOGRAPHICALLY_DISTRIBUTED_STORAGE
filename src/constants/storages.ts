import serverByteCloud from '../assets/server_ByteCloud.png';
import objectStorage from '../assets/server.png';

export type Storages = {
  objectStorage: {
    src: string;
  };
  byteCloud: {
    src: string;
  };
};

export const storages: Storages = {
  objectStorage: {
    src: objectStorage.src,
  },
  byteCloud: {
    src: serverByteCloud.src,
  },
};

export const indonesiaLocalStorage = {
  asia: 50,
  oceania: 30,
};

export const indonesiaGlobalStorage = [
  { asia: 50 },
  { oceania: 30 },
  { northAmerica: 200 },
  { southAmerica: 170 },
  { europe: 150 },
];

export const europeLocalStorage = {
  europe: 30,
};

export const europeGlobalStorage = [
  { europe: 30 },
  { northAmerica: 100 },
  { southAmerica: 120 },
  { asia: 150 },
  { oceania: 220 },
];

export const eastAmericaLocalStorage = {
  northAmerica: 23,
  southAmerica: 53,
};

export const eastAmericaGlobalStorage = [
  { northAmerica: 23 },
  { southAmerica: 53 },
  { europe: 100 },
  { asia: 150 },
  { oceania: 180 },
];

export const westAmericaLocalStorage = {
  northAmerica: 30,
  southAmerica: 40,
};

export const westAmericaGlobalStorage = [
  { northAmerica: 50 },
  { southAmerica: 40 },
  { europe: 150 },
  { asia: 180 },
  { oceania: 200 },
];

