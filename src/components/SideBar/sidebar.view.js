import React, { useState, useEffect } from 'react';
import styles from './sidebar.module.css';

const SideBar = () => {
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

  return (
    <div className={styles.sideBarBody}>
      <h3>Collections</h3>
      <ul className={styles.collections}>
        {collections.map((collection) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default SideBar;
