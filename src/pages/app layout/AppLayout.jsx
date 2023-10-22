import React from 'react';
import SideBar from '../../components/side bar/SideBar';
import styles from './AppLayout.module.css';
import Map from '../../components/map/map';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
