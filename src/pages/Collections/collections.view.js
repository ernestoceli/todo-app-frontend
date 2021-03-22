import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal/modal.view';
import NavBar from '../../components/NavBar/navbar.view';
import styles from './collections.module.css';

const Collections = ({ userName }) => {
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  useEffect(() => {
    if (collectionsArray) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => setCollectionsArray(data));
    }
  }, [openModal]);

  return (
    <div className={styles.main}>
      {openModal && (
        <Modal
          open
          modalType={modalType}
          handleCloseModal={() => setOpenModal(false)}
          userName={userName}
        />
      )}
      <NavBar
        profileClicked={() => {
          setModalType('profile');
          setOpenModal(true);
        }}
        userName={userName}
      />
      <div className={styles.collectionFlex}>
        {collectionsArray ? (
          collectionsArray.map((collection) => (
            <div className={styles.collectionElement} key={collection._id}>
              <div className={styles.iconContainer} style={{ background: collection.color }}>
                <FontAwesomeIcon icon={collection.icon} />
              </div>
              {collection.name}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <button
          type="button"
          className={styles.collectionElement}
          onClick={() => {
            setOpenModal(true);
            setModalType('collection');
          }}
        >
          <div className={`${styles.iconContainer} ${styles.addIcon}`}> + </div>Add new collection
        </button>
      </div>
    </div>
  );
};

export default Collections;
