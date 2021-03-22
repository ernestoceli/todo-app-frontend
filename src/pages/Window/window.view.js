import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/navbar.view';
import SideBar from '../../components/SideBar/sidebar.view';
import TaskList from '../../components/TaskList/tasklist.view';
import Modal from '../../components/Modal/modal.view';
import styles from './window.module.css';

const Window = ({ userName }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (collections) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollections(data);
          setSelectedCollection(data[0]);
        });
    }
  }, [trigger]);

  useEffect(() => {
    if (collections) {
      fetch('http://localhost:3001/collection')
        .then((res) => res.json())
        .then((data) => {
          setCollections(data);
        });
    }
  }, [openModal]);

  const handleCollectionDelete = (id) => {
    fetch(`http://localhost:3001/collection/${id}`, { method: 'DELETE' })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    fetch('http://localhost:3001/task', {
      method: 'DELETE',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify({ parentCollection: id }),
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    setTrigger(!trigger);
    setSelectedCollection(collections[0]);
  };

  return (
    <div className={styles.main}>
      {openModal && (
        <Modal
          open
          modalType={modalType}
          handleCloseModal={() => setOpenModal(false)}
          collectionId={selectedCollection._id}
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
      <div className={styles.row}>
        <SideBar
          buttonClicked={() => {
            setModalType('collection');
            setOpenModal(true);
          }}
          onClickCollection={(collection) => setSelectedCollection(collection)}
          collections={collections}
          selectedCollection={selectedCollection}
          deleteClicked={handleCollectionDelete}
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
