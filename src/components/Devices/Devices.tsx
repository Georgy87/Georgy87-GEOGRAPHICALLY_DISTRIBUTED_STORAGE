import { FC } from 'react';

import { DevicePosition, TDevices } from '@constants/types';

import styles from './Devices.module.scss';

type PropsType = {
  position: DevicePosition;
  filteredDevices: TDevices[] | null;
};

export const Devices: FC<PropsType> = ({ filteredDevices, position }) => {
  return (
    <div className={styles.devicesContainer} style={position}>
      {filteredDevices &&
        filteredDevices.map((device: TDevices, index: number) => {
          const { top, left, right, bottom } = device;
          return (
            <div key={index}>
              <img
                src={device.src}
                alt={device.alt}
                style={{ position: 'absolute', top, left, right, bottom, width: device.width, height: device.height }}
              />
            </div>
          );
        })}
    </div>
  );
};
