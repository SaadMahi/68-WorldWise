import React from 'react';
import SideBar from '../../components/side-bar/SideBar';
import styles from './AppLayout.module.css';
import Map from '../../components/map/map';
import User from '../../components/user/User';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
