import React from 'react';
import styles from './Sidebar.module.css';
import Logo from '../logo/Logo';
import { Outlet } from 'react-router-dom';
import AppNav from '../app-nav/AppNav';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />

      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default SideBar;
