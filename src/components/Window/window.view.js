import React from 'react';
import NavBar from '../NavBar/navbar.view';
import SideBar from '../SideBar/sidebar.view';
import TaskList from '../TaskList/tasklist.view';
import styles from './window.module.css';

const Window = () => (
  <div className={styles.main}>
    <NavBar />
    <div className={styles.row}>
      <SideBar />
      <TaskList />
    </div>
  </div>
);

export default Window;
