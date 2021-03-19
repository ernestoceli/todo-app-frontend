import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/navbar.view';
import SideBar from '../../components/SideBar/sidebar.view';
import TaskList from '../../components/TaskList/tasklist.view';
import Modal from '../../components/Modal/modal.view';
import styles from './window.module.css';

const Window = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState();

  useEffect(() => {
    if (collections) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollections(data);
          // setSelectedCollection(data[0]);
        });
    }
  }, [openModal]);

  return (
    <div className={styles.main}>
      {openModal && (
        <Modal
          open
          modalType={modalType}
          handleCloseModal={() => setOpenModal(false)}
          collectionId={selectedCollection._id}
        />
      )}
      <NavBar
        profileClicked={() => {
          setModalType('profile');
          setOpenModal(true);
        }}
      />
      <div className={styles.row}>
        <SideBar
          buttonClicked={() => {
            setModalType('collection');
            setOpenModal(true);
          }}
          onClickCollection={(collection) => setSelectedCollection(collection)}
          collections={collections}
          selectedCollection={selectedCollection}
        />
        <TaskList
          triggerRefresh={openModal}
          newTaskClicked={() => {
            setModalType('task');
            setOpenModal(true);
          }}
          fromCollection={selectedCollection}
        />
      </div>
    </div>
  );
};

export default Window;
