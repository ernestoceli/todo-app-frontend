import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/modal.view';
import NavBar from '../../components/NavBar/navbar.view';
import styles from './collections.module.css';

const Collections = () => {
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  useEffect(() => {
    if (collectionsArray) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollectionsArray(data);
        });
    }
  }, []);

  useEffect(() => {
    if (collectionsArray) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollectionsArray(data);
        });
    }
  }, [openModal]);

  return (
    <div className={styles.main}>
      {openModal && (
        <Modal open modalType={modalType} handleCloseModal={() => setOpenModal(false)} />
      )}
      <NavBar
        profileClicked={() => {
          setModalType('profile');
          setOpenModal(true);
        }}
      />
      <div className={styles.collectionFlex}>
        {collectionsArray ? (
          collectionsArray.map((collection) => (
            <li className={styles.collectionElement} key={collection.id}>
              {collection.name}
            </li>
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
          Add new collection
        </button>
      </div>
    </div>
  );
};

export default Collections;
