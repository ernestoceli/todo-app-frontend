import React from 'react';
import styles from './navbar.module.css';

const NavBar = () => (
  <ul className={styles.buttons}>
    <li>Tasks</li>
    <li>Collections</li>
    <li className={styles.menuButton}>...</li>
    <li className={styles.user}>Ernesto</li>
    <li className={styles.searchBar}>
      <input type="text" />
    </li>
  </ul>
);

export default NavBar;
