import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { selectBiteCloud, selectRerenderedGlobalDistribution, selectUsers } from '@/selectors/continents';
import { getDataForTable } from '@/utils/getDataForTables';
import { Table } from '@/components//Table/Table';

import styles from './Tables.module.scss';

export const Tables = () => {
  const users = useSelector(selectUsers);
  const globalDistribution = useSelector(selectRerenderedGlobalDistribution);
  const localDistribution = useSelector(selectBiteCloud);

  const { byteCloud, objectStorage } = useMemo(
    () => getDataForTable(users, localDistribution, globalDistribution),
    [globalDistribution, localDistribution, users]
  );
  
  return (
    <div className={styles.table}>
      <div className={styles.tableContainer}>
        <div className={styles.biteCloud}>
          <h1>Byte cloud</h1>
          {byteCloud.map((el: any, idx: number) => (
            <div className={styles.tables} key={idx}>
              <Table data={el} />
            </div>
          ))}
        </div>
        <div className={styles.objectStorage}>
          <h1>Object storage</h1>
          {objectStorage.map((el: any, idx: number) => (
            <div className={styles.tables} key={idx}>
              <Table data={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
