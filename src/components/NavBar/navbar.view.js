import React from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = ({ profileClicked }) => (
  <div className={styles.navBarBody}>
    <Link to="/" className={styles.navigationButton}>
      <span>
        <FontAwesomeIcon icon="tasks" />
      </span>{' '}
      Tasks
    </Link>

    <Link to="/collections" className={styles.navigationButton}>
      <span>
        <FontAwesomeIcon icon="layer-group" />
      </span>{' '}
      Collections
    </Link>

    <input type="text" className={styles.searchBar} />

    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle className={styles.menuButton}>
        Ernesto{' '}
        <span>
          <div className={styles.userIcon}>E</div>
        </span>
        <span>
          <FontAwesomeIcon icon="ellipsis-v" size="xs" className={styles.ellipsis} />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropDownMenu}>
        <Dropdown.Item onClick={profileClicked} className={styles.dropDownItem}>
          <span>
            <FontAwesomeIcon icon="user" />
          </span>{' '}
          Profile
        </Dropdown.Item>
        <Link to="/userpage" className={styles.dropDownItem}>
          <span>
            <FontAwesomeIcon icon="power-off" />
          </span>{' '}
          Logout
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

export default NavBar;
