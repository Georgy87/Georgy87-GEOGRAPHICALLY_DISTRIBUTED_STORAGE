export type Mans = {
  src: string;
  hoverSrc: string;
  size: 'small' | 'medium' | 'large';
  alt: string;
};

export type TDevices = {
  src: string;
  alt: string;
  height: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
};

export type GlobalStorage = {
  src: string;
  id: string;
}

export type DevicePosition = {
  top?: string;
  right?: string;
  left?: string;
  botoom?: string;
}