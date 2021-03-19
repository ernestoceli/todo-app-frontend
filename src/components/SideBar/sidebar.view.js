import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './sidebar.module.css';

// eslint-disable-next-line
const SideBar = ({ buttonClicked, selectedCollection, collections, onClickCollection }) => (
  <div className={styles.sideBarBody}>
    <h3 className={styles.sideBarTitle}>Collections</h3>
    <div className={styles.collections}>
      {collections ? (
        collections.map((collection) => (
          <div
            className={`${styles.collectionItem} ${
              selectedCollection !== undefined &&
              selectedCollection.name === collection.name &&
              styles.itemSelected
            }`}
            key={collection._id}
            onClick={() => onClickCollection(collection)}
          >
            <div className={styles.iconContainer} style={{ background: collection.color }}>
              <FontAwesomeIcon icon={collection.icon} />
            </div>
            {collection.name}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <button type="button" className={styles.addNew} onClick={buttonClicked}>
      <div className={styles.iconContainerAdd}>+</div>
      Add collection
    </button>
  </div>
);

export default SideBar;
