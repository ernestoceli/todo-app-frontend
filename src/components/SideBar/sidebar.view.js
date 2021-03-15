import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './sidebar.module.css';

const SideBar = ({ buttonClicked, triggerRefresh }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (collections) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollections(data);
        });
    }
  }, []);

  useEffect(() => {
    if (collections) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollections(data);
        });
    }
  }, [triggerRefresh]);

  return (
    <div className={styles.sideBarBody}>
      <h3 className={styles.sideBarTitle}>Collections</h3>
      <div className={styles.collections}>
        {collections.map((collection) => (
          <div className={styles.collectionItem} key={collection.id}>
            <div className={styles.iconContainer} style={{ background: collection.color }}>
              <FontAwesomeIcon icon={collection.icon} />
            </div>
            {collection.name}
          </div>
        ))}
      </div>
      <button type="button" className={styles.addNew} onClick={buttonClicked}>
        <div className={styles.iconContainerAdd}>+</div>
        Add collection
      </button>
    </div>
  );
};
export default SideBar;
