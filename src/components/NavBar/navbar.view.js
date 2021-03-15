import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = ({ profileClicked }) => (
  <ul className={styles.buttons}>
    <li>
      <Link to="/">Tasks</Link>
    </li>
    <li>
      <Link to="/collections">Collections</Link>
    </li>
    <DropdownButton id="dropdown-basic-button" title="..." className={styles.menuButton}>
      <Dropdown.Item onClick={profileClicked}>Profile</Dropdown.Item>
      <Link to="/userpage">Logout</Link>
    </DropdownButton>
    <li className={styles.user}>Ernesto</li>
    <li className={styles.searchBar}>
      <input type="text" />
    </li>
  </ul>
);

export default NavBar;
